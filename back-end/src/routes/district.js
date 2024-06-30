const express = require('express')
const router = express.Router()

const DistrictController = require('../controllers/DistrictController')
const {verifyToken} = require("../middlewares/authenToken");


router.get('/getAllProvinces',verifyToken, DistrictController.allProvinces);
router.get('/:province_id/getDistrictsByProvince',verifyToken, DistrictController.districtsByProvince);
router.get('/:district_id/getWardsByDistrict',verifyToken, DistrictController.wardsByDistrict);
module.exports = router