/**
 * Parse IE trident version
 * @param version
 * @returns {Number}
 */
export function getIeTridentVersion(version) {
  if (version > 6) {
    return 11;
  } else if (version > 5) {
    return 10;
  } else if (version > 4) {
    return 9;
  } else if (version > 3.1) {
    return 8;
  } else if (version > 3) {
    return 7;
  } else {
    return 9;
  }
}

/**
 * If the IE version reports v7 and the scope contains "XDomainRequest", its really v8
 * @param version
 * @returns {Number}
 */
export function getIeVersion(version) {
  if (version === 7 && window && window.XDomainRequest) {
    return 8;
  }

  return version;
}

/**
 * Parse old Safari revisions
 * @param version
 * @returns {boolean|number}
 */
export function getOldSafariVersion(version) {
  return ((version < 100) && 1.0)
    || ((version < 130) && 1.2)
    || ((version < 320) && 1.3)
    || ((version < 520) && 2.0)
    || ((version < 524) && 3.0)
    || ((version < 526) && 3.2)
    || 4.0;
}