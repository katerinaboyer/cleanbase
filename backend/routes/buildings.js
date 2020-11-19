const router = require('express').Router();
let Building = require('../models/building.model');

router.route('/').get((req, res) => {
  Building.find()
    .then(buildings => res.json(buildings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/mybuilding/:id').get((req, res) => {
  Building.find({building_admin: {$eq: req.params.id}})
    .then(buildings => res.json(buildings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  var updateObject = req.body;
  console.log(req.body)
  Building.findByIdAndUpdate(req.params.id, {updateObject})
  .then(building => res.json(building))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const building_admin = req.body.building_admin;
  const num_floors = req.body.num_floors;
  const capacity = req.body.capacity;
  const address = req.body.address;
  const workers = req.body.workers;

  const newBuilding = new Building({
      building_admin,
      num_floors,
      capacity,
      address,
      workers
  });

  newBuilding.save()
    .then(() => res.json('Building added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;