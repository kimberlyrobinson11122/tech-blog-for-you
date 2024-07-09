const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes); // homeRoutes return HTML
router.use('/api', apiRoutes); // apiRoutes return JSON

module.exports = router;