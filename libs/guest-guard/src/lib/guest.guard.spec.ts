import { guestGuard } from './guest.guard';

describe('guestGuard', () => {
  it('should work', () => {
    expect(guestGuard()).toEqual('guest-guard');
  });
});
