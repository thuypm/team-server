const Room = require('../../models/room');

async function GetRoom(req, res) {
    const newRoom = await Room.findById(req.body.roomId);
    res.send(newRoom)
}

module.exports = GetRoom