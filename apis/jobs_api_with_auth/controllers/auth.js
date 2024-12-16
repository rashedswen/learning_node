const { validationResult } = require('express-validator');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const i18n = require('../i18n/language')
const authService = require('../services/auth')

const register = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(StatusCodes.CREATED).json({
            err: result
        })
    }

    const registerResult = await authService.register(req.body)

    res.status(StatusCodes.CREATED).json(registerResult)
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const loginResult = await authService.login(email, password)

    res.status(StatusCodes.OK).json(loginResult)
}

module.exports = {
    register, login
}