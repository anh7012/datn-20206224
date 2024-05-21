const HoSo = require('../models/hoso')
const MoHinhBIDV = require('../models/mhbidv')

const modelBIDV = {
    // Mo Hinh BIDV
    diemCaNhanBIDV: async function (maHoSo) {
        try {
            const hoso = await HoSo.getHoSoByMaHoSo(maHoSo)
            const bidv = await MoHinhBIDV.getMHBIDV(maHoSo)
            const ThongTinNhanThan = {
                Tuoi: hoso.DiemTuoi,
                TrinhDoHocVan: hoso.DiemTrinhDoHocVan,
                TienAn: hoso.DiemTienAn,
                TinhTrangCuTru: hoso.DiemTTCuTru,
                SoNguoiAnTheo: hoso.DiemSoNguoiAnTheo,
                CoCauGD: hoso.DiemCoCauGD,
                BHNhanTho: hoso.DiemBHNhanTho,
                CongViec: hoso.DiemCongViec,
                ThoiGianLamViec: hoso.DiemTGLamViec,
                RuiRoNN: hoso.DiemRuiRoNN
            }
            const QuanHeKhachHang = {
                ThuNhapRong: {diem: hoso.DiemThuNhapRong, heSo: 0.3},
                TyLeTienTraTrenThuNhap: {diem: bidv.DiemTyleTienTraTrenTN, heSo: 0.3},
                TinhHinhTraNo: {diem: bidv.DiemTinhHinhTraNo, heSo: 0.25},
                CacDVSD: {diem: hoso.DiemCacDVSD, heSo: 0.15}
            };
            let diemThongTinNhanThan = 0;
            let diemQuanHeKhachHang = 0;
            for (let key in ThongTinNhanThan) {
                if (ThongTinNhanThan.hasOwnProperty(key)) {
                    let diem = ThongTinNhanThan[key] || 0;
                    diemThongTinNhanThan += diem * 0.1;
                }
            }
            for (let key in QuanHeKhachHang) {
                if (QuanHeKhachHang.hasOwnProperty(key)) {
                    let diem = QuanHeKhachHang[key].diem || 0;
                    let heSo = QuanHeKhachHang[key].heSo;
                    diemQuanHeKhachHang += diem * heSo;
                }
            }
            const diemCaNhanBIDV = diemThongTinNhanThan * 0.4 + diemQuanHeKhachHang * 0.6
            return diemCaNhanBIDV
        } catch (error) {
            return "Không đánh giá được điểm cá nhân"
        }

    }
    ,
    xepHangCaNhanBIDV: async function (maHoSo) {
        const diem = await this.diemCaNhanBIDV(maHoSo)
        let xepHang = ''
        let danhGia = ''
        if (diem >= 95 && diem <= 100) {
            xepHang = 'AAA';
            danhGia = 'Rủi ro thấp';
        } else if (diem >= 90 && diem <= 94) {
            xepHang = 'AA';
            danhGia = 'Rủi ro thấp'
        } else if (diem >= 85 && diem <= 89) {
            xepHang = 'A';
            danhGia = 'Rủi ro thấp'
        } else if (diem >= 80 && diem <= 84) {
            xepHang = 'BBB';
            danhGia = 'Rủi ro trung bình';
        } else if (diem >= 70 && diem <= 79) {
            xepHang = 'BB';
            danhGia = 'Rủi ro trung bình';
        } else if (diem >= 60 && diem <= 69) {
            xepHang = 'B';
            danhGia = 'Rủi ro trung bình';
        } else if (diem >= 50 && diem <= 59) {
            xepHang = 'CCC';
            danhGia = 'Rủi ro cao';
        } else if (diem >= 40 && diem <= 49) {
            xepHang = 'CC';
            danhGia = 'Rủi ro cao';
        } else if (diem >= 35 && diem <= 39) {
            xepHang = 'C';
            danhGia = 'Rủi ro cao';
        } else {
            xepHang = 'D';
            danhGia = 'Rủi ro cao';
        }

        return {diem: diem, xepHang: xepHang, danhGia: danhGia};
    },
    xepHangTSDB: async function (maHoSo) {
        try {
            const bidv = await MoHinhBIDV.getMHBIDV(maHoSo)
            const tsdb = {
                LoaiTSDB: bidv.DiemLoaiTSDB,
                GiaTriTSDBTrenTongNo: bidv.DiemTSDBTrenTongNo,
                RuiRoGiamGiaTSDB: bidv.DiemRuiRoGiamGiaTSDB
            }
            let diemTSDB = 0;
            for (let key in tsdb) {
                if (tsdb.hasOwnProperty(key)) {
                    let diem = tsdb[key] || 0;
                    diemTSDB += diem;
                }
            }
            let xepHang, danhGia
            if (diemTSDB >= 225 && diemTSDB <= 300) {
                xepHang = 'A';
                danhGia = 'Mạnh';
            } else if (diemTSDB >= 75 && diemTSDB <= 224) {
                xepHang = 'B';
                danhGia = 'Trung bình'
            } else {
                xepHang = 'C';
                danhGia = 'Thấp'
            }
            return {xepHang: xepHang, danhGia: danhGia};

        } catch (err) {
            console.log(err)
            return "Không thể đánh giá cho hồ sơ này"
        }
    },
    xepHangBIDV: async function (maHoSo) {
        const xepHangCaNhan = await this.xepHangCaNhanBIDV(maHoSo)
        const xepHangTSDB = await this.xepHangTSDB(maHoSo)
        let KetQuaDanhGia = ''
        if (xepHangTSDB.xepHang === 'A') {
            if (xepHangCaNhan.xepHang === 'AAA' || xepHangCaNhan.xepHang === 'AA' || xepHangCaNhan.xepHang === 'A') {
                KetQuaDanhGia = 'Xuất sắc'
            } else if (xepHangCaNhan.xepHang === 'BBB' || xepHangCaNhan.xepHang === 'BB' || xepHangCaNhan.xepHang === 'B') {
                KetQuaDanhGia = 'Tốt'
            } else {
                KetQuaDanhGia = 'Trung bình hoặc Từ chối'
            }
        } else if (xepHangTSDB.xepHang === 'B') {
            if (xepHangCaNhan.xepHang === 'AAA' || xepHangCaNhan.xepHang === 'AA' || xepHangCaNhan.xepHang === 'A') {
                KetQuaDanhGia = 'Tốt'
            } else if (xepHangCaNhan.xepHang === 'BBB' || xepHangCaNhan.xepHang === 'BB' || xepHangCaNhan.xepHang === 'B') {
                KetQuaDanhGia = 'Trung bình'
            } else {
                KetQuaDanhGia = 'Từ chối'
            }
        } else if (xepHangTSDB.xepHang === 'C') {
            if (xepHangCaNhan.xepHang === 'AAA' || xepHangCaNhan.xepHang === 'AA' || xepHangCaNhan.xepHang === 'A') {
                KetQuaDanhGia = 'Trung bình'
            } else if (xepHangCaNhan.xepHang === 'BBB' || xepHangCaNhan.xepHang === 'BB' || xepHangCaNhan.xepHang === 'B') {
                KetQuaDanhGia = 'Trung bình hoặc Từ chối'
            } else {
                KetQuaDanhGia = 'Từ chối'
            }
        }
        return {
            XHCaNhanBIDV: xepHangCaNhan.xepHang,
            DanhGiaCaNhanBIDV: xepHangCaNhan.danhGia,
            XHTSDBBIDV: xepHangTSDB.xepHang,
            DanhGiaTSDBBIDV: xepHangTSDB.danhGia,
            KetQuaDanhGiaBIDV: KetQuaDanhGia
        }
    }
}

module.exports = modelBIDV
