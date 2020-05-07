const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Room = require('../models/room');
const auth = require('../middleware/verifyToken');
const multer = require('multer');

const storage =multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else{
            cb(null, false);
        }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/search', auth,async(req,res)=>{
    const name = req.body.username;

    const search = await User.find({username : new RegExp(name)}, {'_id':0, 'username':1});
    res.status(200).json(search);
})

router.post('/getAllMeeting', auth, async(req, res)=>{
 
    
    const room = await Room.find({$or: [{members : req.body.username}]})
                            .select('_id name avatar members owner timeCreate');

    const rooms ={
        message: 'get room successfully',
        content: room
    }
    res.status(200).json(rooms);
})

router.post('/avatar', upload.single('avatar'), auth, async(req,res)=>{
    const findUser = await User.updateOne(
        {_id : req.user.id},
        {$set:{avatar : "http://localhost:3000//" + req.file.filename}})

    return res.send('http://localhost:3000//' + req.file.filename);
})




module.exports = router;