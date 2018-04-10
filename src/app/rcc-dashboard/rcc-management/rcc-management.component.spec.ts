import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RccManagementComponent } from './rcc-management.component';

describe('RccManagementComponent', () => {
  let component: RccManagementComponent;
  let fixture: ComponentFixture<RccManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RccManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RccManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
