import {inject, TestBed} from '@angular/core/testing';

import {TeamDashboardService} from './team-dashboard.service';

describe('TeamDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamDashboardService]
    });
  });

  it('should be created', inject([TeamDashboardService], (service: TeamDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
