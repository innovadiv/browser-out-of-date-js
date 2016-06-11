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

  it('should throw an error if no user agent is detected', () => {
    expect(() => browserCompatible({
      userAgent: false
    })).toThrow();
  });

  describe('it should only be compatible with IE8 and above', () => {
    const startingIndex = ieUserAgents.indexOf('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MS-RTC LM 8; InfoPath.3; .NET4.0C; .NET4.0E) chromeframe/8.0.552.224');

    ieUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [IE]: 8}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with IE9 and above', () => {
    const startingIndex = ieUserAgents.indexOf('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/4.0; GTB7.4; InfoPath.3; SV1; .NET CLR 3.1.76908; WOW64; en-US)');

    ieUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [IE]: 9}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with IE10 and above', () => {
    const startingIndex = ieUserAgents.indexOf('Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)');

    ieUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [IE]: 10}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with IE11', () => {
    const startingIndex = ieUserAgents.indexOf('Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko');

    ieUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [IE]: 11}))
        .toBe(index <= startingIndex))
    })
  });
});