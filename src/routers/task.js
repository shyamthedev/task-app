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

router.patch('/tasks/:id', async (req, res, next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => { allowedUpdates.includes(update) })
    if (!isValidOperation) {
        return res.status(400).send('Invalid Updates')
    }
    try {
    //    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       let task =  await Task.findById({_id:req.params.id})
       if(!task){
           return res.status(404).send('Task not found with given id')
       }
       updates.forEach((update)=>{
           task[update] = req.body[update]
       })
       task = await task.save()
           if(!task){
               return res.status(404).send('User not found')
           }
           res,send(task)

    } catch (error) {

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