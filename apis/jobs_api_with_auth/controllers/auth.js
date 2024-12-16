const { validationResult } = require('express-validator');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const i18n = require('../i18n/language').default

const register = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(StatusCodes.CREATED).json({
            err: result
        })
    }
    const { name, password, email } = req.body;

    const user = await User.create({ ...req.body })

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        user: { name: user.name }, token
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError(i18n[req.lang].PLEASE_PROVIDE_EMAIL_AND_PASSWORD)
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError(i18n[req.lang].INVALID_CREDS)
    }
    // compare passwords
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError(i18n[req.lang].INVALID_CREDS)
    }
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: { name: user.name }, token
    })
}

module.exports = {
    register, login
}