const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: {
        type: String,
    },
    // room_number: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Room',
    // },
    // desk_number: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Desk'
    // },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    date: {
        type: Date,
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;