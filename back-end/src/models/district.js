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
<<<<<<< HEAD

=======
    static getDistrictById = async (district_id ) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM db_place.district WHERE district_id  = ?;",
            [district_id ]
        );
        return rows.length > 0 ? rows[0].district_id : null;
    }
    static getDistrictByName= async (name ) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM db_place.district WHERE name  = ?;",
            [name]
        );
        return rows.length > 0 ? rows[0].name : null;
    }
>>>>>>> origin/main
    static getDistrictByProvince = async (province_id) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM db_place.district WHERE province_id = ?;",
            [province_id]
        );
        return rows;
    }
}