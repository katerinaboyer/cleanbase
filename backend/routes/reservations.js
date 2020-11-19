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

router.route('/update/attendees/:id').post((req, res) => {
  var updateAttendees = req.body;
  console.log(updateAttendees);
  Reservation.findByIdAndUpdate(req.params.id, updateAttendees)
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error:' + err));
})

router.route('/cleaning/unclaimed').get((req, res) => {
  Reservation.find({ title: "Cleaning", attendees: {$size: 0}}).sort({date: 1})
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/cleaning/').get((req, res) => {
  Reservation.find({ title: "Cleaning"})
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/current/:id').get((req, res) => {
  Reservation.find({attendees: req.params.id}).sort({date: 1})
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/checkin/:id').post((req, res) => {
  Reservation.findByIdAndUpdate(req.params.id, req.body)
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const title = req.body.title;
  const room_id = req.body.room_id;
  const room_number = req.body.room_number;
  const desk_id = req.body.desk_id;
  const desk_number = req.body.desk_number;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const date = req.body.date;
  const attendees = req.body.attendees;
  const checkedIn = false;

  const newReservation = new Reservation({
    title,
    room_id,
    room_number,
    desk_id,
    desk_number,
    start_time,
    end_time,
    date,
    attendees,
    checkedIn,
  });
  
  newReservation.save()
    .then(() => res.json('Reservation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;