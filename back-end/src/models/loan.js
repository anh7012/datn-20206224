const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment/moment");

module.exports = class Loan {
    constructor(loan) {
        this.id = loan.idLoan
        this.idHopDong = loan.idHopDong
        this.idClient = loan.idClient
        this.TongVay = loan.TongVay
        this.ThoiHanVay = loan.ThoiHanVay
        this.TraMoiThang = loan.TraMoiThang
        this.LaiSuatVay = loan.LaiSuatVay
        this.TrangThai = loan.TrangThai
        this.MucDich = loan.MucDich
        this.NhomNo = loan.NhomNo
        this.effDate = loan.effDate
        this.endDate = loan.endDate
        this.TinhTrang = loan.TinhTrang
        this.NgayDaoHan = loan.NgayDaoHan
    }

    static getTongNo = async (maKH) => {
        const [rows, fields] = await promisePool.query(
            "SELECT SUM(NoPhaiTra) TongNo FROM loan  LEFT JOIN client ON loan.idClient = client.idClient WHERE maKhachHang = ?;",
            [maKH]
        );
        return rows[0];
    }
    static getTongNoByID = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT IFNULL(SUM(NoPhaiTra), 0) TongNo FROM loan  WHERE idClient = ?;",
            [id]
        );
        return rows[0];
    }
}