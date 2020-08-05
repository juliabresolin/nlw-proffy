import express from 'express';
import ClassesController from './controllers/ClassesController';


const routes = express.Router();

const classesController = new ClassesController();


routes.get('/', (request, response) => {
  return response.json({ message: 'Welcome to the Proffy API!' });
});

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);



export default routes;
