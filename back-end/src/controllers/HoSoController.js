const HoSo = require("../models/hoso");
const hoSoController = {
    // [GET] /hoso/
    listHoSo: async (req, res, next) => {
        try {
            const listHoSo = await HoSo.getAllHoSo();
            res.json(listHoSo)
        } catch (error) {
            res.json({
                code: 9992,
                data: {message: "Không tìm thấy danh sách hồ sơ"},
            });
        }
    },
//     [Post] /hoso/themhoso
    createHoSo: async (req, res, next) => {
        try {
            const hoso ={
                idAccount : req.body.idAccount,
                typeVay : req.body.typeVay,
                typeTienTra : req.body.typeTienTra,
                TongTienVay : req.body.TongTienVay,
                LaiSuatVay : req.body.LaiSuatVay,
                TrinhDoHocVan : req.body.TrinhDoHocVan,
                TienAn : req.body.TienAn,
                ThongTinCuTru : req.body.ThongTinCuTru,
                SoNguoiAnTheo : req.body.SoNguoiAnTheo,
                CoCauGD : req.body.CoCauGD,
                BHNhanTho : req.body.BHNhanTho,
                CongViec : req.body.CongViec,
                ThoiGianLamViec : req.body.ThoiGianLamViec,
                RuiRoNN : req.body.RuiRoNN,
                ThuNhapRong : req.body.ThuNhapRong,

            }
            const existHoSo = await HoSo.getHoSoByIdAccount(hoso.idAccount)
        } catch (error) {
            res.status(500).json({
                message: "Không thể thêm hồ sơ mới",
            });
        }
    }
};
module.exports = hoSoController;
