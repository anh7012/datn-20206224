const User = require("../models/user");

const hosoController = {
  // [GET] /user/list
  list: async (req, res, next) => {
    try {
      return res.send('Oke')
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = hosoController;
