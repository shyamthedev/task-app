const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        min:5
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', schema)

module.exports = Task