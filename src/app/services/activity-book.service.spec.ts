import { TestBed, inject } from '@angular/core/testing';

import { ActivityBookService } from './activity-book.service';

describe('ActivityBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityBookService]
    });
  });

  it('should be created', inject([ActivityBookService], (service: ActivityBookService) => {
    expect(service).toBeTruthy();
  }));
});
