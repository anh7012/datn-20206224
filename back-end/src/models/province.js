const DBPlace = require("../config/db/place");

module.exports = class Province {
    constructor(province) {
        this.province_id = province.province_id
        this.name = province.name
    }

    static getAllProvince = async () => {
        const [rows, fields] = await DBPlace.query("SELECT * FROM province;");
        return rows;
    }
}