import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkPoolComponent } from './framework-pool.component';

describe('FrameworkPoolComponent', () => {
  let component: FrameworkPoolComponent;
  let fixture: ComponentFixture<FrameworkPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameworkPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
