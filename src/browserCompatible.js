import {getIeTridentVersion, getIeVersion, getOldSafariVersion} from './transformers';

export const REGEXP_IE_TRIDENT_RV = /Trident.*rv:(\d+\.\d+)/i; // IE11
export const REGEXP_IE_MSIE = /MSIE.(\d+\.\d+)(?!.*MSIE.(\d+\.\d+))/i; // IE /w compat inspection
export const REGEXP_EDGE = /Edge.(\d+)/i; //
export const REGEXP_OPERA = /Opera.*Version.(\d+\.\d+)/i;
export const REGEXP_OPR = /OPR.(\d+\.\d+)/i;
export const REGEXP_OPERA_LEGACY = /Opera.(\d+\.?\d+)/i;
export const REGEXP_CHROME = /Chrome.(\d+\.\d+)/i;
export const REGEXP_FIREFOX = /Firefox(?:.|)(\d+\.\d+)/i;
export const REGEXP_SAFARI = /Version.(\d+.\d+).{0,10}Safari/i;
export const REGEXP_PROBLEM_BROWSERS = /bot|googlebot|facebook|slurp|wii|silk|blackberry|maxthon|maxton|mediapartners|dolfin|dolphin|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|konqueror|rekonq|symbian|webos|coolnovo|blackberry|bb10|RIM|PlayBook|PaleMoon|QupZilla|YaBrowser|Otter|Midori|qutebrowser/i;

export const REGEXP_IE_TRIDENT_INTERPRET = /Trident.(\d+\.\d+)/i; // fixes user agent diffs
export const REGEXP_SAFARI_INTERPRET = /Safari.(\d+)/i; // earlier safari has weird revisions

export const IE = 'Microsoft Internet Explorer';
export const EDGE = 'Microsoft Edge';
export const CHROME = 'Google Chrome';
export const OPERA = 'Opera';
export const SAFARI = 'Apple Safari';
export const FIREFOX = 'Mozilla Firefox';
export const OTHER = 'Other';

export function browser(...args) {
  return {
    name: args[0],
    regexp: args[1],
    transformVersion: args[2]
  };
}

export function regExpBrowserMap() {
  // order makes a difference (e.g.: opera has MSIE strings in it)
  return [
    browser(OTHER, REGEXP_PROBLEM_BROWSERS),
    browser(OPERA, REGEXP_OPERA),
    browser(OPERA, REGEXP_OPERA_LEGACY),
    browser(OPERA, REGEXP_OPR),
    browser(IE, REGEXP_IE_TRIDENT_RV),
    browser(IE, REGEXP_IE_MSIE, getIeVersion),
    browser(IE, REGEXP_IE_TRIDENT_INTERPRET, getIeTridentVersion),
    browser(EDGE, REGEXP_EDGE),
    browser(CHROME, REGEXP_CHROME),
    browser(FIREFOX, REGEXP_FIREFOX),
    browser(SAFARI, REGEXP_SAFARI),
    browser(SAFARI, REGEXP_SAFARI_INTERPRET, getOldSafariVersion)
  ]
}

export function interpretBrowser(userAgent) {
  const browser = regExpBrowserMap().reduce((matchFound, browser) => {
    if (!matchFound) {
      // test expression
      const matches = userAgent.match(browser.regexp);

      // found matches
      if ((browser.name === OTHER && matches) || (matches && matches[1])) {
        // cast version string to float
        let version = parseFloat(matches[1] || 0);

        // transform version if there's a post processor
        if (browser.transformVersion) {
          // update version based off transformation value
          version = browser.transformVersion(version, userAgent);
        }

        // return browser
        return {
          name: browser.name,
          version
        };
      }
    }

    // continuation
    return matchFound;
  }, false);

  // if a match is found, return the browser info
  return browser || {name: OTHER, version: 0};
}

export default function browserCompatible(rawConfig) {
  const config = {
    cacheResults: true,
    [IE]: 10,
    [CHROME]: 27,
    [FIREFOX]: 24,
    [OPERA]: 12,
    [SAFARI]: 7,
    [OTHER]: 0,
    userAgent: window && window.navigator && window.navigator.userAgent,
    ...rawConfig
  };

  // validate user agent
  if (typeof config.userAgent !== 'string') {
    throw new Error('`userAgent` must be a string');
  }

  // interpret browser
  const browser = interpretBrowser(config.userAgent);

  // results
  return browser.version >= config[browser.name];
}
