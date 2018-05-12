import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { FrameworkPoolComponent } from './framework-pool/framework-pool.component';

import { environment } from './../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    FrameworkPoolComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  entryComponents: [
    FrameworkPoolComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(FrameworkPoolComponent, {
      injector: this.injector
    });
    customElements.define('framework-pool', el);
  }
}
