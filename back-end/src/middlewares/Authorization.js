const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
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
                const user = await User.getByIdUser(data.id);
                if (!user) {
                    res.json({code: 9999, data: {message: "User cannot found"}});
                    return;
                }
                const roleInfo = await  Role.getRoleById(user.idRole)

            })
        }
    },
    checkNhanVien: async () => {

    },
    checkPermisson: async () => {

    }
}