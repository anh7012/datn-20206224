Routes:http://localhost:7012/

**AuthRouter**
- Login: [post] http://localhost:7012/login
    - Req.body: username, password

- Logout: [post] http://localhost:7012/logout
  - Auth: accessToken

**Users Router**
- Create User: [post] http://localhost:7012/users/createUser
    - Auth: accessToken
    - Req.body: 
      + roleName: 1 trong 3 {"Quản trị viên", "Nhân viên", "Giám đốc"}
      + username
      + password
      + email
      + HoTen
      + NgaySinh
      + GioiTinh: Nam 1, Nữ 0
      + DiaChi

- changeUsername: [post] http://localhost:7012/users/:id/changeUsername
    - Auth: accessToken
    - Param: idUser đó
    - Body: username
- changePassword: [post] http://localhost:7012/users/:id/changePassword
    - Auth: accessToken
    - Param: idUser đó
    - Body: new_password
- updateUser: [put] http://localhost:7012/users/:id/updateUser
  - Auth: accessToken
  - Param: idUser 
  - Body:
    + email
    + HoTen
    + NgaySinh
    + GioiTinh
    + DiaChi
- deleteUser: [delete] http://localhost:7012/users/:id/deleteUser
  - Auth: accessToken
  - Param: idUser
- changeRole: [post] http://localhost:7012/users/:id/changeRole
  - Auth: accessToken
  - Param: idUser
  - Body: roleName: 1 trong 3 {"Quản trị viên", "Nhân viên", "Giám đốc"}
- listUser: [get] http://localhost:7012/users/listUser
  - Auth: accessToken
- getUser: [get] http://localhost:7012/users/:id/getUser
  - Auth: accessToken
- getUserAll: [get] http://localhost:7012/users/:id/getUserAll
  - Auth: accessToken
- changeStatus: [post] http://localhost:7012/users/:id/changeStatus
    - Auth: accessToken
    - Param: idUser
    - Body: status: 1 trong 2 {"active", "close"}
- listPermission: [get] http://localhost:7012/users/listPermission
  - Auth: accessToken
- permissionsUser: [get] http://localhost:7012/users/:id/permissionsUser
  - Auth: accessToken
  - Param: idUser

**Client Router**
- getLoaiKH: [get] http://localhost:7012/client/loaiKH
  - Auth: accessToken
  - Body: maKhachHang

**HoSo Router**
- listHoSo: [post] http://localhost:7012/hoso/listHoSo
  - Auth: accessToken
  - Trường trong danh sách: maHoSo, HoTen, TongTienVay, LaiSuatVay, KyHan, trangthaihoso
- createHoSo: [post] http://localhost:7012/hoso/createHoSo
  - Auth: accessToken
  - Body:
    + "MaKH": "KH810066950",
      
    + "TenLoaiVay": "vay mua o to",
      
    + "LoaiTraGoc": "tra goc deu",
      
    + "LoaiTraLai": "lai don",
      
    + "typeTienTra": "VNĐ",
      
    + "LaiSuatVay":"7.5",
      
    + "TongTienVay":"150000000",
      
    + "KyHan": 10,
      
    + "TrinhDoHocVan":{
      "trinhdohocvan": "Đại học",
      "diem": 75
      },
      
    + "TienAn": {
      "tienan": "0",
      "diem": 100
      },
      
    + "TinhTrangCuTru": {
      "tinhtrangcutru": "Nhà chung",
      "diem": 75
      },
      
    + "SoNguoiAnTheo": {
      "songuoiantheo": 2,
      "diem": 100
      },
      
    + "CoCauGD": {
      "cocaugd": "Sống với cha mẹ",
      "diem": 75
      },
      
    + "BHNhanTho": {
      "bhnhantho": "50000000",
      "diem": 75
      },
      
    + "CongViec": {
      "congviec": "Lao động được đào tạo nghề",
      "diem": 50
      },
      
    + "ThoiGianLamViec": {
      "thoigianlamviec": "5",
      "diem": 75
      },
      
    + "RuiRoNN": {
      "ruironn": "Thấp",
      "diem": 100
      },
      
    + "ThuNhapRong": {
      "thunhaprong": 10000000,
      "diem": 100
      }
      }
- createMHBIDVAndEY: [post] http://localhost:7012/hoso/createMHBIDVAndEY
  - Auth: accessToken
  - Body: 
    + "MaHoSo" : "HS67666833",
    
    + "TaiSanRong": 300000000,
    
    + "TinhHinhTraNoLai" : {
    
    + "tinhhinhtrano":"Đã bị gia hạn nợ, hiện trả nợ tốt" ,
    "diem": 75
    },
    
    + "TinhHinhTraNo": {
    "tinhhinhtrano": "Đã có gia hạn trả nợ",
    "diem": 75
    },
    
    + "TinhHinhTraLai": {
    "tinhhinhtralai": "Đã có nợ quá hạn, hiện trả nợ tốt/khách hàng mới",
    "diem": 50
    },
    
    + "danhgiakntra": {
    "DanhGiaKNTra": "Có khả năng trả nợ",
    "diem": 100
    },
    
    + "LoiNhuan": 13000000,
    
    + "DoanhThu": 20000000,
    
    + "NguonTraNo": 1000000000,
    
    + "LoaiTSDB": {
    "loaitsdb": "Giấy tờ có giá do tổ chức phát hành (trừ cổ phiếu)",
    "diem": 75
    },
    
    + "TenTSDB": "Trái phiếu BIDV",
    
    + "GiaTriTSDB": 100000000,
    
    + "RuiRoGiamGiaTSDB":{
    
    + "ruirogiamgiatsdb": "1",
    "diem": 75
    }
- getInforHoSo: [get] http://localhost:7012/hoso/:id/inforHoSo
  - Auth: accessToken
  - Params: idHoSo
- updateHoSo: [put] http://localhost:7012/hoso/:id/updateHoSo
  - Auth: accessToken
  - Params: idHoSo
  - Body: Tất cả key  chỗ form tạo mới
    