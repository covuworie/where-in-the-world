import { HyphenateUriPipe } from './hyphenate-uri.pipe';

describe('EncodeUriPipe', () => {
  it('create an instance', () => {
    const pipe = new HyphenateUriPipe();
    expect(pipe).toBeTruthy();
  });
});
