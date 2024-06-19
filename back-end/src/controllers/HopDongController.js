const HopDong = require('../models/hopdong')
const Client = require('../models/client')

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
        message: "Không tìm thấy danh sách hợp đồng" ,
      });
    }
  },
  // createHopDong: async (req, res, next) => {
  //   try {
  //     const hoso = await HoSo.getHoSoByMaHoSo(req.body.maHoSo)
  //     const client = await Client.getClientByIdHS(hoso.idHoSo)
  //     const hopdong = {
  //       idHoSo: hoso.idHoSo,
  //       idClient: client.idClient,
  //       ngay_ky: req.body.ngay_ky,
  //       dia_diem_ky: req.body.dia_diem_ky,
  //       ten_nganhang: req.body.ten_nganhang,
  //       chinhanh_phonggiaodich: req.body.chinhanh_phonggiaodich,
  //       ma_so_doanhnghiep: req.body.ma_so_doanhnghiep,
  //       ngay_cap_ma_so: req.body.ngay_cap_ma_so,
  //       dia_chi_tru_so: req.body.dia_chi_tru_so,
  //       dien_thoai: req.body.dien_thoai,
  //       nguoi_dai_dien: req.body.nguoi_dai_dien,
  //       chuc_vu: req.body.chuc_vu,
  //       SoTienVay: req.body.SoTienVay,
  //       ThoiHan: req.body.ThoiHan,
  //       TanSuatThanhToan: req.body.TanSuatThanhToan,
  //       MucDich: req.body.MucDich,
  //       PhuongThucGiaiNgan: req.body.PhuongThucGiaiNgan,
  //       PhuongThucChoVay: req.body.PhuongThucChoVay,
  //       status: req.body.status,
  //       DieuKhoanDacBiet: req.body.DieuKhoanDacBiet,
  //     }
  //     if (listHD) {
  //       res.json({
  //         code: 1000,
  //         data: listHD,
  //         message: "Danh sách hợp đồng tìm thấy thành công"
  //       })
  //     } else {
  //       res.json({
  //         code: 9992,
  //         message: "Không tìm thấy danh sách hợp đồng",
  //       });
  //     }
  //   } catch (error) {
  //     res.json({
  //       code: 9999,
  //       message: "Không thể tạo hợp đồng" ,
  //     });
  //   }
  // },
};
module.exports = HopDongController;