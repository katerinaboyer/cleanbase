const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: {
        type: String,
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    room_number: {
        type: String
    },
    desk_id: {
        type: Schema.Types.ObjectId
    },
    desk_number: {
        type: String
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    date: {
        type: Date,
    },
    attendees: {
        type: [Schema.Types.ObjectId],
    },
    checkedIn: {
        type: Boolean,
    }
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;