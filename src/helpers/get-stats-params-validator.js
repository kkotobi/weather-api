// Local
import config from '../config/config';

/**
 * Takes in the req.query and looks at they top level keys in that object to make sure
 * that every key in config.STATS_GET_REQUIRED_KEYS is there as well.
 *
 * reqQuery looks like this ->
 * {
 *  stat: [ 'min', 'max', 'average' ],
 *  metric: [ 'temperature', 'dewPoint', 'precipitation' ],
 *  fromDateTime: '2015-09-01T16:00:00.000Z',
 *  toDateTime: '2015-09-01T17:00:00.000Z'
 * }
 * @param reqQuery {object}
 * @returns {boolean}
 */
const checkValidKeys = (reqQuery) => {
  const reqQueryKeys = Object.keys(reqQuery);
  for (const key of config.STATS_GET_REQUIRED_KEYS) {
    if (reqQueryKeys.indexOf(key) < 0) {
      return false;
    }
  }
  return true;
};

/**
 * @param reqQuery {object}
 */
const getStatsParamValidator = (reqQuery) => {
  const queryObjKeys = Object.keys(reqQuery);
  if (!queryObjKeys.length || !checkValidKeys(reqQuery)) {
    return false;
  }
  return true;
};

export default getStatsParamValidator;