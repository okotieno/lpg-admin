import { TestBed } from '@angular/core/testing';

import { MessageAlertsInterceptor } from './message-alerts.interceptor';

describe('MessageAlertsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MessageAlertsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MessageAlertsInterceptor = TestBed.inject(MessageAlertsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
