const express = require('express');
const { body, checkSchema, check } = require('express-validator');

const router = express.Router()

const { login, register } = require('../controllers/auth');
const checkValidation = require('../middleware/validation');

const bodyValidation = [
    check('email', 'Email Is Not Valllllid').isEmail().notEmpty(),
    check('password', 'Password Is Not Valllllid').isLength({ min: 6, max: 16 }),
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