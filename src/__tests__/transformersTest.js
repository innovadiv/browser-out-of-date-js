jest.unmock('../transformers');

import {getOldSafariVersion, getIeTridentVersion, getIeVersion} from '../transformers';

describe('Version Transformers', () => {
  it('should resolve IE trident versions', () => {
    expect(getIeTridentVersion(8)).toBe(11);
    expect(getIeTridentVersion(7)).toBe(11);
    expect(getIeTridentVersion(6)).toBe(10);
    expect(getIeTridentVersion(5)).toBe(9);
    expect(getIeTridentVersion(4)).toBe(8);
    expect(getIeTridentVersion(3.2)).toBe(8);
    expect(getIeTridentVersion(3.1)).toBe(7);
    expect(getIeTridentVersion(2)).toBe(9);
  });

  it('should resolve IE version 7 with xdomain', () => {
    expect(getIeVersion(7, {XDomainRequest: true})).toBe(8);
    expect(getIeVersion(7)).toBe(7);
  });

  it('should resolve safari versions', () => {
    expect(getOldSafariVersion(99)).toBe(1.0);
  })
});