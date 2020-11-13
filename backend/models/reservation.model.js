const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: {
        type: String,
    },
    // room: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Room',
    // },
    room_number: {
        type: String
    },
    desk_number: {
        type: String
    },
    // desk: {
    //     type: String
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
    attendees: {
        type: [String],
    },
    checkedIn: {
        type: Boolean,
    }
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;