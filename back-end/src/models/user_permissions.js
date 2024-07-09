const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");

module.exports = class User_Permissions {
    constructor(user_permissions) {
        this.id = user_permissions.id
        this.idUser = user_permissions.idUser
        this.idPermission = user_permissions.idPermission
    }

    static getPermissionByIdUser = async (idUser) => {
        const [rows, field] = await promisePool.query(
            "SELECT user_permissions.idPermission, maPermission, permissonName, parentPermission FROM user_permissions JOIN permission ON permission.idPermission = user_permissions.idPermission WHERE idUser = ?;",
            [idUser]
        )
        return rows
    }
    static checkPermission = async ({idUser, idPermission}) => {
        const [rows, field] = await promisePool.query(
            "SELECT * FROM user_permissions WHERE idUser = ? AND idPermission = ?;",
            [
                idUser,
                idPermission
            ]
        );
        return rows
    };
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
    static deletePermission = async ({idUser, idPermission}) => {
        const [result] = await promisePool.query(
            "DELETE FROM user_permissions WHERE idUser = ? AND idPermission = ?;",
            [idUser, idPermission]
        )
        return result
    }
}