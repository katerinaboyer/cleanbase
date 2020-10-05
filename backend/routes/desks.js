const router = require('express').Router();
let Desk = require('../models/Desk.model');

router.route('/').get((req, res) => {
  Desk.find()
    .then(desks => res.json(desks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const room_id = req.body.room_id;
  const is_available = req.body.is_available;
  const is_clean = req.body.is_clean;

  const newDesk = new Desk({
      room_id,
      is_available,
      is_clean
  });

  newDesk.save()
    .then(() => res.json('Desk added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;