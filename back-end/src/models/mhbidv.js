const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment/moment");

module.exports = class MoHinhBIDV {
    constructor(mhbidv) {
        this.id = mhbidv.idMHBIDV;
        this.idHoSo = mhbidv.idHoSo;
        this.DiemTyleTienTraTrenTN = mhbidv.DiemTyleTienTraTrenTN;
        this.TinhHinhTraNo = mhbidv.TinhHinhTraNo;
        this.LoaiTSDB = mhbidv.LoaiTSDB;
        this.TenTSDB = mhbidv.TenTSDB;
        this.GiaTriTSDB = mhbidv.GiaTriTSDB;
        this.RuiRoGiamGiaTSDB = mhbidv.RuiRoGiamGiaTSDB;
        this.populationDate = mhbidv.populationDate;
        this.DiemTinhHinhTraNo = mhbidv.DiemTinhHinhTraNo
        this.DiemLoaiTSDB = mhbidv.DiemLoaiTSDB
        this.DiemTSDBTrenTongNo = mhbidv.DiemTSDBTrenTongNo
        this.DiemRuiRoGiamGiaTSDB = mhbidv.DiemRuiRoGiamGiaTSDB
        this.TyLeTienTraTrenThuNhap = mhbidv.TyLeTienTraTrenThuNhap
        this.TSDBTrenTongNo = mhbidv.TSDBTrenTongNo
    }

    static createBIDV = async (bidv) => {
        const idMHBIDV = uuidv4({format: "hex"}).substring(0, 32);
        const populationDate = moment()
        const [result] = await promisePool.query(
            "INSERT INTO mhbidv (idMHBIDV, idHoSo, TyLeTienTraTrenThuNhap, DiemTyleTienTraTrenTN, LoaiTSDB, TenTSDB, GiaTriTSDB, RuiRoGiamGiaTSDB, populationDate, DiemLoaiTSDB, DiemTSDBTrenTongNo, DiemRuiRoGiamGiaTSDB,TSDBTrenTongNo, TinhHinhTraNo, DiemTinhHinhTraNo) VALUES ( ?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                idMHBIDV,
                bidv.idHoSo,
                bidv.TyLeTienTraTrenThuNhap,
                bidv.DiemTyleTienTraTrenTN,
                bidv.LoaiTSDB,
                bidv.TenTSDB,
                bidv.GiaTriTSDB,
                bidv.RuiRoGiamGiaTSDB,
                populationDate.format('YYYY-MM-DD'),
                bidv.DiemLoaiTSDB,
                bidv.DiemTSDBTrenTongNo,
                bidv.DiemRuiRoGiamGiaTSDB,
                bidv.TSDBTrenTongNo,
                bidv.TinhHinhTraNo,
                bidv.DiemTinhHinhTraNo
            ]
        )
        const newData = {id: result.insertId, ...bidv};
        return newData;
    }

    static getMHBIDV = async (maHoSo) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM mhbidv JOIN hoso ON mhbidv.idHoSo = hoso.idHoSo WHERE hoso.maHoSo = ?;",
            [maHoSo]
        );
        return rows[0];
    }
};
