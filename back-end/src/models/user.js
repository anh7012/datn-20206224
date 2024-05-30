const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const {removeToken, addToken} = require("../utils/token");
const moment = require("moment/moment");
const momentYZ = require('moment-timezone');


module.exports = class Users {
    constructor(users) {
        this.id = users.idUser;
        this.idRole = users.idRole;
        this.username = users.username;
        this.password = users.password;
        this.email = users.email;
        this.HoTen = users.HoTen;
        this.GioiTinh = users.GioiTinh;
        this.DiaChi = users.DiaChi;
        this.refreshTokens = users.refreshTokens;
        this.status = users.status
        this.created_at = users.created_at
        this.updated_at = users.updated_at
    }

    static getAllUser = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM users JOIN role ON users.idRole = role.idRole;");
        return rows;
    };


    static getUserById = async (id) => {
        const [rows] = await promisePool.query(
            "SELECT * FROM users JOIN role ON users.idRole = role.idRole WHERE idUser = ?;",
            [id]
        );

        if (rows.length > 0) {
            const user = rows[0];
            // Chuyển đổi NgaySinh từ UTC sang Asia/Ho_Chi_Minh
            user.NgaySinh = momentYZ.tz(user.NgaySinh, 'UTC').tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
            console.log('Retrieved NgaySinh:', user.NgaySinh);
            return user;
        } else {
            throw new Error('User not found');
        }
    };

    static getUserAllById = async (id) => {
        const [rows] = await promisePool.query(
            "SELECT * FROM users JOIN role ON users.idRole = role.idRole WHERE idUser = ?;",
            [id]
        );
    }
    static getInforByIdUser = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT email, HoTen, NgaySinh, GioiTinh, DiaChi FROM users WHERE idUser = ?;",
            [id]
        );
        return rows[0];
    };


    static getByUsername = async (username) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users JOIN role ON users.idRole = role.idRole WHERE username= ?",
            [username]
        );
        return rows[0];
    };

    static getByEmail = async (email) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users WHERE email = ?;",
            [email]
        );
        return rows[0];
    };

    static createUser = async (user) => {
        const idUser = uuidv4({format: "hex"}).substring(0, 32);
        const [result] = await promisePool.query(
            "INSERT INTO users (idUser, idRole, username, password, email, HoTen, NgaySinh, GioiTinh, DiaChi,created_at, updated_at) VALUES (?, (SELECT idRole FROM role WHERE roleName = ?), ?, ?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);",
            [
                idUser,
                user.roleName,
                user.username,
                user.password,
                user.email,
                user.HoTen,
                user.NgaySinh,
                user.GioiTinh,
                user.DiaChi,
            ]
        );

        const newData = {id: result.insertId, ...user};
        return newData;
    };

    static updateUser = async ({email, HoTen, NgaySinh, GioiTinh, DiaChi, id}) => {
        console.log('Original NgaySinh:', NgaySinh);

        // Định dạng lại NgaySinh thành chuỗi theo định dạng YYYY-MM-DD
        const formatNgaySinh = moment(NgaySinh).format('YYYY-MM-DD');
        console.log('Formatted NgaySinh:', formatNgaySinh);

        const [result] = await promisePool.query(
            "UPDATE users SET email =?, HoTen =?, NgaySinh =?, GioiTinh =?, DiaChi =?, updated_at = CURRENT_TIMESTAMP WHERE idUser = ?;",
            [
                email,
                HoTen,
                formatNgaySinh,
                GioiTinh,
                DiaChi,
                id
            ]
        );
        return result;
    };

    static changeUsername = async ({id, newUsername}) => {
        const [result] = await promisePool.query(
            "UPDATE users SET username = ? WHERE idUser = ?;",
            [newUsername, id]
        )
        return result;
    }
    static changeStatus = async ({id, newStatus}) => {
        const [result] = await promisePool.query(
            "UPDATE users SET status = ? WHERE idUser = ?;",
            [newStatus, id]
        )
        return result;
    }

    static changePassword = async ({id, newPassword}) => {
        const [result] = await promisePool.query(
            "UPDATE users SET password = ? WHERE idUser = ?;",
            [newPassword, id]
        )
        return result;
    }

    static changeRole = async ({id, newRole}) => {
        const [result] = await promisePool.query(
            "UPDATE users SET users.idRole = (SELECT idRole FROM role WHERE roleName = ?) WHERE users.idUser = ?;",
            [newRole, id]
        )
        return result;
    }

    static deleteUser = async (idUser) => {
        const [result] = await promisePool.query(
            "DELETE FROM users WHERE idUser = ?;",
            [idUser]
        );
    };

    static addToken = async ({id, refreshTokens, refreshToken}) => {
        let newRefreshToken = addToken(refreshTokens, refreshToken);
        const [result] = await promisePool.query(
            "UPDATE users SET refreshTokens = ? WHERE idUser = ?;",
            [newRefreshToken, id]
        );
        return {result, newRefreshToken};
    };

    static removeToken = async ({id, refreshTokens, refreshToken}) => {
        let newRefreshToken = removeToken(refreshTokens, refreshToken);
        if (newRefreshToken === "not found") {
            throw new Error("Token not found");
        }
        const [result] = await promisePool.query(
            "UPDATE users SET refreshTokens = ? WHERE idUser = ?;",
            [newRefreshToken, id]
        );
        return result;
    };
    static deleteToken = async (id) => {
        const [result] = await promisePool.query(
            "UPDATE users SET refreshTokens = null WHERE idUser = ?;",
            [id]
        );
        return result;
    };

};
