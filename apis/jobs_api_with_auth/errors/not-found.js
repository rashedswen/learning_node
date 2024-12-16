const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError {
  constructor(message, id) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.id = id;
  }
}

module.exports = NotFoundError;
