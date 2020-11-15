const router = require('express').Router();
let Floor = require('../models/Floor.model');

router.route('/').get((req, res) => {
  Floor.find()
    .then(floors => res.json(floors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id/:id').get((req, res) => {
  Floor.findById(req.params.id)
    .then(floors => res.json(floors))
    .catch(err => res.status(400).json('Error: ' + err));
    //res.send(floor_number)
});

router.route('/update/:id').post((req, res) => {
  Floor.findByIdAndUpdate(req.params.id, req.body)
  .then(floor => res.json(floor))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const floor_number = req.body.floor_number;
  const room_list = req.body.room_list;
  const building_id = req.body.building_id;
  const capacity = req.body.capacity

  const newFloor = new Floor({
      floor_number,
      room_list,
      building_id,
      capacity
  });

  newFloor.save()
    .then(() => res.json('Floor added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;