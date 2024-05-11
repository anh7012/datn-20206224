const Client = require('../models/client')

const ClientController = {
  // [GET] Client/ -- list hop dong
  list: async (req, res, next) => {
    try {
      const listClient = await Client.getAll();
      console.log(listClient.length);
      res.json(listClient);
    } catch (error) {
      res.json({
        code: 9992,
        data: { message: "Không tìm thấy danh sách hợp đồng" },
      });
    }
  },
};
module.exports = ClientController;