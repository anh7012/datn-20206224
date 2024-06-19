const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    api_secret: process.env.CLOUD_SECRET,
    api_key:  process.env.CLOUD_KEY,
    cloud_name:  process.env.CLOUD_NAME,
});
 module.exports = cloudinary;