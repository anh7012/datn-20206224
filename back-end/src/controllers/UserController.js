const User = require("../models/user");
const bcrypt = require("bcrypt");
const {mergeFields} = require("../utils/mergeField");
const Permission = require("../models/permisson");
const User_Permissions = require("../models/user_permissions");
const Role_Permissions = require("../models/role_permissions");
const {v4: uuidv4} = require("uuid");


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
                    const idUser = uuidv4({format: "hex"}).substring(0, 32);
                    const newUser = await User.createUser({
                            user: data,
                            idUser: idUser
                        }
                    );
                    const rolePermissions = await Role_Permissions.getAllRolePerByName(data.roleName)
                    for (const rolePermission of rolePermissions) {
                        await User_Permissions.addPermission({
                            idUser: idUser,
                            idPermission: rolePermission.idPermission
                        });
                    }
                    res.json({
                        code: 1000,
                        message: "Thêm nhân viên mới thành công",
                        data: newUser
                    });
                }
            } catch (error) {
                console.log(error)
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
        changeRole: async (req, res) => {
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
        },
        listPermission: async (req, res) => {
            try {
                const allPermissions = await Permission.getAllPermission()
                const userPermission = await User_Permissions.getPermissionByIdUser(req.params.id)
                // Tạo một tập hợp các permission mà người dùng đã có
                const userPermissions = new Set(userPermission.map(permission => permission.idPermission));

                // Lọc ra các permission mà người dùng còn thiếu
                const missingPermissions = allPermissions.filter(permission => !userPermissions.has(permission.idPermission));

                if (missingPermissions.length === 0) {
                    return res.json({
                        code: 1001,
                        data: [],
                        message: "Người dùng đã có tất cả các quyền",
                    });
                } else {
                    return res.json({
                        code: 1000,
                        data: missingPermissions,
                        message: "Danh sách các quyền người dùng còn thiếu",
                    });
                }

            } catch (err) {
                return res.json({
                    code: 9999,
                    message: "Không thể lấy danh sách quyền",
                });
            }
        },
        permissionsUser: async (req, res) => {
            try {
                const listPermission = await Permission.getPermissonByIdUser(req.params.id)
                if (listPermission) {
                    res.json({
                        code: 1000,
                        data: listPermission,
                        message: "Hiển thị danh sách quyền thành công!",
                    })
                } else {
                    res.json({
                        code: 9992,
                        data: {
                            message: "Hiển thị danh sách quyền thất bại!",
                        },
                    })
                }
            } catch (err) {
                return res.json({
                    code: 9999,
                    message: "Không thể lấy danh sách quyền",
                });
            }
        },
        addPermission: async (req, res) => {
            try {
                const listPermisson = req.body.listPermission
                const addPermissions = await Promise.all(listPermisson.map(async (idPermission) => {
                    const existPermission = await User_Permissions.checkPermission({
                        idUser: req.params.id,
                        idPermission: idPermission
                    })
                    if (existPermission.length > 0) {
                        return null;
                    }
                    const addPermissionResult = await User_Permissions.addPermission({
                        idUser: req.params.id,
                        idPermission: idPermission
                    })
                    const permission = await Permission.getPermissonById(idPermission)
                    return permission;
                }))
                // Lọc bỏ các giá trị null (các quyền đã tồn tại)
                const filteredPermissions = addPermissions.filter(permission => permission !== null);
                if (filteredPermissions.length > 0 && filteredPermissions.every(permission => permission && permission.affectedRows === 1)) {
                    return res.json({
                        code: 1000,
                        data: filteredPermissions,
                        message: "Thêm quyền cho nhân viên này thành công!",
                    });
                } else if (filteredPermissions.length === 0) {
                    return res.json({
                        code: 9993,
                        message: "Nhân viên đã có tất cả các quyền được yêu cầu",
                    });
                } else {
                    return res.json({
                        code: 9999,
                        data: filteredPermissions,
                        message: "Không thể thêm tất cả quyền cho nhân viên này",
                    });
                }
            } catch (err) {
                console.log(err)
                return res.json({
                    code: 9999,
                    message: "Không thể thêm quyền cho nhân viên này",
                });
            }
        },
        deletePermission: async (req, res) => {
            console.log('>>>>',req.body)
            try {
                const deletePermission = await User_Permissions.deletePermission({
                    idUser: req.params.id,
                    idPermission: req.body.idPermission
                })
                if (deletePermission.affectedRows === 1) {
                    return res.json({
                        code: 1000,
                        message: "Xóa quyền của người dùng thành công!"
                    });
                } else {
                    return res.json({
                        code: 9998,
                        message: "Người dùng không có quyền này hoặc xóa quyền không thành công"
                    });
                }
            } catch (err) {
                return res.json({
                    code: 9999,
                    message: "Không thể xoá quyền cho nhân viên này",
                });
            }
        }
    }
;
module.exports = usersController;
