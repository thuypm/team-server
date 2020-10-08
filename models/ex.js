const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ex = new Schema({
    name: String,
    creater: String,
    createTime: {
        type: Number,
        default: Date.now().getTime(),
    },
    deadline: Number,
    submission: Array,
});

module.exports = mongoose.model('room', Room)
