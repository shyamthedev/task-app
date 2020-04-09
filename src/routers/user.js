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

router.get('/users/:id', async (req, res,next) => {
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

router.delete('/users/:id', async (req, res,next) => {
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