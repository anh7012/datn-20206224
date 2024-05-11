
const promisePool = require("../config/db/db");

module.exports = class HoSo{

    constructor(hoso) {
        this.id = hoso.idHoSo 
        this.idAccount = hoso.idAccount 
        this.typeVay = hoso.typeVay 
        this.typeTienTra = hoso.typeTienTra 
        this.LaiSuatVay = hoso.LaiSuatVay 
        this.TrinhDoHocVan = hoso.TrinhDoHocVan  
        this.TienAn = hoso.TienAn 
        this.ThongTinCuTru = hoso.ThongTinCuTru 
        this.SoNguoiAnTheo = hoso.SoNguoiAnTheo 
        this.CoCauGD = hoso.CoCauGD  
        this.BHNhanTho = hoso.BHNhanTho 
        this.CongViec = hoso.CongViec 
        this.ThoiGianLamViec = hoso.ThoiGianLamViec 
        this.RuiRoNN = hoso.RuiRoNN 
        this.ThuNhapRong = hoso.ThuNhapRong 
        this.effDate = hoso.effDate 
        this.endDate = hoso.endDate  
    }
        getAllHS = async () => {
    const [rows, fields] = await promisePool.query("SELECT * FROM hoso;");
    return rows;
  };

}