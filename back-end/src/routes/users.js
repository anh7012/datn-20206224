const express = require('express')
const router = express.Router()

const usersController = require('../controllers/UserController')
const authenToken = require('../middlewares/authenToken')

router.post('/create', usersController.create)
router.put('/:id', usersController.updateUser) 
// router.put('/:id/', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)
router.get('/', usersController.listUsers)

module.exports = router