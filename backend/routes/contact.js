const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' }
});

router.post('/', limiter, submitContact);
router.get('/', getContacts);

module.exports = router;
