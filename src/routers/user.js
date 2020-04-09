const express = require('express')
const router = new express.Router()
const User = require('../models/user')


router.post('/users', async (req, res, next) => {
    let user = new User(req.body)
    try {
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
});

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({})
        if (!users.length) {
            return res.send('No users available')
        }
        res.send(users)
    } catch (error) {
        res.status(500).send('Internal Server  Error')
    }
});

router.get('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        if (!user) {
            return res.status.send('User not found with given id')
        }
        res.send(user)

    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

router.patch('/users/:id', async (req, res, next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => { allowedUpdates.includes(update) })
    if (!isValidOperation) {
        return res.status(400).send('Invalid updates')
    }
    try {
        let user = await User.findById({ _id: req.params.id })
        if (!user) {
            return res, status(404).send('User not found with given id')
        }
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        user = await user.save()
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.send(user)
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})

router.delete('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id })
        if (!user) {
            return res.status(404).send('User Not found with given id')
        }
        res.send(user)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;