const DBPlace = require("../config/db/place");

module.exports = class District {
    constructor(district) {
        this.district_id = district.district_id
        this.province_id = district.province_id
        this.name = district.name
    }

    static getAllDistrict = async () => {
        const [rows, fields] = await DBPlace.query("SELECT * FROM district;");
        return rows;
    }

    static getDistrictByProvince = async (province_id) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM db_place.district WHERE province_id = ?;",
            [province_id]
        );
        return rows;
    }
}