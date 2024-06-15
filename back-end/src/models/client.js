const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require('moment')
const {generateUniqueMaKH} = require("../utils/client");

module.exports = class Client {
    constructor(client) {
        this.idClient = client.idClient;
        this.maKhachHang = client.maKhachHang;
        this.HoTen = client.HoTen;
        this.NgaySinh = client.NgaySinh;
        this.Tuoi = client.Tuoi;
        this.GioiTinh = client.GioiTinh;
        this.DiaChi = client.DiaChi;
        this.sdt = client.sdt;
        this.email = client.email;
        this.CCCD = client.CCCD;
        this.typeClient = client.typeClient;
        this.populationDate = client.populationDate;
        this.HoKhau = client.HoKhau
        this.NoiCapCCCD = client.NoiCapCCCD
        this.NgayCapCCCD = client.NgayCapCCCD
        this.updateDate = client.updateDate
    }

    static getAllClient = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM client;");
        return rows;
    }

    static getClientById = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM client WHERE idClient = ?;",
            [id]);
        return rows[0];
    }

    static getClientByEmail = async (email) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM client WHERE email = ?;",
            [email]
        );
        return rows[0];
    };

    static getInforClientById = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT HoTen,NgaySinh,GioiTinh,DiaChi,sdt,email FROM client WHERE idClient = ?;",
            [id]
        );
        return rows[0];
    }

    static getClientByMaKH = async (maKH) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM client WHERE maKhachHang = ?;",
            [maKH]
        );
        return rows[0];
    }

    static getloaiClientByMaKH = async (maKH) => {
        const [rows, fields] = await promisePool.query(
            "SELECT maKhachHang, typeClient FROM client WHERE maKhachHang = ?;",
            [maKH]
        );
        return rows[0];
    }


    static createClient = async (client) => {
        const idClient = uuidv4({format: "hex"}).substring(0, 32);
        const Tuoi = (dateOfBirth) => {
            // Tạo một đối tượng Moment từ ngày sinh
            const birthDateMoment = moment(dateOfBirth, 'YYYY-MM-DD');
            // Tính toán số năm kể từ ngày sinh đến ngày hiện tại
            const age = moment().diff(birthDateMoment, 'years');
            // Kiểm tra xem ngày sinh đã qua hay chưa trong năm nay
            return age;
        };
        const MaKH = await generateUniqueMaKH()

        const [result] = await promisePool.query(
            "INSERT INTO client (idClient, HoTen, NgaySinh, Tuoi, GioiTinh, DiaChi, sdt, email, CCCD, typeCLient, populationDate,HoKhau,NoiCapCCCD,NgayCapCCCD, maKhachHang) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP,?,?,?,?);",
            [
                idClient,
                client.HoTen,
                client.NgaySinh,
                Tuoi(client.NgaySinh),
                client.GioiTinh,
                client.DiaChi,
                client.sdt,
                client.email,
                client.CCCD,
                client.typeClient,
                client.HoKhau,
                client.NoiCapCCCD,
                client.NgayCapCCCD,
                MaKH
            ]
        )
        const newData = {id: result.insertId, ...client};
        return newData;
    }

    static updateClient = async ({HoTen, NgaySinh, GioiTinh, DiaChi, sdt, email, id}) => {
        const Tuoi = (dateOfBirth) => {
            // Tạo một đối tượng Moment từ ngày sinh
            const birthDateMoment = moment(dateOfBirth, 'YYYY-MM-DD');
            // Tính toán số năm kể từ ngày sinh đến ngày hiện tại
            const age = moment().diff(birthDateMoment, 'years');
            // Kiểm tra xem ngày sinh đã qua hay chưa trong năm nay
            return age;
        };
        const [result] = await promisePool.query(
            "UPDATE client SET  HoTen =?, NgaySinh =?,Tuoi =?, GioiTinh =?, DiaChi =?, sdt =?, email =?, updateDate = CURRENT_TIMESTAMP  WHERE idClient = ?;",
            [
                HoTen,
                NgaySinh,
                Tuoi(NgaySinh),
                GioiTinh,
                DiaChi,
                sdt,
                email,
                id
            ]
        );
        return result;
    };
};
