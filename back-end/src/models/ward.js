const DBPlace = require("../config/db/place");

module.exports = class Wards {
    constructor(wards) {
        this.wards_id = wards.wards_id
        this.district_id = wards.district_id
        this.name = wards.name
    }

    static getAllWards = async () => {
        const [rows, fields] = await DBPlace.query("SELECT * FROM wards;");
        return rows;
    }

    static getWardsByDistrict = async (district_id) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM wards WHERE district_id = ?;",
            [district_id]
        );
        return rows;
    }
}