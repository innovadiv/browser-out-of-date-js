jest.unmock('../transformers');
jest.unmock('../browserCompatible');

import browserCompatible, {
  IE,
  FIREFOX,
  CHROME,
  SAFARI,
  OPERA,
  OTHER
}
  from '../browserCompatible';
describe('Browser Compatibility Test', () => {
  it('should work out of the box', () => {
    // in test mode, user agent should be something like:
    // Node.js (darwin; U; rv:v5.0.0) AppleWebKit/537.36 (KHTML, like Gecko)
    expect(browserCompatible()).toBe(true);
  });
});
