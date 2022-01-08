import { TestBed } from '@angular/core/testing';

import { DealerService } from './dealers.service';

describe('DealerService', () => {
  let service: DealerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
