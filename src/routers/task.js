const express = require('express')
const router = new express.Router();
const Task = require('../models/task')

router.post('/tasks', async (req, res, next) => {
    let task = new Task(req.body)
    try {
        task = await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res, next) => {
    try {
        const tasks = await Task.find({})
        if (!tasks.length) {
            return res.send('No tasks available')
        }
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

router.get('/tasks/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const task = await Task.findById({ _id })
        if (!task) {
            return res.status(404).send('Task not found with given id')
        }
        res.send(task)

    } catch (error) {
        res.status(500).send('internal Srevere error')
    }
})

router.delete('/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id })
        if (!task) {
            return res.status(404).send('Not found task by given by Id')
        }
        res.send(task)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router