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
  const resultWithPeriods = sanitizeNumber(dirtyWithPeriods);
  assertExpected(
    'sanitizeNumber - periods',
    resultWithPeriods,
    sanitizedWithPeriods,
  );

  const dirtyWithParentheses = '(12)3(4)';
  const sanitizedWithParentheses = '1234';
  const resultWithParentheses = sanitizeNumber(dirtyWithParentheses);
  assertExpected(
    'sanitizeNumber - parentheses',
    resultWithParentheses,
    sanitizedWithParentheses,
  );

  const dirtyMixed = '(1)2.3.(4)';
  const sanitizedMixed = '1234';
  const resultMixed = sanitizeNumber(dirtyMixed);
  assertExpected('sanitizeNumber - mixed', resultMixed, sanitizedMixed);
};

const simpleNumbers = () => {
  const simpleNumberOne = '1234567890';
  const simpleNumberTwo = '1234567890';

  const shouldBeTrue = comparePhoneNumbers(simpleNumberOne, simpleNumberTwo);
  assertExpected('simpleNumbers', shouldBeTrue, true);
};

const numbersWithCharacters = () => {
  const uncleanNumberOne = '(123)456.7890';
  const uncleanNumberTwo = '123.456.7890';

  const shouldBeTrue = comparePhoneNumbers(uncleanNumberOne, uncleanNumberTwo);
  assertExpected('numbersWithCharacters', shouldBeTrue, true);
};

const numbersInWrongOrder = () => {
  const numberOrderOne = '1234';
  const numberOrderTwo = '4321';

  const shouldBeFalse = comparePhoneNumbers(numberOrderOne, numberOrderTwo);
  assertExpected('numbersInWrongOrder', shouldBeFalse, false);
};

sanitizeAlphanumeric();
sanitizeSpecials();
simpleNumbers();
numbersWithCharacters();
numbersInWrongOrder();

console.log('All good!');
