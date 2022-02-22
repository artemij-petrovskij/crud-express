"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const psql_connection_1 = __importDefault(require("../psql-connection"));
const date_1 = __importDefault(require("../custom-functions/date"));
class TaskController {
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allTaskQuery = yield psql_connection_1.default.query('SELECT * FROM tasks ORDER BY id;');
                res.status(200).json(allTaskQuery.rows);
            }
            catch (err) {
                console.error(`Server error ` + err);
                res.status(500);
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { label, description } = req.body;
            const addTaskQuery = yield psql_connection_1.default.query(`INSERT INTO tasks (label, description, date) values ('${label}', '${description}','${(0, date_1.default)()}') RETURNING *`);
            res.status(201).send(`Task created successfully`);
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteTaskQuery = yield psql_connection_1.default.query(`DELETE FROM tasks WHERE id='${id}';`);
            if (deleteTaskQuery.rowCount == 1) {
                res.status(200).send('Task deleted successfully');
            }
            else {
                res.status(404).send('The task does not exist');
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { label, description } = req.body;
            const { id } = req.params;
            const updateTaskQuery = yield psql_connection_1.default.query(`UPDATE tasks set label = '${label}',description = '${description}' ,date = '${(0, date_1.default)()}' where id ='${id}';`);
            if (updateTaskQuery.rowCount == 1) {
                res.status(200).send('Task updated successfully');
            }
            else {
                res.status(404).send('The task does not exist');
            }
        });
    }
}
exports.TaskController = TaskController;
