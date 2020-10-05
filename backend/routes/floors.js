const router = require('express').Router();
let Floor = require('../models/Floor.model');

router.route('/').get((req, res) => {
  Floor.find()
    .then(floors => res.json(floors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const room_list = req.body.room_list;
  const building_id = req.body.building_id;
  const desk_list = req.body.desk_list;
  const capacity = req.body.capacity

  const newFloor = new Floor({
      room_list,
      building_id,
      desk_list,
      capacity
  });

  newFloor.save()
    .then(() => res.json('Floor added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;