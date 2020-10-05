const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    room_number: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    desk_number: {
        type: Schema.Types.ObjectId,
        ref: 'Desk'
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;