const validator = require('validator');

const validate = {
    // Validate email
    validateEmail: async (req, res, next) => {
        try {
            if (!validator.isEmail(req.body.email)) {
                res.json({ code: 1006, error: "Invalid email address" });
            } else next();
        } catch (error) {
            res.status(500).json({ code: 9999, error });
        }
    },
//
};

module.exports = validate;
