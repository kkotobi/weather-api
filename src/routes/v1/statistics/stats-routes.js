// NPM
import express from 'express';

// Local
import getStatsParamValidator from "../../../helpers/get-stats-params-validator";
import statsCalculator from "../../../helpers/stats-calculator";
import getAsArray from "../../../helpers/convert-to-array";

const router = express.Router();
const baseRouteName = '/stats';

// GET /stats?stats....&metric....&fromDateTime=&toDateTime
router.get('/', (req, res) => {
  const reqQueryObj = req.query;

  if (!getStatsParamValidator(reqQueryObj)) {
    return res.status(400).send();
  }

  // Let's keep the data always as array even if only 1 param is sent of each kind.
  reqQueryObj.stat = getAsArray(reqQueryObj.stat);
  reqQueryObj.metric = getAsArray(reqQueryObj.metric);

  const stats = statsCalculator(reqQueryObj);

  return (Object.keys(stats).length)
    ? res.send(stats)
    : res.status(404).send();
});

// The routes above get appended to baseRouteName.
export const registerStatsRoutes = (app) => {
  app.use(baseRouteName, router);
};