import { TestBed, inject } from '@angular/core/testing';

import { SupportBookService } from './support-book.service';

describe('SupportBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportBookService]
    });
  });

  it('should be created', inject([SupportBookService], (service: SupportBookService) => {
    expect(service).toBeTruthy();
  }));
});
