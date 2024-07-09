const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const Permission = require("../models/permisson");
module.exports = {
    checkUser: async (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];
        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
                if (err) {
                    return res.json({
                        code: 9999,
                        data: {message: "Token not valid"},
                    });
                }
                const user = await User.getUserById(data.id);
                if (!user) {
                    res.json({code: 9999, data: {message: "User cannot found"}});
                    return;
                }
                const roleInfo = await Role.getRoleById(user.idRole)
                if (!roleInfo) {
                    res.json({code: 9999, data: {message: "Role cannot found"}});
                    return;
                }
                if (roleInfo.roleName !== 'Nhân viên') {
                    res.json({code: 9999, data: {message: "Người dùng không phải nhân viên"}});
                    return;
                }
                next()
            })
        } else {
            return res.json({
                code: 9999,
                data: {message: "You're not authenticated"},
            });
        }
    },
    checkAdmin: async (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];
        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
                if (err) {
                    return res.json({
                        code: 9999,
                        data: {message: "Token not valid"},
                    });
                }
                const user = await User.getUserById(data.id);
                if (!user) {
                    res.json({code: 9999, data: {message: "User cannot found"}});
                    return;
                }
                const roleInfo = await Role.getRoleById(user.idRole)
                if (!roleInfo) {
                    res.json({code: 9999, data: {message: "Role cannot found"}});
                    return;
                }
                if (roleInfo.roleName !== 'Quản trị viên') {
                    res.json({code: 9999, data: {message: "Người dùng không phải quản trị viên"}});
                    return;
                }
                next()
            })
        } else {
            return res.json({
                code: 9999,
                data: {message: "You're not authenticated"},
            });
        }
    },
    checkPermisson: async (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];
        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
                if (err) {
                    return res.json({
                        code: 9999,
                        data: {message: "Token not valid"},
                    });
                }
                const user = await User.getUserById(data.id);
                if (!user) {
                    res.json({code: 9999, data: {message: "User cannot found"}});
                    return;
                }
                const roleInfo = await Role.getRoleById(user.idRole)
                if (!roleInfo) {
                    res.json({code: 9999, data: {message: "Role cannot found"}});
                    return;
                }
                const permissions = await Permission.getPermissonByIdUser(user.idUser)
                if (!permissions){
                    res.json({code: 9999, data: {message: "List Permission cannot found"}});
                    return;
                }
                const listPermission = permissions.map(permission => ({
                    maPermission: permission.maPermission,
                    permissonName: permission.permissonName
                }));
                if (listPermission.some(e => e.maPermission === req.url.split('/').pop())) {
                    await next()
                } else {
                    return res.json({
                        code: 9999,
                        data: {message: "You're not authenticated"},
                    });
                }

            })
        } else {
            return res.json({
                code: 9999,
                data: {message: "You're not authenticated"},
            });
        }
    }
}