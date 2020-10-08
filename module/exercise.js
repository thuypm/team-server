const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Room = require('../models/room');
const auth = require('../middleware/verifyToken');
const multer = require('multer');
var fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, 'tmp' + '.jpg');
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/getEx', auth, async (req, res) => {
    var room = req.body.room;
    var search = await Exercise.find({ _id: room.id });
    res.status(200).json(search);
})

router.post('/addEx', auth, async (req, res) => {
    var data = req.body.data
    // const data = await Exercise.find({ $or: [{ members: req.body.username }] })
    //     .select('_id name avatar members owner timeCreate');

    // const rooms = {
    //     message: 'get room successfully',
    //     content: room
    // }
    res.status(200).json(rooms);
})

router.post('/avatar', upload.single('avatar'), auth, async (req, res) => {
    var tmpFile = './public/upload/' + req.file.filename;
    fs.rename(tmpFile, './public/user/' + req.body.username + '.jpg', () => {
        res.send(req.body.username + '.jpg');
    });
})




module.exports = router;