import { TestBed } from '@angular/core/testing';

import { CanistersService } from './canisters.service';

describe('CanistersService', () => {
  let service: CanistersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanistersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
