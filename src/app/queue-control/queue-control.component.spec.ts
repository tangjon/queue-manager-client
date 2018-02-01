import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueControlComponent } from './queue-control.component';

describe('QueueControlComponent', () => {
  let component: QueueControlComponent;
  let fixture: ComponentFixture<QueueControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
