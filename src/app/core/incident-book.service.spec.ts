import { TestBed, inject } from '@angular/core/testing';

import { IncidentBookService } from './incident-book.service';

describe('IncidentBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentBookService]
    });
  });

  it('should be created', inject([IncidentBookService], (service: IncidentBookService) => {
    expect(service).toBeTruthy();
  }));
});
