import { Router } from 'express';
import {
  getDevices,
  getDevice,
  getDevicesCount,
  saveDevice,
  deleteDevice,
  updateDevice,
  getDeviceMeasurements,
  getDeviceIrrigationLog,
  saveDeviceMeasurement,
} from '../controllers/device.controller';

export const router = Router();

/**
 *
 * @swagger
 * components:
 *  schemas:
 *    Device:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
 *        description: the auto-generated id of device
 *      name:
 *        type: string
 *        description: the name of the device
 *      location:
 *        type: string
 *        description: the location of the device
 *      solenoid_valve_id:
 *        type: integer
 *        description: the id of the asociated solenoid valve of the device
 *     required:
 *      - name
 *      - location
 *      - solenoid_valve_id
 *     example:
 *      id: 1
 *      title: Sensor 1
 *      location: Patio
 *      solenoid_valve_id: 1
 *    DeviceNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a message for the not found device
 *      example:
 *        message: El dispositivo no fue encontrado
 *  parameters:
 *    deviceId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the device id
 */

/**
 * @swagger
 * tags:
 *  name: Devices
 *  description:  Devices endpoint
 */

/**
 * @swagger
 * /devices:
 *  get:
 *    summary: Returns a device list
 *    tags: [Devices]
 *    responses:
 *      200:
 *        description: the list of devices
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Device'
 */
router.get('/', getDevices);

/**
 * @swagger
 * /devices/count:
 *  get:
 *    summary: Get total device count
 *    tags: [Devices]
 *    responses:
 *      200:
 *        description: the total number of devices
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 */
router.get('/count', getDevicesCount);

/**
 * @swagger
 * /devices/{id}:
 *  get:
 *    summary: get a device by id
 *    tags: [Devices]
 *    parameters:
 *      - $ref: '#/components/parameters/deviceId'
 *    responses:
 *      200:
 *        description: the device was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: the device was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeviceNotFound'
 */
router.get('/:id', getDevice);

/**
 * @swagger
 * /devices/{id}/measurements:
 *  get:
 *    summary: get measurements of a device by it id
 *    tags: [Devices]
 *    parameters:
 *      - $ref: '#/components/parameters/deviceId'
 *    responses:
 *      200:
 *        description: the measurements were found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: the measurements were not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeviceNotFound'
 */
router.get('/:id/measurements', getDeviceMeasurements);

/**
 * @swagger
 * /devices/{id}/irrigation-log:
 *  get:
 *    summary: get the logs of the device by it id
 *    tags: [Devices]
 *    parameters:
 *      - $ref: '#/components/parameters/deviceId'
 *    responses:
 *      200:
 *        description: the logs were found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: the logs were not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeviceNotFound'
 */
router.get('/:id/irrigation-log', getDeviceIrrigationLog);

/**
 * @swagger
 * /devices:
 *  post:
 *    summary: create a new device
 *    tags: [Devices]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Device'
 *    responses:
 *     200:
 *       description: the device successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     500:
 *       description: some server error
 */
router.post('/', saveDevice);

/**
 * @swagger
 * /devices:
 *  post:
 *    summary: create a new measure
 *    tags: [Devices]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Device'
 *    responses:
 *     200:
 *       description: the measure successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     500:
 *       description: some server error
 */
router.post('/measurement', saveDeviceMeasurement);

/**
 * @swagger
 * /devices/${id}:
 *  delete:
 *    summary: delete a device by id
 *    tags: [Devices]
 *    parameters:
 *      - $ref: '#/components/parameters/deviceId'
 *    responses:
 *      200:
 *        description: the device was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: the device was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeviceNotFound'
 */
router.delete('/:id', deleteDevice);

/**
 * @swagger
 * /devices/${id}:
 *  put:
 *    summary: update a device by id
 *    tags: [Devices]
 *    parameters:
 *      - $ref: '#/components/parameters/deviceId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Device'
 *    responses:
 *      200:
 *        description: the updated device
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: the device was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeviceNotFound'
 */
router.put('/:id', updateDevice);
