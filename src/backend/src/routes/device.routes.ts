import { Router } from 'express';
import {
  getDevices,
  getDevice,
  getDevicesCount,
  saveDevice,
  deleteDevice,
  updateDevice,
  getDeviceMeasurements,
} from '../controllers/device.controller';

export const router = Router();

/**
 *
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *     type: object
 *     properties:
 *      id:
 *        type: string
 *        description: the auto-generated id of task
 *      title:
 *        type: string
 *        description: the title of the task
 *      description:
 *        type: string
 *        description: the description of the task
 *     required:
 *      - title
 *      - description
 *     example:
 *      id: WQ8aBT2qKrKJdjzplZKjs
 *      title: A task
 *      description: A task description
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a message for the not found task
 *      example:
 *        message: Task was not found
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the task id
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description:  Tasks endpoint
 */

/**
 * @swagger
 * /tasks:
 *  get:
 *    summary: Returns a task list
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: the list of tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 */
router.get('/', getDevices);

/**
 * @swagger
 * /tasks/count:
 *  get:
 *    summary: Get total task count
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: the total number of tasks
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 */
router.get('/count', getDevicesCount);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *    summary: get a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.get('/:id', getDevice);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *    summary: get a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.get('/measurements/:id', getDeviceMeasurements);

/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: create a new tasks
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *     200:
 *       description: the task successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     500:
 *       description: some server error
 */
router.post('/', saveDevice);

/**
 * @swagger
 * /tasks/${id}:
 *  delete:
 *    summary: delete a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.delete('/:id', deleteDevice);

/**
 * @swagger
 * /tasks/${id}:
 *  put:
 *    summary: update a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the updated task
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.put('/:id', updateDevice);
