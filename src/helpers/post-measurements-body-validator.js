// Local
import numberValidator from './number-validator';
import iso8601Validator from './iso8601-validator';

/**
 * If the req.body item we are iterating on has a valid string key we check
 * to see if it's value is a number or a valid date
 * @param key {string}
 * @param value {date|number}
 * @returns {boolean}
 */
const checkTimestampAndRestOfBody = (key, value) => {
  return (key)
    ? (key === 'timestamp' && iso8601Validator(value)) || (key !== 'timestamp' && numberValidator(value))
    : false;
};

/**
 * Loops through the object and makes sure every key has a valid float for value and no key is empty
 * reqBody e.g: {"timestamp":"2015-09-01T16:00:00.000Z","temperature":27.1,"dewPoint":16.7,"precipitation":0}
 * @param reqBody {object}  the incoming data the endpoint.
 * @returns {boolean}
 */
const postMeasurementsBodyValidator = (reqBody = {}) => {
  if (typeof reqBody !== 'object' || !Object.keys(reqBody).length) {
    return false;
  }
  const reqBodyEntries = Object.entries(reqBody) || [];

  for (const [key, value] of reqBodyEntries) {
    if (!checkTimestampAndRestOfBody(key, value)) {
      return false;
    }
  }
  return true;
};

export default postMeasurementsBodyValidator;