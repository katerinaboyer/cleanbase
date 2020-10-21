const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.findOne(req.query)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/building_admins').get((req, res) => {
  User.find(req.query)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const password = req.body.password;
  const role = req.body.role;

  const newUser = new User({
      email,
      name,
      phone,
      password,
      role,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
