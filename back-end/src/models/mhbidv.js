const promisePool = require("../config/db/db");

module.exports = class ModelBIDV {
  constructor(mhbidv) {
    this.id = mhbidv.idMHBIDV;
    this.idHoSo = mhbidv.idHoSo;
    this.idDGTD = mhbidv.idDGTD;
    this.TyleTienTraTrenTN = mhbidv.TyleTienTraTrenTN;
    this.TinhHinhTraNo = mhbidv.TinhHinhTraNo;
    this.CacDVSD = mhbidv.CacDVSD;
    this.LoaiTSDB = mhbidv.LoaiTSDB;
    this.TenTSDB = mhbidv.TenTSDB;
    this.GiaTriTSDB = mhbidv.GiaTriTSDB;
    this.RuiRoGiamGiaTSDB = mhbidv.RuiRoGiamGiaTSDB;
    this.populationDate = mhbidv.populationDate;
  }
  static getAll = async () => {
    const [rows, fields] = await promisePool.query("SELECT * FROM mhbidv;");
    return rows;
  };
};
