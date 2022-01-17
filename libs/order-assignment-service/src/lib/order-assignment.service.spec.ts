import { TestBed } from '@angular/core/testing';

import { OrderAssignmentService } from './order-assignment.service';

describe('OrderAssignmentService', () => {
  let service: OrderAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
