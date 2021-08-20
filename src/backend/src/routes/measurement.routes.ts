import { Router } from 'express';
import {
  getMeasurements,
  getMeasurement,
  getMeasurementsCount,
  saveMeasurement,
  deleteMeasurement,
  updateMeasurement,
} from '../controllers/measurement.controller';

export const router = Router();

/**
 *
 * @swagger
 * components:
 *  schemas:
 *    Measurement:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
 *        description: the auto-generated id of measurement
 *      date_of_measurement:
 *        type: date
 *        description: the automatically generated date of the measurement
 *      value:
 *        type: string
 *        description: the value of the measurement
 *      device_id:
 *        type: integer
 *        description: the id of the asociated device to the measurement
 *     required:
 *      - value
 *      - device_id
 *     example:
 *      id: 1
 *      date_of_measurement: 2021-08-19 23:20:50
 *      value: 55
 *      device_id: 1
 *    MeasurementNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a message for the not found measurement
 *      example:
 *        message: Measurement was not found
 *  parameters:
 *    measurementId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the measurement id
 */

/**
 * @swagger
 * tags:
 *  name: Measurements
 *  description:  Measurements endpoint
 */

/**
 * @swagger
 * /measurements:
 *  get:
 *    summary: Returns a measurement list
 *    tags: [Measurements]
 *    responses:
 *      200:
 *        description: the list of measurements
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Measurement'
 */
router.get('/', getMeasurements);

/**
 * @swagger
 * /measurements/count:
 *  get:
 *    summary: Get total measurement count
 *    tags: [Measurements]
 *    responses:
 *      200:
 *        description: the total number of measurements
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 */
router.get('/count', getMeasurementsCount);

/**
 * @swagger
 * /measurements/{id}:
 *  get:
 *    summary: get a measurement by id
 *    tags: [Measurements]
 *    parameters:
 *      - $ref: '#/components/parameters/measurementId'
 *    responses:
 *      200:
 *        description: the measurement was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Measurement'
 *      404:
 *        description: the measurement was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MeasurementNotFound'
 */
router.get('/:id', getMeasurement);

/**
 * @swagger
 * /measurements:
 *  post:
 *    summary: create a new measurements
 *    tags: [Measurements]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Measurement'
 *    responses:
 *     200:
 *       description: the measurement successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Measurement'
 *     500:
 *       description: some server error
 */
router.post('/', saveMeasurement);

/**
 * @swagger
 * /measurements/${id}:
 *  delete:
 *    summary: delete a measurement by id
 *    tags: [Measurements]
 *    parameters:
 *      - $ref: '#/components/parameters/measurementId'
 *    responses:
 *      200:
 *        description: the measurement was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Measurement'
 *      404:
 *        description: the measurement was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MeasurementNotFound'
 */
router.delete('/:id', deleteMeasurement);

/**
 * @swagger
 * /measurements/${id}:
 *  put:
 *    summary: update a measurement by id
 *    tags: [Measurements]
 *    parameters:
 *      - $ref: '#/components/parameters/measurementId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Measurement'
 *    responses:
 *      200:
 *        description: the updated measurement
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Measurement'
 *      404:
 *        description: the measurement was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MeasurementNotFound'
 */
router.put('/:id', updateMeasurement);
