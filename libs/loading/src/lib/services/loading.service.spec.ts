import { loadingService } from './loading.service';

describe('loading', () => {
  it('should work', () => {
    expect(loadingService()).toEqual('loading');
  });
});
