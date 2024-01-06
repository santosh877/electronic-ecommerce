const express = require('express');
const router = express.Router();

//middlewares
const {authCheck} = require('../middlewares/auth')

//controllers
const {createOrUpdateUser} = require('../Controllers/auth')

//Route
router.post('/create-or-update-user' , authCheck , createOrUpdateUser);

module.exports = router;