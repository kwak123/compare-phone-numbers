const {
  comparePhoneNumbers,
  sanitizeNumber,
} = require('./comparePhoneNumbers');
const assert = require('assert');

const assertExpected = (testName, received, expected) => {
  assert(
    received === expected,
    `${testName} failed! Got ${received}, expected ${expected}`,
  );
};

const sanitizeAlphanumeric = () => {
  const dirtyNumeric = '1234';
  const sanitizedNumeric = '1234';
  const resultNumeric = sanitizeNumber(dirtyNumeric);
  assertExpected('sanitizeNumber - numeric', resultNumeric, sanitizedNumeric);

  const dirtyAlphanumeric = '1f2f3f4f';
  const sanitizedAlphanumeric = '1234';
  const resultAlphanumeric = sanitizeNumber(dirtyAlphanumeric);
  assertExpected(
    'sanitizeNumber - alphanumeric',
    resultAlphanumeric,
    sanitizedAlphanumeric,
  );
};

const sanitizeSpecials = () => {
  const dirtyWithPeriods = '1.2.3.4.';
  const sanitizedWithPeriods = '1234';
  const result = sanitizeNumber(dirtyWithPeriods);
  assertExpected('sanitizeNumber - periods', result, sanitizedWithPeriods);
};

const simpleNumbers = () => {
  const simpleNumberOne = '1234567890';
  const simpleNumberTwo = '1234567890';

  const shouldBeTrue = comparePhoneNumbers(simpleNumberOne, simpleNumberTwo);
  assertExpected('simpleNumbers', shouldBeTrue, true);
};

sanitizeAlphanumeric();
sanitizeSpecials();
simpleNumbers();

console.log('All good!');
