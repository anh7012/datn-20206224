const promisePool = require("../config/db/db");

module.exports = class Permission {
    constructor(permisson) {
        this.idPermission = permisson.idPermission
        this.maPermission = permisson.maPermission
        this.permissonName = permisson.permissonName
        this.parentPermission = permisson.parentPermission
    }

    static getPermissonByIdRole = async (idRole) => {
        const [rows, fields] = await promisePool.query(
            "SELECT role.idRole,role.roleName,permission.idPermission, permission.maPermission, permission.permissonName FROM role JOIN role_permissions ON role.idRole = role_permissions.idRole JOIN permission ON permission.idPermission = role_permissions.idPermission WHERE role.idRole =?;",
            [idRole]
        );
        return rows;
    };
    static getAllPermission = async (id) => {
        const [rows, fields] = await promisePool.query("SELECT * FROM permission;");
        return rows;
    };
    static getPermissonById = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM permission WHERE idPermission = ?;",
            [id]
        );
        return rows;
    };
}