const Province = require("../models/province");
const District = require("../models/district");
const Wards = require("../models/ward");

const DistrictController = {
  // [GET] /district/getALLDistrict
  allProvinces: async (req, res) => {
    try {
      const allProvinces = await Province.getAllProvince()
      if (allProvinces.length === 0) {
        return res.json({
          code: 9992,
          message: "Không có danh sách"
        });
      } else {
        return res.json({
          code: 1000,
          data: allProvinces,
          message: "danh sách tỉnh thành"
        });
      }
    }catch (err) {
      res.json({
        code: 9999,
        message: "Không tìm thấy danh sách"
      });
    }
  },
  districtsByProvince: async (req, res) => {
    try {
      const allDistrict = await District.getDistrictByProvince(req.params.province_id)
      if (allDistrict.length === 0) {
        return res.json({
          code: 9992,
          message: "Không có danh sách"
        });
      } else {
        return res.json({
          code: 1000,
          data: allDistrict,
          message: "danh sách tỉnh thành"
        });
      }
    }catch (err) {
      res.json({
        code: 9999,
        message: "Không tìm thấy danh sách"
      });
    }
  },
  wardsByDistrict: async (req, res) => {
    try {
      const allWards = await Wards.getWardsByDistrict(req.params.district_id)
      if (allWards.length === 0) {
        return res.json({
          code: 9992,
          message: "Không có danh sách"
        });
      } else {
        return res.json({
          code: 1000,
          data: allWards,
          message: "danh sách tỉnh thành"
        });
      }
    }catch (err) {
      res.json({
        code: 9999,
        message: "Không tìm thấy danh sách"
      });
    }
  }
}
module.exports = DistrictController;