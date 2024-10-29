const mongoose = require('mongoose')

const connectDB = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  // mongoose connection
  mongoose.connection.on('connected', () => {
    console.log('connected to mongoose')
  })

  
}

module.exports = connectDB
