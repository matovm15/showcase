import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import docsRoute from './docs.route.js';
import gigsRoute from './gig.route.js';
import profileRoute from './profile.route.js';
import serviceRoute from './service.route.js';
import config from '../../config/config.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const gigsRoutes = [
  {
    path: '/gigs',
    route: gigsRoute,
  },
];

const profileRoutes = [
  {
    path: '/profile',
    route: profileRoute,
  },
];

const serviceRoutes = [
  {
    path: '/services',
    route: serviceRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

gigsRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

profileRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

serviceRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
