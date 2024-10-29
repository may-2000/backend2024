const {Router} = require('express');
const {getAll, getById, createUser, updateUser, deleteUser} = require('../controllers/usersc');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createUser,);
router.put('/:id',updateUser );
router.delete('/:id', deleteUser);

module.exports = router;