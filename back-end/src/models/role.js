const promisePool = require("../config/db/db");

module.exports = class Role {
    constructor(role) {
        this.id = role.idRole
        this.roleName = role.roleName
    }

    static getRoleById = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM role WHERE idRole = ?;",
            [id]
        );
        return rows[0];
    };

}