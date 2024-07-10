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
<<<<<<< HEAD
=======
    static getProvinceById = async (province_id) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM province WHERE province_id = ?;",
            [province_id]
        );
        return rows.length > 0 ? rows[0].province_id : null;
    }
    static getProvinceByName = async (name) => {
        const [rows, fields] = await DBPlace.query(
            "SELECT * FROM province WHERE name = ?;",
            [name]
        );
        return rows.length > 0 ? rows[0].name : null;
    }
>>>>>>> origin/main
}