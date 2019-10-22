import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// get
routes.get('/users', UserController.index);

// post
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// update

// delete


export default routes;
