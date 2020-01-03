/**
 * checks to see if the input passed in is a valid date in ISO-8601 format
 * @param date {iso8601} format
 * @returns {boolean}
 */
const iso8601Validator = (date) => {
  const regex = RegExp(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/);
  return regex.test(date);
};

export default iso8601Validator;