import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RccDashboardComponent} from './rcc-dashboard.component';

describe('RccDashboardComponent', () => {
  let component: RccDashboardComponent;
  let fixture: ComponentFixture<RccDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RccDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RccDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
