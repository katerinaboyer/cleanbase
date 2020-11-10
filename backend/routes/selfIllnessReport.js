const router = require('express').Router();
const { count } = require('../models/selfIllnessReport.model');
let selfIllnessReport = require('../models/selfIllnessReport.model');

router.route('/').get((req, res) => {
  selfIllnessReport.find()
    .then(selfIllnessReports => res.json(selfIllnessReports))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count').get((req, res) => {
  selfIllnessReport.countDocuments()
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const date = req.body.date;
  const report = req.body.report;
  const newselfIllnessReport = new selfIllnessReport({
      email,
      name,
      phone,
      date,
      report
  });

  newselfIllnessReport.save()
    .then(() => res.json('Self Illness Report added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;