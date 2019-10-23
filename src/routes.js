import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/students', StudentsController.index);


routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware
routes.use(authMiddleware);

// Routes with Middleware
routes.put('/users', UserController.update);
routes.post('/students', StudentsController.store);


export default routes;
