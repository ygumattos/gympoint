import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// get
routes.get('/users', UserController.index);

// post
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware
routes.use(authMiddleware);

// update
routes.put('/users', UserController.update);
// delete


export default routes;
