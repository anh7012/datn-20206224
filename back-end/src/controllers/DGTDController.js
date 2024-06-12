const HoSo = require('../models/hoso')
const ModelBIDV = require('../models/mhbidv')
const ModelEY = require('../models/mhey')
const DanhGiaTinDung = require("../models/danhgiatindung");
const modelBIDV = require("../utils/modelBIDV");
const {modelEY} = require("../utils/modelEY");

const DGTDController = {
    // [GET] danhgiatindung/ -- list hop dong
    listDanhGia: async (req, res, next) => {
        try {
            const listDanhGia = await DanhGiaTinDung.getAllDanhGia()
            if (listDanhGia) {
                return res.json({
                    code: 1000,
                    data: listHoSo,
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
                data: {message: "Không tìm thấy danh sách đánh giá"},
            });
        }
    },
    findDanhGia: async (req, res, next) => {
        try {
            const hoso = await HoSo.getHoSoByMaHoSo(req.body.maHoSo)
            if (!hoso) {
                return res.json({
                    code: 9993,
                    message: "Chưa có hồ sơ này",
                });
            }
            const danhgia = await DanhGiaTinDung.getDanhGiaByMaHoSo(req.body.maHoSo)
            if (!danhgia) {
                return res.json({
                    code: 9993,
                    message: "Chưa có đánh giá của hồ sơ này",
                });
            }
            return res.json({
                code: 1000,
                message: "hồ sơ đã được đánh giá",
                data: danhgia
            });

        } catch (error) {
            return res.json({
                code: 9992,
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
                code: 9992,
                data: {message: "Không thể tạo đánh giá cho hồ sơ này"},
            });
        }
    }
    ,
    test: async (req, res, next) => {
        try {
            const danhgia = await modelEY(req.body.maHoSo)
            console.log(danhgia)
            return res.json({
                code: 1000,
                message: "hồ sơ đã được đánh giá",
                data: danhgia
            });
        } catch (err) {
            console.log(err)
            return res.json({
                code: 9992,
                data: {message: "Không thể thêm đánh giá cho hồ sơ này"},
            });
        }
    }
};
module.exports = DGTDController;