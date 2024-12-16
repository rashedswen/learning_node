const { validationResult } = require('express-validator');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const i18n = require('../i18n/language');
const e = require('express');

exports.register = async (body) => {

    const user = await User.create({ ...body })

    const token = user.createJWT();

    return {
        user: { name: user.name }, token
    }
}

exports.login = async (email, password) => {
    if (!email || !password) {
        throw new BadRequestError('PLEASE_PROVIDE_EMAIL_AND_PASSWORD')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('INVALID_CREDS')
    }
    // compare passwords
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('INVALID_CREDS')
    }
    const token = user.createJWT();

    return {
        user: { name: user.name }, token
    }
}