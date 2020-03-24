/**
 * Compares two phone numbers in any format and returns whether they are equal
 *
 * If the numbers contain a country/area code, then both numbers must include area codes.
 * @param {string} phoneNumberOne
 * @param {string} phoneNumberTwo
 * @returns {boolean} whether numbers are equal
 */
const comparePhoneNumbers = (phoneNumberOne, phoneNumberTwo) => {
  if (!phoneNumberOne || !phoneNumberTwo) {
    return false;
  }

  const sanitizedNumberOne = sanitizeNumber(phoneNumberOne);
  const sanitizedNumberTwo = sanitizeNumber(phoneNumberTwo);
  return sanitizedNumberOne === sanitizedNumberTwo;
};

/**
 * Strips non-digit characters from a String
 * @param {string} dirtyNumberString
 * @returns {string} digits-only string
 */
const sanitizeNumber = dirtyNumberString => {
  const nonDigitsRegex = /[^\d]/g;
  return dirtyNumberString.replace(nonDigitsRegex, '');
};

module.exports = {
  comparePhoneNumbers,
  sanitizeNumber,
};
