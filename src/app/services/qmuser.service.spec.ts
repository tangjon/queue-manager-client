import { TestBed, inject } from '@angular/core/testing';

import { QmuserService } from './qmuser.service';

describe('QmuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QmuserService]
    });
  });

  it('should be created', inject([QmuserService], (service: QmuserService) => {
    expect(service).toBeTruthy();
  }));
});
