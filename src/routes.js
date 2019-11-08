import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlansController from './app/controllers/PlansController';
import RegistrationsController from './app/controllers/RegistrationsController';
import CheckinsController from './app/controllers/CheckinsController';
import HelpStudentsController from './app/controllers/HelpStudentsController';
import AcademyOrdersController from './app/controllers/AcademyOrdersController';


import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/students', StudentsController.index);
routes.get('/students/:id/checkins', CheckinsController.index);
routes.get('/students/:id/help-orders', HelpStudentsController.index);
routes.post('/students/:id/checkins', CheckinsController.store);
routes.post('/students/:id/help-orders', HelpStudentsController.store);

routes.post('/sessions', SessionController.store);


// Middleware
routes.use(authMiddleware);

// Routes with Middleware
routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

routes.post('/students', StudentsController.store);

routes.put('/users', UserController.update);

routes.post('/registrations', RegistrationsController.store);
routes.get('/registrations', RegistrationsController.index);
routes.put('/registrations/:id', RegistrationsController.update);

routes.get('/help-orders', AcademyOrdersController.index);
routes.put('/help-orders/:id/answer', AcademyOrdersController.update);


export default routes;
