const { validationResult } = require("express-validator");
const i18n = require('../i18n/language')

const checkValidation = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        let errors = result.array().map(err => {
            console.log(err)
            let message = err.msg
            if (err.msg === 'FIELD_IS_NOT_VALID') {
                message = i18n[req.lang].FIELD_IS_NOT_VALID.replace('{field}', err.path)
            }
            else {
                message = i18n[req.lang][err.msg]
            }
            return { [err.path]: message }
        })
        return res.status(422).json(errors)
    }
    next()
}

module.exports = checkValidation;