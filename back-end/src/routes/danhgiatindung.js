const express = require('express')
const router = express.Router()

const DGTDController = require('../controllers/DGTDController')
const {verifyToken} = require("../middlewares/authenToken");

router.get('/',verifyToken, DGTDController.findDanhGia)
router.post('/create',verifyToken, DGTDController.createDanhGia)
router.get('/',verifyToken, DGTDController.listDanhGia)
// router.get('/test', DGTDController.test)

module.exports = router