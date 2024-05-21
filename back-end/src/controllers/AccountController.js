const Account = require('../models/account')
const Client = require("../models/client");
const {generateUniqueAccount} = require("../utils/account");

const AccountController = {
  // [GET] account/ -- list tai khoan
  listAccount: async (req, res, next) => {
    try {
      const listAccount = await Account.getAllAccount();
      res.json(listAccount);
    } catch (error) {
      res.json({
        code: 9992,
        data: {message: "Không tìm thấy danh sách tài khoản khách hàng"},
      });
    }
  },

  // [POST] account/create
  createAccount: async (req, res, next) => {
    try {
      const existClient = await Client.getClientByMaKH(req.body.MaKH)

      if (!existClient) {
        res.json({
          code: 9998,
          data: {
            message: "Khách hàng chưa đăng ký",
          },
        });
      }
      else {
        const accountNumber = await generateUniqueAccount()
        const account = {
          idClient: existClient.idClient,
          MaKH: req.body.MaKH,
          typeAccount: req.body.typeAccount,
          accountNumber: accountNumber,
          currentBalance: req.body.currentBalance,
          currency: req.body.currency,
          interestRate: req.body.interestRate,
          term: req.body.term
        }
        const existAccount = await Account.getAccountByAccountNumber(accountNumber)
        if (
            !account.MaKH ||
            !account.typeAccount ||
            !account.currency ||
            !account.interestRate
        ) {
          res.json({
            code: 9998,
            data: {
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          });
        } else if (existAccount) {
          res.json({
            code: 9993,
            message: "Hệ thống đã có tài khoản này",
          });
        } else {
          const newAccount = await Account.createAccount(account)
          res.json({
            code: 1000,
            message: "Thêm tài khoản mới thành công",
            data: newAccount
          });
        }
      }
    }catch (error)
      {
        console.log(error)
        res.status(500).json({
          message: "Không thể thêm tài khoản mới",
        });
      }
    },

  //
}
module.exports = AccountController;