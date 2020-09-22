const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
    building_name: { type: String },
    address: { type: String, required: true },
    total_capacity: { type: Number },
    num_floors: { type: Number },
    admin: { type: String }
}, {timestamps: true,});

const Building = mongoose.model('Building', BuildingSchema);
module.exports = Building;