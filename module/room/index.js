const express = require('express');
const router = express.Router();
const createRoom = require('./createRoom');
const addMembers = require('./addMembers');
const removeMembers = require('./removeMembers');
const getRoom = require('./getRoom');
const auth = require('../../middleware/verifyToken');

router.post('/editRoom', (req, res) => {
    auth(req, res, async ()=> {

        switch (req.body.action) {
            case undefined:{
                res.send("false");
            }
            case 0:{
                createRoom(req, res);
                break;
            }
            case 1:{
                addMembers(req, res);
              break;
            }
            case 2:{
                removeMembers(req, res);
                break;
            }
            // case 3:{
            //     getRoom(req, res);
            //     break;
            // }
            default:{
                res.send("Not Found");
            }
        }
    })
});


router.post('/getRoom', (req, res) => {
    auth(req, res, async ()=> {
        getRoom(req,res);
})})


module.exports = router;