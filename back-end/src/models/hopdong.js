const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment/moment");
const {generateUniqueMaKH} = require("../utils/client");

module.exports = class HopDong {
    constructor(hopdong) {
        this.idHopDong = hopdong.idHopDong
        this.idHoSo = hopdong.idHoSo
        this.idClient = hopdong.idClient
        this.so_hopdong = hopdong.so_hopdong
        this.ngay_ky = hopdong.ngay_ky
        this.dia_diem_ky = hopdong.dia_diem_ky
        this.ten_nganhang = hopdong.ten_nganhang
        this.chinhanh_phonggiaodich = hopdong.chinhanh_phonggiaodich
        this.ma_so_doanhnghiep = hopdong.ma_so_doanhnghiep
        this.ngay_cap_ma_so = hopdong.ngay_cap_ma_so
        this.dia_chi_tru_so = hopdong.dia_chi_tru_so
        this.dien_thoai = hopdong.dien_thoai
        this.nguoi_dai_dien = hopdong.nguoi_dai_dien
        this.chuc_vu = hopdong.chuc_vu
        this.SoTienVay = hopdong.SoTienVay
        this.ThoiHan = hopdong.ThoiHan
        this.TanSuatThanhToan = hopdong.TanSuatThanhToan
        this.MucDich = hopdong.MucDich
        this.PhuongThucGiaiNgan = hopdong.PhuongThucGiaiNgan
        this.PhuongThucChoVay = hopdong.PhuongThucChoVay
        this.status = hopdong.status
        this.DieuKhoanDacBiet = hopdong.DieuKhoanDacBiet
    }

    static getAllHD = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM hopdong;");
        return rows;
    };

    static createHopDong = async (hopdong) => {
        const idHopDong = uuidv4({format: "hex"}).substring(0, 32);
        const status= 'đang hoạt động'
        const [result] = await promisePool.query(
            "INSERT INTO client (idClient, HoTen, NgaySinh, Tuoi, GioiTinh, DiaChi, sdt, email, CCCD, typeCLient, populationDate,HoKhau,NoiCapCCCD,NgayCapCCCD, maKhachHang) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP,?,?,?,?);",
            [
                idHopDong,
                hopdong.idHoSo,
                hopdong.idClient,
                hopdong.so_hopdong,
                hopdong.ngay_ky,
                hopdong.dia_diem_ky,
                hopdong.ten_nganhang,
                hopdong.chinhanh_phonggiaodich,
                hopdong.ma_so_doanhnghiep,
                hopdong.ngay_cap_ma_so,
                hopdong.dia_chi_tru_so,
                hopdong.dien_thoai,
                hopdong.nguoi_dai_dien,
                hopdong.chuc_vu,
                hopdong.SoTienVay,
                hopdong.ThoiHan,
                hopdong.TanSuatThanhToan,
                hopdong.MucDich,
                hopdong.PhuongThucGiaiNgan,
                hopdong.PhuongThucChoVay,
                status,
                hopdong.DieuKhoanDacBiet
            ]
        )
        const newData = {id: idHopDong, ...hopdong};
        return newData;
    }
    static getHopDongById = async (idHopDong) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM hopdong WHERE idHopDong = ?;",
            [idHopDong]
        );
        return rows;
    };
};
