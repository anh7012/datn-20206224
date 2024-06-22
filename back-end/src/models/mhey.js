const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment");

module.exports = class MoHinhEY {
    constructor(mhey) {
        this.id = mhey.idMHEY;
        this.idHoSo = mhey.idHoSo;
        this.DuNo = mhey.DuNo
        this.DiemDuNoTrenTSRong = mhey.DiemDuNoTrenTSRong
        this.TinhHinhTraNo = mhey.TinhHinhTraNo
        this.TinhHinhTraLai = mhey.TinhHinhTraLai
        this.DanhGiaKNTra = mhey.DanhGiaKNTra
        this.DiemLoiNhuanTrenTN = mhey.DiemLoiNhuanTrenTN
        this.DiemTienKeHoachTrenNguonTraNo = mhey.DiemTienKeHoachTrenNguonTraNo
        this.populationDate = mhey.populationDate
        this.TaiSanRong = mhey.TaiSanRong
        this.DiemTinhHinhTraLai = mhey.DiemTinhHinhTraLai
        this.DiemDanhGiaKNTra = mhey.DiemDanhGiaKNTra
        this.LoiNhuan = mhey.LoiNhuan
        this.NguonTraNo = mhey.NguonTraNo
        this.DoanhThu = mhey.DoanhThu
        this.DiemTinhHinhTraNo = mhey.DiemTinhHinhTraNo
    }

    static createEY = async (ey) => {
        const idEY = uuidv4({format: "hex"}).substring(0, 32);
        const populationDate = moment()
        const [result] = await promisePool.query(
            "INSERT INTO mhey (idMHEY,idHoSo,populationDate,DuNo, TaiSanRong, DiemDuNoTrenTSRong, TinhHinhTraNo, DiemTinhHinhTraNo, TinhHinhTraLai, DiemTinhHinhTraLai, DanhGiaKNTra, DiemDanhGiaKNTra, LoiNhuan, DoanhThu, DiemLoiNhuanTrenTN, NguonTraNo, DiemTienKeHoachTrenNguonTraNo) VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                idEY,
                ey.idHoSo,
                populationDate.format('YYYY-MM-DD'),
                ey.DuNo,
                ey.TaiSanRong,
                ey.DiemDuNoTrenTSRong,
                ey.TinhHinhTraNo,
                ey.DiemTinhHinhTraNo,
                ey.TinhHinhTraLai,
                ey.DiemTinhHinhTraLai,
                ey.DanhGiaKNTra,
                ey.DiemDanhGiaKNTra,
                ey.LoiNhuan,
                ey.DoanhThu,
                ey.DiemLoiNhuanTrenTN,
                ey.NguonTraNo,
                ey.DiemTienKeHoachTrenNguonTraNo
            ]
        )
        const newData = {id: idEY, ...ey};
        return newData;
    }
    static getMHEY = async (maHoSo) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM mhey JOIN hoso ON mhey.idHoSo = hoso.idHoSo WHERE hoso.maHoSo = ?;",
            [maHoSo]
        );
        return rows[0];
    }
};
