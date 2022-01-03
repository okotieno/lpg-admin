import { TestBed } from '@angular/core/testing';

import { DrawerFacade } from './drawer.facade';

describe('DrawerFacadeService', () => {
  let service: DrawerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
