const express = require('express');
const user_controller = require('../controllers/users.controller');
const router = express.Router();

/* POST request user create */
router.post('/register', user_controller.register);

module.exports = router;