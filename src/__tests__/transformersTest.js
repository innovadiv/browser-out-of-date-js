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
  });

  it('should resolve IE version 7 without xdomain', () => {
    expect(getIeVersion(7)).toBe(7);
  });

  it('should resolve safari versions', () => {
    expect(getOldSafariVersion(99)).toBe(1.0);
    expect(getOldSafariVersion(129)).toBe(1.2);
    expect(getOldSafariVersion(319)).toBe(1.3);
    expect(getOldSafariVersion(519)).toBe(2.0);
    expect(getOldSafariVersion(523)).toBe(3.0);
    expect(getOldSafariVersion(525)).toBe(3.2);
    expect(getOldSafariVersion(526)).toBe(4.0);
  })
});