const HoSo = require('../models/hoso')
const ModelBIDV = require('../models/mhbidv')
const ModelEY = require('../models/mhey')

const DGTDController = {
  // [GET] hopdong/ -- list hop dong
  list: async (req, res, next) => {
    try {
      return res.send('oke')
    } catch (error) {
      res.json({
        code: 9992,
        data: { message: "Không tìm thấy danh sách hợp đồng" },
      });
    }
  },
};
module.exports = DGTDController;