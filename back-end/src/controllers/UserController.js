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
        // [GET] /users/:id
        getUser: async (req, res) => {
            try {
                const authorizationHeader = req.headers["authorization"];
                const accessToken = authorizationHeader.split(" ")[1];
                const user = await User.getUserById(req.params.id);
                const {password, refreshTokens, ...other} = user;
                return res.json({
                    code: 1000,
                    data: {
                        user: other,
                        accessToken: accessToken,
                        message: "Lấy thông tin thành công",
                    },
                });
            } catch (error) {
                res.json({
                    code: 9992,
                    data: {message: "Không tìm thấy nhân viên"},
                });
            }
        },
        // [GET] /users/:id/getUserAll
        getUserAll: async (req, res, next) => {
            try {
                const user = await User.getUserById(req.params.id);
                return res.json({
                    code: 1000,
                    data: {
                        user: user,
                        message: "Lấy thông tin thành công",
                    },
                });
            } catch (error) {
                res.json({
                    code: 9992,
                    data: {message: "Không tìm thấy nhân viên"},
                });
            }
        },
        // [POST] /users/create
        create: async (req, res, next) => {
            try {
                const data = req.body;
                const existEmail = await User.getByEmail(data.email);
                const existUsername = await User.getByUsername(data.username);
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
                } else if (existUsername || existEmail) {
                    res.json({
                        code: 9993,
                        message: "Tài khoản đã tồn tại",
                    });
                } else {
                    const saltRounds = 10; // Number of salt round for bcrypt
                    data.password = await bcrypt.hash(data.password, saltRounds);
                    // Create new User
                    const newUser = await User.createUser(data);
                    res.json({
                        code: 1000,
                        message: "Thêm nhân viên mới thành công",
                        data: newUser
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: "Không thể thêm nhân viên mới",
                });
            }
        },
        // [PUT] /users/:id/updateUser
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
                return res.json({
                    code: 9999,
                    data: {
                        message: "Không thể thay đổi thông tin nhân viên",
                    },
                });
            }
        },

        // [DELETE] /users/:id/deleteUser
        deleteUser: async (req, res) => {
            try {
                const deletedUser = await User.deleteUser(req.params.id);
                if (deletedUser.affectedRows == 1) {
                   return res.json({
                        code: 1000,
                        data: {
                            message: "Đã được xoá thành công",
                        },
                    });
                } else {
                    return res.json({
                        code: 1001,
                        data: {
                            message: "Thực hiện xoá thất bại",
                        },
                    });
                }
            } catch (err) {
                return res.json({
                    code: 9999,
                    data: {
                        message: "Không thể xoá",
                    },
                });
            }
        },

//CHANGE USERNAME :id/change_username/
        changeUsername: async (req, res, next) => {
            try {
                const data = await User.changeUsername({
                    id: req.params.id,
                    newUsername: req.body.username
                })
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
                const saltRounds = 10; // Number of salt round for bcrypt
                const hashedPassword = await bcrypt.hash(
                    req.body.new_password,
                    saltRounds
                )
                const data = await User.changePassword({
                    id: req.params.id,
                    newPassword: hashedPassword,
                });
                if (data.affectedRows == 1) {
                    res.json({
                        code: 1000,
                        data: {
                            id: req.params.id,
                            password: req.body.new_password,
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

            } catch (error) {
                res.json({code: 9999, error: error.message})
            }
        },
//     CHANGE STATUS
        changeStatus: async (req, res, next) => {
            try {
                const data = await User.changeStatus({
                    id: req.params.id,
                    newStatus: req.body.status
                })
                if (data.affectedRows == 1) {
                    res.json({
                        code: 1000,
                        data: {
                            id: req.params.id,
                            username: req.body.status,
                            message: "Status has been changed successfully!",
                        }
                    })
                } else {
                    res.json({
                        code: 1006,
                        data: {
                            message: "Status has been changed and failed!",
                        },
                    })
                }
            } catch (error) {
                res.json({code: 9999, error: error.message});
            }
        },
// CHANGE ROLE, PERMISSON
        changeRole:
            async (req, res) => {
                try {
                    const data = await User.changeRole({
                        id: req.params.id,
                        newRole: req.body.roleName
                    })
                    if (data.affectedRows == 1) {
                        res.json({
                            code: 1000,
                            data: {
                                id: req.params.id,
                                username: req.body.roleName,
                                message: "Role has been changed successfully!",
                            }
                        })
                    } else {
                        res.json({
                            code: 1006,
                            data: {
                                message: "Role has been changed and failed!",
                            },
                        })
                    }
                } catch (error) {
                    res.json({code: 9999, error: error.message});
                }
            }
    }
;
module.exports = usersController;
