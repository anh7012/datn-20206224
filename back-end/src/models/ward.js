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
<<<<<<< HEAD

=======
    static getWardsById = async (wards_id) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM wards WHERE wards_id = ?;",
            [wards_id]
        );
        return rows.length > 0 ? rows[0].wards_id : null;
    }
    static getWardsByName = async (name) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM wards WHERE name = ?;",
            [name]
        );
        return rows.length > 0 ? rows[0].name : null;
    }
>>>>>>> origin/main
    static getWardsByDistrict = async (district_id) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM wards WHERE district_id = ?;",
            [district_id]
        );
        return rows;
    }
}