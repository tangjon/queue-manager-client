import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueDashboardComponent } from './queue-dashboard.component';

describe('QueueDashboardComponent', () => {
  let component: QueueDashboardComponent;
  let fixture: ComponentFixture<QueueDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
