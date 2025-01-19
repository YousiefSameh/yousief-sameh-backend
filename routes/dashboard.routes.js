const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const { getStats } = require('../controllers/dashboard.controller');
console.log(getStats);

// Get Dashboard Stats
router.get('/stats', authenticate, isAdmin, getStats);

module.exports = router;