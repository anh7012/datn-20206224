const Account = require('../models/account')

const AccountController = {
  // [GET] Client/ -- list hop dong
  list: async (req, res, next) => {
    try {
      const listClient = await Account.getAll();
      console.log(listAccount.length);
      res.json(listAccount);
    } catch (error) {
      res.json({
        code: 9992,
        data: { message: "Không tìm thấy danh sách hợp đồng" },
      });
    }
  },
};
module.exports = AccountController;