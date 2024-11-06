require('dotenv').config();
require('express-async-errors');
const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')

const app = express();

// connectDB
const connectDB = require('./db/connect')
// routes
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');
// i don't think it's best practice to use middleware for language here but i did it
const language = require('./middleware/language')

app.set('trust proxy', 1)
app.use(language)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
)
app.use(express.json());
// extra packages
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
