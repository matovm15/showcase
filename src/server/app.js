import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import xss from 'xss-clean';
import compression from 'compression';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import httpStatus from 'http-status';
import config from './config/config.js';
import morgan from './config/morgan.js';
import { jwtStrategy } from './config/passport.js';
import authLimiter from './middlewares/rateLimiter.js';
import routes from './routes/v1/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';

const app = express();
global.__dirname = path.resolve();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// template engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/server/views'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// pass cookie to the browser
app.use(cookieParser());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', (req, res) => {
  res.render('index');
});

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/v1/auth', authLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `Resource at ${req.originalUrl} not found`));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
