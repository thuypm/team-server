const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    name: String,
    owner: String,
    members: [String],
    message: Array,
    // message:[{
    //   sender: String,
    //   content: String,
    //   time: {
    //       type: Number,
    //       default: new Date()
    //     },
    //   type: String,
    // }],

    timeCreate: {
        type: Date,
        default: Date.now()
    },

    avatar: {
        type: String,
        default: "0"
    }

});

module.exports = mongoose.model('room', Room)
