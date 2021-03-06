const router = require('express').Router();
let Desk = require('../models/Desk.model');

router.route('/').get((req, res) => {
  Desk.find()
    .then(desks => res.json(desks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id/:id').get((req, res) => {
  Desk.findById(req.params.id)
    .then(desks => res.json(desks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  var updateObject = req.body;
  console.log(req.body)
  Desk.findByIdAndUpdate(req.params.id, {updateObject})
  .then(desk => res.json(desk))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/isclean/:id').post((req, res) => {
  var updateIsClean = req.body;
  console.log(updateIsClean);
  Desk.findByIdAndUpdate(req.params.id, updateIsClean)
    .then(desk => res.json(desk))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/isavailable/:id').post((req, res) => {
  var updateIsAvailable = req.body;
  console.log(updateIsAvailable);
  Desk.findByIdAndUpdate(req.params.id, updateIsAvailable)
    .then(desk => res.json(desk))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
  const desk_number = req.body.desk_number;
  const room_id = req.body.room_id;
  const is_available = req.body.is_available;
  const is_clean = req.body.is_clean;

  const newDesk = new Desk({
      desk_number,
      room_id,
      is_available,
      is_clean
  });

  newDesk.save()
    .then(() => res.json('Desk added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;