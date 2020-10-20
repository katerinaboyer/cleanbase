const router = require('express').Router();
let Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const business_name = req.body.business_name;
  const office_manager = req.body.office_manager;
  const floor_assigned = req.body.floors_assigned;

  const newAccount = new Account({
      business_name,
      office_manager,
      floor_assigned
  });

  newAccount.save()
    .then(() => res.json('Account added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;