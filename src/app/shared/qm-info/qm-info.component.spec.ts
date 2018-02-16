import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmInfoComponent } from './qm-info.component';

describe('QmInfoComponent', () => {
  let component: QmInfoComponent;
  let fixture: ComponentFixture<QmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
