import { TestBed, inject } from '@angular/core/testing';

import { UserSetService } from './user-set.service';

describe('UserSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSetService]
    });
  });

  it('should be created', inject([UserSetService], (service: UserSetService) => {
    expect(service).toBeTruthy();
  }));
});
