import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-framework-pool',
  templateUrl: './framework-pool.component.html',
  styleUrls: ['./framework-pool.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class FrameworkPoolComponent implements OnInit {

  angularVoteCount: number;
  reactVoteCount: number;
  vueVoteCount: number;
  hasVoted = false;
  updating = false;
  fsRef: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.fsRef = this.afs.doc('frameworkPoll/current');
    this.fsRef.valueChanges().subscribe(doc => {
      this.angularVoteCount = doc.angularVoteCount;
      this.reactVoteCount = doc.reactVoteCount;
      this.vueVoteCount = doc.vueVoteCount;
    });
  }

  vote(framework: string) {
    this.updating = true;
    this.afs.firestore.runTransaction(t => {
      return t.get(this.fsRef.ref)
        .then(doc => {
          const newVoteCount = doc.data()[framework] + 1;
          t.update(this.fsRef.ref, { [framework]: newVoteCount });
        });
    })
      .then(() => {
        this.hasVoted = true;
        this.updating = false;
        console.log('Transaction completed successfully');
      })
      .catch(error => console.log('Transaction Failed: ' + error));
  }

  get angularVotePercent() {
    return (this.angularVoteCount / (this.angularVoteCount + this.reactVoteCount + this.vueVoteCount));
  }

  get reactVotePercent() {
    return (this.reactVoteCount / (this.angularVoteCount + this.reactVoteCount + this.vueVoteCount));
  }

  get vueVotePercent() {
    return (this.vueVoteCount / (this.angularVoteCount + this.reactVoteCount + this.vueVoteCount));
  }

  back() {
    this.hasVoted = false;
    this.updating = false;
  }

}
