const router = require('express').Router();
var mongoose = require('mongoose');
let Reservation = require('../models/Reservation.model');

router.route('/').get((req, res) => {
  Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userId/:userId').get((req, res) => {
  Reservation.find({ attendees: req.params.userId })
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  var updateObject = req.body;
  console.log(req.body)
  Reservation.findByIdAndUpdate(req.params.id, {updateObject})
  .then(reservation => res.json(reservation))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/cleaning/unclaimed').get((req, res) => {
  Reservation.find({ title: "Cleaning", attendees: {$size: 0}})
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const room = req.body.room;
  const room_number = req.body.room_number;
  const desk = req.body.desk;
  const desk_number = req.body.desk_number;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const date = req.body.date;
  const attendees = req.body.attendees;

  const newReservation = new Reservation({
    title,
    room,
    room_number,
    desk,
    desk_number,
    start_time,
    end_time,
    date,
    attendees
  });
  
  newReservation.save()
    .then(() => res.json('Reservation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;