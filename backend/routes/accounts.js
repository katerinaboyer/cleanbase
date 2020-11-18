const router = require('express').Router();
let Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  var updateObject = req.body;
  console.log(req.body)
  Account.findByIdAndUpdate(req.params.id, {updateObject})
  .then(account => res.json(account))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/officemanager/:id').get((req, res) => {
<<<<<<< HEAD
  Account.find({ office_manager: {$eq: req.params.id } })
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
=======
  Account.find({office_manager: {$eq: req.params.id}})
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
>>>>>>> dev
});

router.route('/add').post((req, res) => {
  const business_name = req.body.business_name;
  const office_manager = req.body.office_manager;
  const floors_assigned = req.body.floors_assigned;
  const employees = req.body.employees;

  const newAccount = new Account({
      business_name,
      office_manager,
      floors_assigned,
      employees
  });

  newAccount.save()
    .then(() => res.json('Account added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;