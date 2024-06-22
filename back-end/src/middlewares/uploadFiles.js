const formidable = require('formidable');

const fileParse = async (req, res, next) => {
    const form = new formidable.IncomingForm();

   await form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing the files', err);
            return res.status(400).json({
                code: 9999,
                message: "Error parsing the files",
            });
        }

        req.body = fields;
        req.files = files;
        next();
    })
};

module.exports = fileParse;
