const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment/moment");

module.exports = class Loan {
    constructor(loan) {
        this.id = loan.idLoan
        this.idHopDong = loan.idHopDong
        this.idClient = loan.idClient
        this.SoTienVay = loan.SoTienVay
        this.ThoiHanVay = loan.ThoiHanVay
        this.LaiSuatVay = loan.LaiSuatVay
        this.TrangThai = loan.TrangThai
        this.MucDich = loan.MucDich
        this.effDate = loan.effDate
        this.endDate = loan.endDate
        this.NgayDaoHan = loan.NgayDaoHan
        this.TongLai = loan.TongLai
        this.TongGocLai = loan.TongGocLai
        this.SoTienDaTra = loan.SoTienDaTra
    }

    static getTongNo = async (maKH) => {
        const [rows, fields] = await promisePool.query(
            "SELECT SUM((TongGocLai - SoTienDaTra)) TongNo FROM loan  LEFT JOIN client ON loan.idClient = client.idClient WHERE maKhachHang = ?;",
            [maKH]
        );
        return rows[0];
    }
    static getTongNoByID = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT IFNULL(SUM((TongGocLai - SoTienDaTra)), 0) TongNo FROM loan  WHERE idClient = ?;",
            [id]
        );
        return rows[0];
    }


}