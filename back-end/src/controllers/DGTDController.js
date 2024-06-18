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
            console.log(listDanhGia)
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
            const listVay = await Loan.listVayByIdClient(req.params.id)
            if (listVay) {
                return res.json({
                    code: 1000,
                    message: "hiển thị danh sách khoản vay của khách hàng thành công",
                    data: listVay
                });
            }
        }catch (err) {
            return res.json({
                code: 9999,
                message: "Không thể hiển thị danh sách khoản vay"
            });
        }
    }
};
module.exports = DGTDController;