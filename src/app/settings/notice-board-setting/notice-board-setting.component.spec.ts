import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoticeBoardSettingComponent} from './notice-board-setting.component';

describe('NoticeBoardSettingComponent', () => {
  let component: NoticeBoardSettingComponent;
  let fixture: ComponentFixture<NoticeBoardSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeBoardSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBoardSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
