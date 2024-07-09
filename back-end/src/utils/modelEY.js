const HoSo = require("../models/hoso");
const MoHinhEY = require("../models/mhey");

const modelEY = async function(maHoSo) {
    try {
        const hoso = await HoSo.getHoSoByMaHoSo(maHoSo)
        const ey = await MoHinhEY.getMHEY(maHoSo)
        const KhaNangTraNo = {
            DuNoTrenTSRong: {diem: ey.DiemDuNoTrenTSRong, heSo: 0.15},
            TinhHinhTraNo: {diem: ey.DiemTinhHinhTraNo, heSo: 0.15},
            TinhHinhTraLai: {diem: ey.DiemTinhHinhTraLai, heSo: 0.15},
            CacDVSD: {diem: hoso.DiemCacDVSD, heSo: 0.1},
            DanhGiaKNTra: {diem: ey.DiemDanhGiaKNTra, heSo: 0.15},
            LoiNhuanTrenDoanhThu: {diem: ey.DiemLoiNhuanTrenTN, heSo: 0.15},
            TienKeHoachTrenNguonTraNo: {diem: ey.DiemTienKeHoachTrenNguonTraNo, heSo: 0.15}
        };
        const ThongTinNhanThan = {
            TienAn: hoso.DiemTienAn,
            Tuoi: hoso.DiemTuoi,
            TrinhDoHocVan: hoso.DiemTrinhDoHocVan,
            CongViec: hoso.DiemCongViec,
            ThoiGianLamViec: hoso.DiemTGLamViec,
            TinhTrangCuTru: hoso.DiemTTCuTru,
            CoCauGD: hoso.DiemCoCauGD,
            SoNguoiAnTheo: hoso.DiemSoNguoiAnTheo,
            RuiRoNN: hoso.DiemRuiRoNN,
            BHNhanTho: hoso.DiemBHNhanTho
        }
        let diemThongTinNhanThan = 0;
        let diemKhaNangTraNo = 0;
        for (let key in ThongTinNhanThan) {
            if (ThongTinNhanThan.hasOwnProperty(key)) {
                let diem = ThongTinNhanThan[key] || 0;
                diemThongTinNhanThan += diem * 0.1;
            }
        }
        for (let key in KhaNangTraNo) {
            if (KhaNangTraNo.hasOwnProperty(key)) {
                let diem = KhaNangTraNo[key].diem || 0;
                let heSo = KhaNangTraNo[key].heSo;
                diemKhaNangTraNo += diem * heSo;
            }
        }
        const diemEY = diemThongTinNhanThan * 0.6 + diemKhaNangTraNo * 0.4
        let  xepHang, danhGia, mucDoRuiRo
        if (diemEY >= 95 && diemEY <= 100) {
            xepHang = 'A+';
            danhGia = 'Thượng hạng';
            mucDoRuiRo = 'Thấp. Nợ đủ tiêu chuẩn thuộc nhóm 1';
        } else if (diemEY >= 90 && diemEY <=94) {
            xepHang = 'A';
            danhGia = 'Xuất sắc';
            mucDoRuiRo = 'Thấp. Nợ đủ tiêu chuẩn thuộc nhóm 1';
        } else if (diemEY >= 85 && diemEY <= 89) {
            xepHang = 'A-';
            danhGia = 'Rất tốt';
            mucDoRuiRo = 'Thấp. Nợ đủ tiêu chuẩn thuộc nhóm 1';
        } else if (diemEY >= 80 && diemEY <= 84) {
            xepHang = 'B+';
            danhGia = 'Tốt';
            mucDoRuiRo = 'Thấp. Nợ cần chú ý thuộc nhóm 2';
        } else if (diemEY >= 70 && diemEY <= 79) {
            xepHang = 'B';
            danhGia = 'Trung bình';
            mucDoRuiRo = 'Trung bình. Nợ cần chú ý thuộc nhóm 2';
        } else if (diemEY >= 60 && diemEY <= 69) {
            xepHang = 'B-';
            danhGia = 'Thỏa đáng';
            mucDoRuiRo = 'Trung bình. Nợ cần chú ý thuộc nhóm 2';
        } else if (diemEY >= 50 && diemEY <= 59) {
            xepHang = 'C+';
            danhGia = 'Dưới trung bình';
            mucDoRuiRo = 'Trung bình. Nợ dưới tiêu chuẩn thuộc nhóm 3';
        } else if (diemEY >= 40 && diemEY <= 49) {
            xepHang = 'C';
            danhGia = 'Dưới chuẩn';
            mucDoRuiRo = 'Cao. Nợ dưới tiêu chuẩn thuộc nhóm 3';
        } else if (diemEY >= 36 && diemEY <= 39) {
            xepHang = 'C-';
            danhGia = 'Khả năng không thu hồi cao';
            mucDoRuiRo = 'Cao. Nợ nghi ngờ thuộc nhóm 4';
        } else {
            xepHang = 'D';
            danhGia = 'Khả năng không thu hồi rất cao';
            mucDoRuiRo = 'Cao. Nợ có khả năng mất vốn thuộc nhóm 5';
        }
        return {
            XHEY: xepHang,
            DanhGiaXH: danhGia,
            MucDoRuiRo: mucDoRuiRo
        }
    } catch (err) {
        console.log(err)
        return "Không đánh giá được theo mô hình EY"
    }
}

module.exports = {modelEY}