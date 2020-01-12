import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { flightInfoComponent } from './flight-info.component';

describe('flightInfoComponent', () => {
  let component: flightInfoComponent;
  let fixture: ComponentFixture<flightInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ flightInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(flightInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
