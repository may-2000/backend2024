const {Router} = require('express');
const {getMesesage} = require('../controllers/usersc');

const router = Router();

router.get('/', getMesesage)

module.exports = router;