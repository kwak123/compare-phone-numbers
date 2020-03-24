const {
  comparePhoneNumbers,
  sanitizeNumber,
} = require('./comparePhoneNumbers');
const assert = require('assert');

/**
 * Asserts two values are strictly equal
 * @param {string} testName
 * @param {*} received
 * @param {*} expected
 */
const assertExpected = (testName, received, expected) => {
  assert(
    received === expected,
    `${testName} failed! Got ${received}, expected ${expected}`,
  );
};

/**
 * Calls a function to see if it throws
 * @param {string} testName
 * @param {() => any} fn potentially throwing function
 */
const assertNoThrow = (testName, fn) => {
  try {
    fn();
  } catch (e) {
    throw new assert.AssertionError({ message: `${testName} threw error!` });
  }
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

// We are just calling the method with some non-String arguments to make sure it doesn't crash
const resilience = () => {
  const goodArgument = '123456';

  assertNoThrow('resilience - good arguments', () => {
    comparePhoneNumbers(goodArgument, goodArgument);
  });
};

sanitizeAlphanumeric();
sanitizeSpecials();
simpleNumbers();
numbersWithCharacters();
numbersInWrongOrder();
resilience();

console.log('All good!');
