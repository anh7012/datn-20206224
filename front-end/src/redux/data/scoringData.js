export const scoringData = {
    TrinhDoHocVan: {
        "Trên đại học": 100,
        "Đại học": 75,
        "Cao đẳng": 50,
        "Trung học": 25,
        "Dưới trung học": 0
    },
    TienAn: {
        "1": 0,
        "0": 100,

    },
    TinhTrangCuTru: {
        "Chủ sở hữu": 100,
        "Nhà chung": 75,
        "Với gia đình": 50,
        "Thuê": 25,
        "Khác": 0
    },
    SoNguoiAnTheo: [
        {max: 2, score: 100},
        {min: 3, max: 3, score: 75},
        {min: 4, max: 4, score: 50},
        {min: 5, max: 5, score: 25},
        {min: 6, score: 0}
    ],
    BHNhanTho: [
        {min: 100000000, score: 100},
        {min: 50000000, max: 100000000, score: 75},
        {min: 30000000, max: 50000000, score: 50},
        {max: 30000000, score: 25}
    ],
    CongViec: {
        "Quản lý, điều hành": 100,
        "Chuyên môn/Chủ cơ sở": 75,
        "Lao động được đào tạo nghề": 50,
        "Lao động dịch vụ": 25,
        "Thất nghiệp": 0
    },
    RuiRoNN: {
        "Thấp": 100,
        "Trung bình": 50,
        "Cao": 0
    },
    ThoiGianLamViec: [
        {min: 7, score: 100},
        {min: 5, max: 7, score: 75},
        {min: 3, max: 5, score: 50},
        {min: 1, max: 3, score: 25},
        {max: 1, score: 0}
    ],
    ThuNhapRong: [
        {min: 10000000, score: 100},
        {min: 5000000, max: 10000000, score: 75},
        {min: 3000000, max: 5000000, score: 50},
        {min: 1000000, max: 3000000, score: 25},
        {max: 1000000, score: 0}
    ],
    CoCauGD: {
        "Hạt nhân": 100,
        "Sống với cha mẹ": 75,
        "Sống cùng gia đình khác": 50,
        "Khác": 25
    },
    TinhHinhTraNoLai: {
        'Luôn trả nợ đúng hạn': 100,
        'Đã bị gia hạn nợ, hiện trả nợ tốt': 75,
        'Đã có nợ quá hạn/khách hàng mới': 50,
        'Đã có nợ quá hạn, khả năng trả nợ không ổn định': 25,
        'Hiện đang có nợ quá hạn': 0
    },
    TinhHinhTraNo: {
        'Luôn trả nợ đúng hạn': 100,
        'Đã có gia hạn trả nợ': 75,
        'Đã có nợ quá hạn, hiện trả nợ tốt/khách hàng mới': 50,
        'Đã có nợ quá hạn, khả năng trả nợ không ổn định': 25,
        'Hiện đang có nợ quá hạ': 0
    },
    TinhHinhTraLai: {
        'Luôn trả nợ đúng hạn': 100,
        'Đã có gia hạn trả nợ': 75,
        'Đã có nợ quá hạn, hiện trả nợ tốt/khách hàng mới': 50,
        'Đã có nợ quá hạn, khả năng trả nợ không ổn định': 25,
        'Hiện đang có nợ quá hạ': 0
    },
    DanhGiaKNTra: {
        'Có khả năng trả nợ': 100,
        'Có thể phải gia hạn nợ': 50,
        'Không có khả năng trả nợ': 0
    },
    LoaiTSDB: {
        'Tài khoản tiền gửi, giấy tờ có giá do Chính phủ hoặc BIDV phát hành': 100,
        'Giấy tờ có giá do tổ chức phát hành (trừ cổ phiếu)': 75,
        'Bất động sản (nhà ở)': 50,
        'Bất động sản (không phải nhà ở), động sản, cổ phiếu': 25,
        'Không có tài sản đảm bảo': 0
    },
    RuiRoGiamGiaTSDB: {
        '0% hoặc có xu hướng tăng':100,
        '1 – 10%':75,
        '10 – 30%':50,
        '30 – 50%':25,
        '> 50%':0,
    }

};
