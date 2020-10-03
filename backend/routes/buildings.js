const router = require('express').Router();
let Building = require('../models/building.model');

router.route('/').get((req, res) => {
  Building.find()
    .then(buildings => res.json(buildings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const building_admin = req.body.building_admin;
  const capacity = req.body.capacity;
  const num_floors = req.body.num_floors;
  const address = req.body.address;
  const workers = req.body.workers;

  const newBuilding = new Building({
      building_admin,
      capacity,
      num_floors,
      address,
      workers
  });

  newBuilding.save()
    .then(() => res.json('Building added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;