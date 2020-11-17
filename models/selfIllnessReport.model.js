const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const selfIllnessReportSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
      type: String,
      required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  report: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const selfIllnessReport = mongoose.model('selfIllnessReport', selfIllnessReportSchema);

module.exports = selfIllnessReport;