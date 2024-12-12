const { Router } = require('express');
const { getAllUsers, createUser, getUser, updateUser, destroyUser, userProtected } = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/', verifyToken, getAllUsers); // sesion iniciada 
router.get('/protected', verifyToken, userProtected)
router.get('/:id', verifyToken, getUser); //sesion iniciada
router.post('/', verifyToken, createUser); // sesion iniciada y usuario administrador
router.put('/:id', verifyToken, updateUser); // sesion iniciada y usuario administrador
router.delete('/:id', verifyToken, destroyUser); // sesion iniciada y usuario administrador

module.exports = router;