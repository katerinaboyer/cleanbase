const router = require('express').Router();
let Room = require('../models/Room.model');

router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const building_id = req.body.building_id;
  const desk_list = req.body.desk_list;
  const capacity = req.body.capacity;
  const floor_id = req.body.floor_id;
  const room_type = req.body.room_type;

  const newRoom = new Room({
      building_id,
      desk_list,
      capacity,
      floor_id,
      room_type
  });

  newRoom.save()
    .then(() => res.json('Room added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;