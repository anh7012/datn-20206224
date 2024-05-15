const User = require("../models/user");
const bcrypt = require("bcrypt");
const {mergeFields} = require("../utils/mergeField");

const usersController = {
    // [GET] /users/list
    listUsers: async (req, res, next) => {
        try {
            const listUser = await User.getAllUser();
            res.json(listUser);
        } catch (error) {
            res.json({
                code: 9992,
                data: {message: "Không tìm thấy danh sách nhân viên"},
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
                res.json({
                    code: 1000,
                    message: "Thêm nhân viên mới thành công",
                    data: newUser});
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
                    const old_data = await User.getInforByIdUser(req.params.id)
            const new_data = await mergeFields(req.body, old_data)
            const data = await User.updateUser({
                email: new_data.email,
                HoTen: new_data.HoTen,
                NgaySinh: new_data.NgaySinh,
                GioiTinh: new_data.GioiTinh,
                DiaChi: new_data.DiaChi,
                id: req.params.id
            });
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
            console.log(error)
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

//CHANGE USERNAME :id/change_username/
    changeUsername: async (req, res, next) => {
        try {
            const data = await User.changeUsername({
                id: req.params.id,
                newUsername: req.body.username
            })
            console.log(data)
            if (data.affectedRows == 1) {
                res.json({
                    code: 1000,
                    data: {
                        id: req.params.id,
                        username: req.body.username,
                        message: "Username has been changed successfully!",
                    }
                })
            } else {
                res.json({
                    code: 1006,
                    data: {
                        message: "Username has been changed and failed!",
                    },
                })
            }
        } catch (error) {
            res.json({code: 9999, error: error.message});
        }
    },
    //CHANGE PASSWORD
    changePassword: async (req, res, next) => {
        try {
            const user = await User.getByIdUser(req.params.id)
            const saltRounds = 10; // Number of salt round for bcrypt
            const hashedPassword = await bcrypt.hash(
                req.body.new_password,
                saltRounds
            )
            const isPasswordMatch = await bcrypt.compare(
                req.body.old_password,
                user.password
            )
            if (!isPasswordMatch) {
                res.json({
                    code: 1006,
                    data: {
                        id: req.body.id,
                        message: "Incorrect old password",
                    },
                });
            } else {
                const data = await User.changePassword({
                    id: req.params.id,
                    newPassword: hashedPassword,
                });
                if (data.affectedRows == 1) {
                    res.json({
                        code: 1000,
                        data: {
                            id: req.params.id,
                            // password: req.body.new_password,
                            message: "Password has been changed successfully!",
                        },
                    });
                } else {
                    res.json({
                        code: 1006,
                        data: {
                            message: "Password has been changed and failed!",
                        },
                    });
                }
            }
        } catch (error) {
            res.json({code: 9999, error: error.message})
        }
    }

};
module.exports = usersController;
