const HoSo = require('../models/hoso')
const ModelBIDV = require('../models/mhbidv')
const ModelEY = require('../models/mhey')
const DanhGiaTinDung = require("../models/danhgiatindung");
const Client = require('../models/client')
const modelBIDV = require("../utils/modelBIDV");
const {modelEY} = require("../utils/modelEY");
const Loan = require("../models/loan");

const DGTDController = {
    // [GET] danhgiatindung/ -- list hop dong
    listDanhGia: async (req, res, next) => {
        try {
            const listDanhGia = await DanhGiaTinDung.getAllDanhGia()
            if (listDanhGia) {
                return res.json({
                    code: 1000,
                    data: listDanhGia,
                    message: "Danh sách đánh giá tìm thấy thành công"
                })
            } else {
                res.json({
                    code: 1000,
                    message: "Không tìm thấy danh sách đánh giá"
                })
            }

        } catch (error) {
            res.json({
                code: 9992,
                message: "Không tìm thấy danh sách đánh giá",
            });
        }
    },
    findDanhGia: async (req, res, next) => {
        try {
            const danhgia = await DanhGiaTinDung.getDanhGiaById(req.params.id)
            const khachhang = await Client.getClientByIdHS(danhgia.idHoSo)
            if (!danhgia || !khachhang) {
                return res.json({
                    code: 9992,
                    message: "Chưa có đánh giá của hồ sơ này",
                });
            }
            return res.json({
                code: 1000,
                message: "hồ sơ đã được đánh giá",
                data: {
                    danhgia: danhgia,
                    idClient: khachhang.idClient
                }
            });

        } catch (error) {
            return res.json({
                code: 9999,
                data: {message: "Không tìm thấy đánh giá của hồ sơ này"},
            });
        }
    }
    ,
    createDanhGia: async (req, res, next) => {
        try {
            const existDanhGia = await DanhGiaTinDung.getDanhGiaByMaHoSo(req.body.maHoSo)
            if (existDanhGia) {
                return res.json({
                    code: 9993,
                    message: "Đã có đánh giá của hồ sơ này",
                });
            }
            const idHoSo = await HoSo.getHoSoByMaHoSo(req.body.maHoSo)
            const mhBIDV = await modelBIDV.xepHangBIDV(req.body.maHoSo)
            const mhEY = await modelEY(req.body.maHoSo)
            const danhgia = {
                idHoSo: idHoSo.idHoSo,
                XHCaNhanBIDV: mhBIDV.XHCaNhanBIDV,
                XHEY: mhEY.XHEY,
                DanhGiaXH: mhEY.DanhGiaXH,
                MucDoRuiRo: mhEY.MucDoRuiRo,
                DanhGiaCaNhanBIDV: mhBIDV.DanhGiaCaNhanBIDV,
                XHTSDBBIDV: mhBIDV.XHTSDBBIDV,
                DanhGiaTSDBBIDV: mhBIDV.DanhGiaTSDBBIDV,
                KetQuaDanhGiaBIDV: mhBIDV.KetQuaDanhGiaBIDV,
            }
            const newDanhGia = await DanhGiaTinDung.createDanhGiaTinDung(danhgia)
            res.json({
                code: 1000,
                message: "Thêm đánh giá mới thành công",
                data: newDanhGia
            });

        } catch (error) {
            return res.json({
                code: 9999,
                message: "Không thể tạo đánh giá cho hồ sơ này"
            });
        }
    }
    ,
    listVay: async (req, res) => {
        try {
            const listVay = await Loan.listVayByIdClient(req.params.idClient)
            const typeTien = await HoSo.typeTienTra(req.params.idClient)
            if (listVay) {
                return res.json({
                    code: 1000,
                    message: "hiển thị danh sách khoản vay của khách hàng thành công",
                    data: listVay, typeTien
                });
            }
        } catch (err) {
            return res.json({
                code: 9999,
                message: "Không thể hiển thị danh sách khoản vay"
            });
        }
    },
    tyleThuNo: async (req, res) => {
        try {
            const thunhap = await HoSo.TyLeThuNhapNo(req.params.idHoSo)
            if (thunhap) {
                return res.json({
                    code: 1000,
                    data: thunhap,
                    message: "Tỷ lệ thu nhập trên nợ phải trả theo tháng"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không thể hiển thị tỷ lệ thu nhập trên nợ phải trả theo tháng"
                });
            }

        } catch (err) {
            return res.json({
                code: 9999,
                message: "Có lỗi xảy ra trong quá trình lấy dữ liệu"
            });
        }
    },
    TrungBinhVay: async (req, res) => {
        try {
            const trungbinhvay = await Loan.TrungBinhVay(req.params.idClient)
            if (trungbinhvay) {
                return res.json({
                    code: 1000,
                    data: trungbinhvay,
                    message: "Trung bình vay theo năm của khách hàng"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không thể hiển thị trung bình vay của khách hàng"
                });
            }

        } catch (err) {
            console.log(err)
            return res.json({
                code: 9999,
                message: "Có lỗi xảy ra trong quá trình lấy dữ liệu"
            });
        }
    },
    PhanPhoiLoaiGD: async (req, res) => {
        try {
            const loaigiaodich = await Loan.TyLeLoaiGiaoDich(req.params.idClient)
            if (loaigiaodich) {
                return res.json({
                    code: 1000,
                    data: loaigiaodich,
                    message: "Tỷ lệ giao dịch của khách hàng"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không thể hiển thị tỷ lệ giao dịch của khách hàng"
                });
            }

        } catch (err) {
            return res.json({
                code: 9999,
                message: "Có lỗi xảy ra trong quá trình lấy dữ liệu"
            });
        }
    },
    ParetoThoiHan: async (req, res) => {
        try {
            const thoihan = await Loan.ParetoThoiHan(req.params.idClient)
            // Tính tổng tích lũy và tỷ lệ phần trăm
            let totalLoans = thoihan.reduce((sum, row) => sum + row.SoLuongVay, 0);
            let cumulativeSum = 0;
            const paretoData = thoihan.map(row => {
                cumulativeSum += row.SoLuongVay;
                return {
                    LoanTermMonths: row.ThoiHanVay,
                    LoanCount: row.SoLuongVay,
                    CumulativePercentage: ((cumulativeSum / totalLoans) * 100).toFixed(2)
                };
            });

            if (paretoData) {
                return res.json({
                    code: 1000,
                    data: paretoData,
                    message: "Số lượng vay theo mục đích của khách hàng"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không thể hiển thị Số lượng vay theo mục đích của khách hàng"
                });
            }

        } catch (err) {
            return res.json({
                code: 9999,
                message: "Có lỗi xảy ra trong quá trình lấy dữ liệu"
            });
        }
    },
    PhanPhoiPhuongThucGD: async (req, res) => {
        try {
            const phuongthuc = await Loan.TyLePhuongThucGD(req.params.idClient)
            if (phuongthuc) {
                return res.json({
                    code: 1000,
                    data: phuongthuc,
                    message: "Số lượng giao dịch theo phương thức giao dịch của khách hàng"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không thể hiển thị Số lượng giao dịch theo phương thức giao dịch của khách hàng"
                });
            }

        } catch (err) {
            return res.json({
                code: 9999,
                message: "Có lỗi xảy ra trong quá trình lấy dữ liệu"
            });
        }
    }
};
module.exports = DGTDController;