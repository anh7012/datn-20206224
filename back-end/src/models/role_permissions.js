const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");

module.exports = class Role_Permissions {
    constructor(role_permissions) {
        this.id = role_permissions.id
        this.idRole = role_permissions.idRole
        this.idPermission = role_permissions.idPermission
    }

    static getAllRolePerByName = async (roleName) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM role_permissions JOIN role ON role.idRole = role_permissions.idRole WHERE roleName = ?;",
            [roleName]
            );
        return rows;
    }
}