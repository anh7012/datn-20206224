const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");

module.exports = class User_Permissions {
    constructor(user_permissions) {
        this.id = user_permissions.id
        this.idUser = user_permissions.idUser
        this.idPermission = user_permissions.idPermission
    }

    static addPermission = async ({idUser, idPermission}) => {
        const id = uuidv4({format: "hex"}).substring(0, 32);
        const [result] = await promisePool.query(
            "INSERT INTO user_permissions (id,idUser, idPermission) VALUES (?,?, ?);",
            [
                id,
                idUser,
                idPermission
            ]
        );
        return result;
    };
}