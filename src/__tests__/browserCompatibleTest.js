jest.unmock('../transformers');
jest.unmock('../browserCompatible');
jest.unmock('../userAgents/chrome.json');
jest.unmock('../userAgents/firefox.json');
jest.unmock('../userAgents/ie.json');
jest.unmock('../userAgents/opera.json');
jest.unmock('../userAgents/safari.json');

import browserCompatible, {
  IE,
  FIREFOX,
  CHROME,
  SAFARI,
  OPERA,
  OTHER
} from '../browserCompatible';

import chromeUserAgents from '../userAgents/chrome.json';
import firefoxUserAgents from '../userAgents/firefox.json';
import ieUserAgents from '../userAgents/ie.json';
import operaUserAgents from '../userAgents/opera.json';
import safariUserAgents from '../userAgents/safari.json';

console.info(`
User Agent Counts
  Chrome: ${chromeUserAgents.length}
  Firefox: ${firefoxUserAgents.length}
  Internet Explorer: ${ieUserAgents.length}
  Opera: ${operaUserAgents.length}
  Safari: ${safariUserAgents.length}
`);

describe('Browser Compatibility Test', () => {
  it('should work out of the box', () => {
    // in test mode, user agent should be something like:
    // Node.js (darwin; U; rv:v5.0.0) AppleWebKit/537.36 (KHTML, like Gecko)
    expect(browserCompatible()).toBe(true);
  });
  
  it('it should only be compatible with IE9 and above', () => {
    ieUserAgents.forEach((userAgent, index) => {
      expect(browserCompatible({userAgent})).toBe(true)
    })
  });
});