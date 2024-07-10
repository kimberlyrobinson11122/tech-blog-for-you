const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/', homeRoutes); // homeRoutes return HTML
router.use('/api', apiRoutes); // apiRoutes return JSON
router.use('/profile', profileRoutes); // profileRoutes handle profile-related routes

module.exports = router;