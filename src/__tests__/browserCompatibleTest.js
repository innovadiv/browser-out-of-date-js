/* eslint-disable no-console */
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
  OPERA
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
    const startingIndex = ieUserAgents.indexOf('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; msn OptimizedIE8;ZHCN)');

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

  describe('it should only be compatible with Chrome 32 and above', () => {
    const startingIndex = chromeUserAgents.indexOf('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36');

    chromeUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [CHROME]: 32}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with Opera 10 and above', () => {
    const startingIndex = operaUserAgents.indexOf('Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.2.15 Version/10.00');

    operaUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [OPERA]: 10}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with Opera 34 and above', () => {
    const startingIndex = operaUserAgents.indexOf('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36 OPR/34.0.2036.42');

    operaUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [OPERA]: 34}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with Safari 6 and above', () => {
    const startingIndex = safariUserAgents.indexOf('Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; it-it) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16');

    safariUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [SAFARI]: 5}))
        .toBe(index <= startingIndex))
    })
  });

  describe('it should only be compatible with Firefox 6 and above', () => {
    const startingIndex = firefoxUserAgents.indexOf('Mozilla/5.0 (Windows NT 5.0; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0');

    firefoxUserAgents.forEach((userAgent, index) => {
      it(userAgent, () => expect(browserCompatible({userAgent, [FIREFOX]: 6}))
        .toBe(index <= startingIndex))
    })
  });

  it('should pass unknown versions', () => {
    const userAgent = 'FacebookExternalHit/1.1';
    expect(browserCompatible({userAgent})).toBe(true);
  });
});