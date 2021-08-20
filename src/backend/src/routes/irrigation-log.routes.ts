import { Router } from 'express';
import {
  getIrrigationLogs,
  getIrrigationLog,
  getIrrigationLogsCount,
  saveIrrigationLog,
  deleteIrrigationLog,
  updateIrrigationLog,
} from '../controllers/irrigation-log.controller';

export const router = Router();

/**
 *
 * @swagger
 * components:
 *  schemas:
 *    IrrigationLog:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
 *        description: the auto-generated id of irrigationLog
 *      opened:
 *        type: integer
 *        description: the open status of the irrigationLog
 *      date_of_log:
 *        type: date
 *        description: the automatically generated date of the irrigationLog.
 *      solenoid_valve_id:
 *        type: integer
 *        description: the id of the asociated solenoid valve of the irrigationLog
 *     required:
 *      - opened
 *      - solenoid_valve_id
 *     example:
 *      id: 1
 *      opened: 1
 *      date_of_log: 2021-08-19 23:20:50
 *    IrrigationLogNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a message for the not found irrigationLog
 *      example:
 *        message: IrrigationLog was not found
 *  parameters:
 *    irrigationLogId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the irrigationLog id
 */

/**
 * @swagger
 * tags:
 *  name: IrrigationLogs
 *  description:  IrrigationLogs endpoint
 */

/**
 * @swagger
 * /irrigationLogs:
 *  get:
 *    summary: Returns a irrigationLog list
 *    tags: [IrrigationLogs]
 *    responses:
 *      200:
 *        description: the list of irrigationLogs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/IrrigationLog'
 */
router.get('/', getIrrigationLogs);

/**
 * @swagger
 * /irrigationLogs/count:
 *  get:
 *    summary: Get total irrigationLog count
 *    tags: [IrrigationLogs]
 *    responses:
 *      200:
 *        description: the total number of irrigationLogs
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 */
router.get('/count', getIrrigationLogsCount);

/**
 * @swagger
 * /irrigationLogs/{id}:
 *  get:
 *    summary: get a irrigationLog by id
 *    tags: [IrrigationLogs]
 *    parameters:
 *      - $ref: '#/components/parameters/irrigationLogId'
 *    responses:
 *      200:
 *        description: the irrigationLog was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IrrigationLog'
 *      404:
 *        description: the irrigationLog was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IrrigationLogNotFound'
 */
router.get('/:id', getIrrigationLog);

/**
 * @swagger
 * /irrigationLogs:
 *  post:
 *    summary: create a new irrigationLogs
 *    tags: [IrrigationLogs]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/IrrigationLog'
 *    responses:
 *     200:
 *       description: the irrigationLog successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IrrigationLog'
 *     500:
 *       description: some server error
 */
router.post('/', saveIrrigationLog);

/**
 * @swagger
 * /irrigationLogs/${id}:
 *  delete:
 *    summary: delete a irrigationLog by id
 *    tags: [IrrigationLogs]
 *    parameters:
 *      - $ref: '#/components/parameters/irrigationLogId'
 *    responses:
 *      200:
 *        description: the irrigationLog was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IrrigationLog'
 *      404:
 *        description: the irrigationLog was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IrrigationLogNotFound'
 */
router.delete('/:id', deleteIrrigationLog);

/**
 * @swagger
 * /irrigationLogs/${id}:
 *  put:
 *    summary: update a irrigationLog by id
 *    tags: [IrrigationLogs]
 *    parameters:
 *      - $ref: '#/components/parameters/irrigationLogId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/IrrigationLog'
 *    responses:
 *      200:
 *        description: the updated irrigationLog
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IrrigationLog'
 *      404:
 *        description: the irrigationLog was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IrrigationLogNotFound'
 */
router.put('/:id', updateIrrigationLog);
