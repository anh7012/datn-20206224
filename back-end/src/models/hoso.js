const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment");
const updateIfNull = require('../utils/updateIfNull')

module.exports = class HoSo{

    constructor(hoso) {
        this.id = hoso.idHoSo
        this.idClient = hoso.idClient
        this.idloaiVay = hoso.idloaiVay
        this.KyHan = hoso.KyHan
        this.typeTienTra = hoso.typeTienTra
        this.TongTienVay = hoso.TongTienVay
        this.LaiSuatVay = hoso.LaiSuatVay
        this.TrinhDoHocVan = hoso.TrinhDoHocVan
        this.TienAn = hoso.TienAn
        this.TinhTrangCuTru = hoso.TinhTrangCuTru
        this.SoNguoiAnTheo = hoso.SoNguoiAnTheo
        this.CoCauGD = hoso.CoCauGD
        this.BHNhanTho = hoso.BHNhanTho
        this.CongViec = hoso.CongViec
        this.ThoiGianLamViec = hoso.ThoiGianLamViec
        this.RuiRoNN = hoso.RuiRoNN
        this.ThuNhapRong = hoso.ThuNhapRong
        this.CacDVSD = hoso.CacDVSD
        this.effDate = hoso.effDate
        this.endDate = hoso.endDate
        this.maHoSo = hoso.maHoSo
        this.DiemCacDVSD = hoso.DiemCacDVSD
        this.DiemTrinhDoHocVan = hoso.DiemTrinhDoHocVan
        this.DiemTienAn = hoso.DiemTienAn
        this.DiemTTCuTru = hoso.DiemTTCuTru
        this.DiemSoNguoiAnTheo = hoso.DiemSoNguoiAnTheo
        this.DiemCoCauGD = hoso.DiemCoCauGD
        this.DiemBHNhanTho = hoso.DiemBHNhanTho
        this.DiemCongViec = hoso.DiemCongViec
        this.DiemTGLamViec = hoso.DiemTGLamViec
        this.DiemRuiRoNN = hoso.DiemRuiRoNN
        this.DiemThuNhapRong = hoso.DiemThuNhapRong
        this.trangthaihoso = hoso.trangthaihoso
        this.SoTienTraHangThang = hoso.SoTienTraHangThang
        this.DiemTuoi = hoso.DiemTuoi
        this.created_at = hoso.created_at
        this.updated_at = hoso.updated_at
    }
    static getAllHoSo = async () => {
    const [rows, fields] = await promisePool.query(
        "SELECT idHoSo, maHoSo, HoTen, TongTienVay, LaiSuatVay, KyHan, trangthaihoso, CCCD, hoso.created_at, hoso.updated_at  FROM hoso JOIN client ON client.idClient = hoso.idClient;"
    );
    return rows;
  };
    static getHoSoByIdHoSo = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM hoso WHERE idHoSo = ?;",
            [id]
        );
        return rows[0];
    }

    static getHoSoFullByIdHoSo = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM hoso JOIN mhbidv ON hoso.idHoSo = mhbidv.idHoSo JOIN mhey ON hoso.idHoSo = mhey.idHoSo JOIN loaivay ON loaivay.idloaiVay = hoso.idloaiVay WHERE hoso.idHoSo = ?;",
            [id]
        );
        return rows[0];
    };

   static updateHoSoDetails = async (idHoSo, newValues) => {
        try {
            const result = await Promise.all([
                updateIfNull('hoso', 'idHoSo', idHoSo, newValues),
                updateIfNull('mhbidv', 'idHoSo', idHoSo, newValues),
                updateIfNull('mhey', 'idHoSo', idHoSo, newValues)
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static getHoSoByIdAccount= async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM hoso WHERE idAccount = ?;",
            [id]
        );
        return rows[0];
    }

    static getHoSoByMaHoSo= async (MaHoSo) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM hoso WHERE maHoSo = ?;",
            [MaHoSo]
        );
        return rows[0];
    }



    static createHoSo = async (hoso) => {
        const idHoSo = uuidv4({format: "hex"}).substring(0, 32);
        const effDate = moment()
        const [result] = await promisePool.query(
            "INSERT INTO hoso (idHoSo,  typeTienTra, LaiSuatVay, TrinhDoHocVan, TienAn, TinhTrangCuTru, SoNguoiAnTheo, CoCauGD, BHNhanTho, CongViec, ThoiGianLamViec, RuiRoNN,ThuNhapRong,effDate,DiemTrinhDoHocVan,DiemTienAn,DiemTTCuTru,DiemSoNguoiAnTheo,DiemCoCauGD,DiemBHNhanTho,DiemCongViec,DiemTGLamViec,DiemRuiRoNN,DiemThuNhapRong, TongTienVay, CacDVSD, DiemCacDVSD,idClient,trangthaihoso,maHoSo,idloaiVay,SoTienTraHangThang, KyHan,DiemTuoi,created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);",
            [
                idHoSo,
                hoso.typeTienTra,
                hoso.LaiSuatVay,
                hoso.TrinhDoHocVan,
                hoso.TienAn,
                hoso.TinhTrangCuTru,
                hoso.SoNguoiAnTheo,
                hoso.CoCauGD,
                hoso.BHNhanTho,
                hoso.CongViec,
                hoso.ThoiGianLamViec,
                hoso.RuiRoNN,
                hoso.ThuNhapRong,
                effDate.format('YYYY-MM-DD'),
                hoso.DiemTrinhDoHocVan,
                hoso.DiemTienAn,
                hoso.DiemTTCuTru,
                hoso.DiemSoNguoiAnTheo,
                hoso.DiemCoCauGD,
                hoso.DiemBHNhanTho,
                hoso.DiemCongViec,
                hoso.DiemTGLamViec,
                hoso.DiemRuiRoNN,
                hoso.DiemThuNhapRong,
                hoso.TongTienVay,
                hoso.CacDVSD,
                hoso.DiemCacDVSD,
                hoso.idClient,
                hoso.trangthaihoso,
                hoso.maHoSo,
                hoso.idloaiVay,
                hoso.SoTienTraHangThang,
                hoso.KyHan,
                hoso.DiemTuoi
            ]
        )
        const newData = {id: result.insertId, ...hoso};
        return newData;
    }

    static updateTrangThai = async ({trangthaihoso, idHoSo}) => {
        const [result] = await promisePool.query(
            "update hoso set trangthaihoso = ?, updated_at = CURRENT_TIMESTAMP where idHoSo = ?",
            [trangthaihoso, idHoSo]
        )
        return result
}
}