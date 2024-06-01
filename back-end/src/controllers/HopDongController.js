const HopDong = require('../models/hopdong')

const HopDongController = {
  // [GET] hopdong/ -- list hop dong
  list: async (req, res, next) => {
    try {
      const listHD = await HopDong.getAllHD();
      res.json(listHD);
    } catch (error) {
      res.json({
        code: 9992,
        data: { message: "Không tìm thấy danh sách hợp đồng" },
      });
    }
  },
};
module.exports = HopDongController;