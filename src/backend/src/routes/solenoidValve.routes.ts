import { Router } from 'express';
import {
  getSolenoidValves,
  getSolenoidValve,
  getSolenoidValvesCount,
  saveSolenoidValve,
  deleteSolenoidValve,
  updateSolenoidValve,
} from '../controllers/solenoidValve.controller';

export const router = Router();

/**
 *
 * @swagger
 * components:
 *  schemas:
 *    SolenoidValve:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
 *        description: the auto-generated id of solenoidValve
 *      name:
 *        type: string
 *        description: the name of the solenoidValve
 *     required:
 *      - name
 *     example:
 *      id: 1
 *      name: eLPatio
 *    SolenoidValveNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a message for the not found solenoidValve
 *      example:
 *        message: SolenoidValve was not found
 *  parameters:
 *    solenoidValveId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the solenoidValve id
 */

/**
 * @swagger
 * tags:
 *  name: SolenoidValves
 *  description:  SolenoidValves endpoint
 */

/**
 * @swagger
 * /solenoidValves:
 *  get:
 *    summary: Returns a solenoidValve list
 *    tags: [SolenoidValves]
 *    responses:
 *      200:
 *        description: the list of solenoidValves
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SolenoidValve'
 */
router.get('/', getSolenoidValves);

/**
 * @swagger
 * /solenoidValves/count:
 *  get:
 *    summary: Get total solenoidValve count
 *    tags: [SolenoidValves]
 *    responses:
 *      200:
 *        description: the total number of solenoidValves
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 */
router.get('/count', getSolenoidValvesCount);

/**
 * @swagger
 * /solenoidValves/{id}:
 *  get:
 *    summary: get a solenoidValve by id
 *    tags: [SolenoidValves]
 *    parameters:
 *      - $ref: '#/components/parameters/solenoidValveId'
 *    responses:
 *      200:
 *        description: the solenoidValve was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SolenoidValve'
 *      404:
 *        description: the solenoidValve was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SolenoidValveNotFound'
 */
router.get('/:id', getSolenoidValve);

/**
 * @swagger
 * /solenoidValves:
 *  post:
 *    summary: create a new solenoidValves
 *    tags: [SolenoidValves]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SolenoidValve'
 *    responses:
 *     200:
 *       description: the solenoidValve successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SolenoidValve'
 *     500:
 *       description: some server error
 */
router.post('/', saveSolenoidValve);

/**
 * @swagger
 * /solenoidValves/${id}:
 *  delete:
 *    summary: delete a solenoidValve by id
 *    tags: [SolenoidValves]
 *    parameters:
 *      - $ref: '#/components/parameters/solenoidValveId'
 *    responses:
 *      200:
 *        description: the solenoidValve was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SolenoidValve'
 *      404:
 *        description: the solenoidValve was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SolenoidValveNotFound'
 */
router.delete('/:id', deleteSolenoidValve);

/**
 * @swagger
 * /solenoidValves/${id}:
 *  put:
 *    summary: update a solenoidValve by id
 *    tags: [SolenoidValves]
 *    parameters:
 *      - $ref: '#/components/parameters/solenoidValveId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SolenoidValve'
 *    responses:
 *      200:
 *        description: the updated solenoidValve
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SolenoidValve'
 *      404:
 *        description: the solenoidValve was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SolenoidValveNotFound'
 */
router.put('/:id', updateSolenoidValve);
