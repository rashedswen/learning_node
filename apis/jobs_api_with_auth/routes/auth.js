const express = require('express');
const { body, checkSchema, check } = require('express-validator');
const i18n = require('../i18n/language').default

const router = express.Router()

const { login, register } = require('../controllers/auth');
const checkValidation = require('../middleware/validation');

const bodyValidation = [
    check('email', 'FIELD_IS_NOT_VALID').isEmail().notEmpty(),
    check('password', 'FIELD_IS_NOT_VALID').notEmpty().isLength({ min: 6, max: 16 })
]
// const bodyPasswordValidation = () => body('passwprd').notEmpty().trim();

// const bodyCheckSchema = () => checkSchema(
//     {
//         email: { isEmail: true },
//         password: { notEmpty }
//     }
// )


router.post('/register', bodyValidation, checkValidation, register)
router.post('/login', bodyValidation, checkValidation, login)

module.exports = router