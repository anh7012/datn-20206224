const HopDong = require('../models/hopdong')
const Client = require('../models/client')
const {generateUniqueHopDong} = require("../utils/hopdong");
const LoaiVay = require("../models/loaivay");

const HopDongController = {
    // [GET] hopdong/ -- list hop dong
    listHopDong: async (req, res, next) => {
        try {
            const listHD = await HopDong.getAllHD();
            if (listHD) {
                res.json({
                    code: 1000,
                    data: listHD,
                    message: "Danh sách hợp đồng tìm thấy thành công"
                })
            } else {
                res.json({
                    code: 9992,
                    message: "Không tìm thấy danh sách hợp đồng",
                });
            }
        } catch (error) {
            res.json({
                code: 9999,
                message: "Không tìm thấy danh sách hợp đồng",
            });
        }
    },
    inforHopDong: async (req, res, next) => {
        try {
            const hopdong = await HopDong.getHopDongById(req.params.id)
            if (hopdong) {
                res.json({
                    code: 1000,
                    data: hopdong,
                    message: "Hợp đồng tìm thấy thành công"
                })
            } else {
                res.json({
                    code: 9992,
                    message: "Không tìm thấy hợp đồng",
                });
            }
        } catch (error) {
            res.json({
                code: 9999,
                message: "Không tìm thấy  hợp đồng",
            });
        }
    },
    createHopDong: async (req, res, next) => {
        try {
            const hoso = await HoSo.getHoSoByMaHoSo(req.body.maHoSo)
            const mucdich = await LoaiVay.getLoaiVayByID(hoso.idloaiVay)
            const client = await Client.getClientByIdHS(hoso.idHoSo)
            const maHopDong = await generateUniqueHopDong()
            const hopdong = {
                idHoSo: hoso.idHoSo,
                idClient: client.idClient,
                so_hopdong: maHopDong,
                ngay_ky: req.body.ngay_ky,
                dia_diem_ky: req.body.dia_diem_ky,
                ten_nganhang: req.body.ten_nganhang,
                chinhanh_phonggiaodich: req.body.chinhanh_phonggiaodich,
                ma_so_doanhnghiep: req.body.ma_so_doanhnghiep,
                ngay_cap_ma_so: req.body.ngay_cap_ma_so,
                dia_chi_tru_so: req.body.dia_chi_tru_so,
                dien_thoai: req.body.dien_thoai,
                nguoi_dai_dien: req.body.nguoi_dai_dien,
                chuc_vu: req.body.chuc_vu,
                SoTienVay: hoso.TongTienVay,
                ThoiHan: hoso.KyHan,
                TanSuatThanhToan: req.body.TanSuatThanhToan,
                MucDich: mucdich.TenLoaiVay,
                PhuongThucGiaiNgan: req.body.PhuongThucGiaiNgan,
                PhuongThucChoVay: mucdich.HinhThucVay,
                status: req.body.status,
                DieuKhoanDacBiet: req.body.DieuKhoanDacBiet,
            }
            const newhopdong = await HopDong.createHopDong(hopdong)
            if (newhopdong) {
                res.json({
                    code: 1000,
                    data: hopdong,
                    message: "Tạo hợp đồng mới thành công"
                })
            } else {
                res.json({
                    code: 9992,
                    message: "Tạo hợp đồng mới thất bại",
                });
            }
        } catch (error) {
            res.json({
                code: 9999,
                message: "Không thể tạo hợp đồng",
            });
        }
    },
};
module.exports = HopDongController;