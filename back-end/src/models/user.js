const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const {removeToken, addToken} = require("../utils/token");

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
    }

    static getAllUser = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM users;");
        return rows;
    };

    static getByIdUser = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users WHERE idUser = ?;",
            [id]
        );
        return rows[0];
    };

    static getInforByIdUser = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT email, HoTen, NgaySinh, GioiTinh, DiaChi FROM users WHERE idUser = ?;",
            [id]
        );
        return rows[0];
    };


    static getByUsername = async (username) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users WHERE username=?",
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
            "INSERT INTO users (idUser, idRole, username, password, email, HoTen, NgaySinh, GioiTinh, DiaChi) VALUES (?, (SELECT idRole FROM role WHERE roleName = ?), ?, ?, ?, ?, ?, ?, ?);",
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
        const [result] = await promisePool.query(
            "UPDATE users SET  email =?, HoTen =?, NgaySinh =?, GioiTinh =?, DiaChi =? WHERE idUser = ?;",
            [
                email,
                HoTen,
                NgaySinh,
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

    static changePassword = async ({id, newPassword}) => {
        const [result] = await promisePool.query(
            "UPDATE users SET password = ? WHERE idUser = ?;",
            [newPassword, id]
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

    static removeToken = async ({id, refreshTokens, refreshTokenRm}) => {
        let newRefreshToken = removeToken(refreshTokens, refreshTokenRm);
        if (newRefreshToken === "not found") {
            throw new Error("Token not found");
        }
        const [result] = await promisePool.query(
            "UPDATE users SET refreshTokens = ? WHERE idUser = ?;",
            [newRefreshToken, id]
        );
        return result;
    };
};
