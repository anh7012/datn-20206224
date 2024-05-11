const User = require("../models/user");
const bcrypt = require("bcrypt");

const usersController = {
  // [GET] /users/list
  listUsers: async (req, res, next) => {
    try {
      const listUser = await User.getAllUser();
      console.log(listUser.length);
      res.json(listUser);
    } catch (error) {
      res.json({
        code: 9992,
        data: { message: "Không tìm thấy danh sách nhân viên" },
      });
    }
  },
  // [POST] /users/create
  create: async (req, res, next) => {
    try {
      const data = req.body;
      const existUser = await User.getByEmail(data.email);
      if (
        !data.roleName ||
        !data.username ||
        !data.password ||
        !data.email ||
        !data.HoTen
      ) {
        res.json({
          code: 9998,
          data: {
            message: "Vui lòng nhập đầy đủ thông tin",
          },
        });
      } else if (existUser) {
        res.json({
          code: 9993,
          message: "Tài khoản đã tồn tại",
        });
      } else {
        const saltRounds = 10; // Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        // Create new User
        const newUser = await User.createUser(data);
        res.json({ code: 1000, data: newUser });
      }
    } catch (error) {
      res.status(500).json({
        message: "Không thể thêm nhân viên mới",
      });
    }
  },
  // [PUT] /users/:id
  updateUser: async (req, res) => {
    try {
      const data = await User.updateUser(req.body);
      if (data.affectedRows == 1) {
        res.json({
          code: 1000,
          data: {
            message: "Thông tin nhân viên đã được cập nhật thành công!",
          },
        });
      } else {
        res.json({
          code: 1001,
          data: {
            message: "Thông tin nhân viên cập nhật thất bại",
          },
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "Không thể thay đổi thông tin nhân viên",
      });
    }
  },
  // [DELETE] /users/:id
  deleteUser: async (req, res) => {
    const idUser = req.params.id;
    const deletedUser = await User.deleteUser(idUser);
    return res.redirect("/users");
  },
};
module.exports = usersController;
