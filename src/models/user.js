const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        try {
            user.password = await bcrypt.hash(user.password, 8)
        } catch (error) {
            throw new Error('Hashing Failed')
        }
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return;
    }
    return user
}

userSchema.methods.generateJwtToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'jsonwebtokenfortaskapp')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User