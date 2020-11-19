const router = require('express').Router();
let Room = require('../models/Room.model');

router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/room_type/:room_type').get((req, res) => {
  Room.find({ room_type: { $eq: req.params.room_type }})
  .then(rooms => res.json(rooms))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/floorId/:id').get((req, res) => {
  Room.find({ floor_id: { $eq: req.params.id }})
  .then(rooms => res.json(rooms))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id/:id').get((req, res) => {
  Room.findById(req.params.id)
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove/:id').delete((req, res) => {
  Room.findByIdAndDelete(req.params.id)
    .then(desks => res.json(desks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  var updateObject = req.body;
  console.log(req.body)
  Room.findByIdAndUpdate(req.params.id, {updateObject})
  .then(room => res.json(room))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/isclean/:id').post((req, res) => {
  var updateIsClean = req.body;
  console.log(updateIsClean);
  Room.findByIdAndUpdate(req.params.id, updateIsClean)
    .then(room => res.json(room))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/isavailable/:id').post((req, res) => {
  var updateIsAvailable = req.body;
  console.log(updateIsAvailable);
  Room.findByIdAndUpdate(req.params.id, updateIsAvailable)
    .then(room => res.json(room))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
  const room_number = req.body.room_number;
  const floor_id = req.body.floor_id;
  const floor_number = req.body.floor_number;
  const capacity = req.body.capacity;
  // const desk_list = req.body.desk_list;
  const room_type = req.body.room_type;

  const newRoom = new Room({
    room_number,
    floor_number,
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