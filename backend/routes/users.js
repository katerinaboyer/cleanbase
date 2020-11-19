const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.findOne(req.query)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get users by their ObjectId
router.route('/id/:id').get((req, res) => {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
})

//get user from email
router.route('/email/:email').get((req, res) => {
  User.find({email: req.params.email})
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/all').get((req, res) => {
  User.find(req.query)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/role/:role').get((req, res) => {
  User.find({ role: {$eq: req.params.role } })
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
});

// get all building admin users 
router.route('/building_admins').get((req, res) => {
  User.find({ role: {$eq: "building_admin" } })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/allEmployees').get((req, res) => {
  User.find(req.query).sort({name: 1})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/onlyemployees').get((req, res) => {
  User.find({role: {$eq: "employee"}} /*&& {business_account_id: {$eq: "Jon"}}*/).sort({name: 1})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/coworkers/:businessId').get((req, res) => {
  User.find({ business_account_id: {$eq: req.params.businessId }})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/openemployees').get((req, res) => {
  User.find({business_account_id: {$eq: null}, role: "employee"}).sort({name: 1})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/businessAcct/:id').get((req, res) => {
  User.find({business_account_id: {$eq: req.params.id}}).sort({name: 1})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addbusiness/:id').post((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
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
