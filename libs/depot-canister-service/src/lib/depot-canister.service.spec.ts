import { TestBed } from '@angular/core/testing';

import { DepotCanisterService } from './depot-canister.service';

describe('DepotCanisterService', () => {
  let service: DepotCanisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotCanisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
