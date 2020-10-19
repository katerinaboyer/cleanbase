const router = require('express').Router();
let Room = require('../models/Room.model');

router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const room_number = req.body.room_number;
  const floor_id = req.body.floor_id;
  const capacity = req.body.capacity;
  // const desk_list = req.body.desk_list;
  const room_type = req.body.room_type;

  const newRoom = new Room({
    room_number,
    floor_id,
    capacity,
    // desk_list,
    room_type
  });

  newRoom.save()
    .then(() => res.json('Room added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;