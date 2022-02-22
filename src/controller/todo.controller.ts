import pool from '../psql-connection'
import { Request, Response } from 'express';
import date from '../custom-functions/date'

interface Task {
    getTasks(req: Request, res: Response): Promise<any>;
    createTask(req: Request, res: Response): Promise<any>;
    deleteTask(req: Request, res: Response): Promise<any>;
    updateTask(req: Request, res: Response): Promise<any>;
}

class TaskController implements Task {
    async getTasks(req: Request, res: Response): Promise<any> {

        const allTaskQuery = await pool.query('SELECT * FROM tasks ORDER BY id;')
        res.status(200).json(allTaskQuery.rows)

    }

    async createTask(req: Request, res: Response): Promise<any> {

        const { label, description } = req.body
        const addTaskQuery = await pool.query(`INSERT INTO tasks (label, description, date) values ('${label}', '${description}','${date()}') RETURNING *`)
        res.status(201).send(`Task created successfully`)

    }

    async deleteTask(req: Request, res: Response): Promise<any> {

        const { id } = req.params
        const deleteTaskQuery = await pool.query(`DELETE FROM tasks WHERE id='${id}';`)
        if (deleteTaskQuery.rowCount == 1) {
            res.status(200).send('Task deleted successfully')
        } else {
            res.status(404).send('The task does not exist')
        }

    }

    async updateTask(req: Request, res: Response): Promise<any> {

        const { label, description } = req.body
        const { id } = req.params
        const updateTaskQuery = await pool.query(`UPDATE tasks set label = '${label}',description = '${description}' ,date = '${date()}' where id ='${id}';`)

        if (updateTaskQuery.rowCount == 1) {
            res.status(200).send('Task updated successfully')

        } else {
            res.status(404).send('The task does not exist')
        }

    }
}

export { TaskController };


