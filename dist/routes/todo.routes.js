"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controller/todo.controller");
const router = express_1.default.Router();
const Task = new todo_controller_1.TaskController();
/**
 * @swagger
 * components:
 *   schemas:
 *     TODO:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: The task description
 *         date:
 *           type: string
 *           description: The task creation date
 *       example:
 *           label: Hey
 *           description: Some text
 */
router.get('/task', Task.getTasks);
/**
 * @swagger
 * /v1/task:
 *   get:
 *     summary: Returns the list of tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TODO'
 */
router.post('/task', Task.createTask);
/**
 * @swagger
 * /v1/task/:
 *  post:
 *    summary: Update the task
 *    tags: [Tasks]

 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TODO'
 *    responses:
 *      200:
 *        description: Task created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TODO'
 */
router.delete('/task/:id', Task.deleteTask);
/**
 * @swagger
 * /v1/task/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.put('/task/:id', Task.updateTask);
/**
 * @swagger
 * /v1/task/{id}:
 *  put:
 *    summary: Update the task by the id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TODO'
 *    responses:
 *      200:
 *        description: Task updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TODO'
 */
exports.default = router;
