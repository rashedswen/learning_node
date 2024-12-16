const { StatusCodes } = require('http-status-codes')
const i18n = require('../i18n/language')


const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || i18n[req.lang].SOMETHING_WENT_WRONG
  }

  try {
    customError.msg = i18n[req.lang][err.message].replace('{id}', err.id)
  } catch (error) {
    console.log('error', error)
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code == 11000) {
    customError.msg = i18n[req.lang].DUPLICATED_FIELD.replace('{field}', Object.keys(err.keyValue))
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    const lang = req.lang;
    customError.msg = i18n[lang].NO_JOB_WITH_THIS_ID.replace('{id}', err.value);
    customError.statusCode = 404
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
