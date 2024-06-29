const mysql= require('mysql2');
require("dotenv").config();


const db_place = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
});


const DB_Place = db_place.promise();
module.exports = DB_Place;