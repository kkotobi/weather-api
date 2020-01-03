// NPM
import express from 'express';

// Local
import measurementStore from '../../../data-store/measurement-model';
import postMeasurementsBodyValidator from '../../../helpers/post-measurements-body-validator';
import iso8601Validator from "../../../helpers/iso8601-validator";

const router = express.Router();
const baseRouteName = '/measurements';

// POST => /measurements
router.post('/', (req, res) => {
  const tempReqBody = Object.assign({}, req.body);

  if (!tempReqBody.timestamp || !postMeasurementsBodyValidator(tempReqBody)) {
    return res.status(400).send();
  }

  const storeInsert = measurementStore.add(tempReqBody.timestamp, tempReqBody);

  return (storeInsert)
    ? res.status(201).send(tempReqBody)
    : res.status(400).send();
});

// GET => /measurements/:timestamp
router.get('/:timestamp', (req, res) => {
  const timeStamp = req.params.timestamp;

  if (!iso8601Validator(timeStamp)) {
    return res.status(404).send();
  }

  const measurement = measurementStore.get(timeStamp);

  return (measurement)
    ? res.status(200).send(measurement)
    : res.status(404).send();
});

// The routes above get appended to baseRouteName.
export const registerMeasurementsRoutes = (app) => {
  app.use(baseRouteName, router);
};