const router = require('express').Router();
let Reservation = require('../models/Reservation.model');

router.route('/').get((req, res) => {
  Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/').get((req, res) => {
//   Reservation.find
// })

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const room_number = req.body.room_number;
  const desk_number = req.body.desk_number;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const date = req.body.date;
  const users = req.body.users;

  const newReservation = new Reservation({
    title,
    room_number,
    desk_number,
    start_time,
    end_time,
    date,
    users
  });

  newReservation.save()
    .then(() => res.json('Reservation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;