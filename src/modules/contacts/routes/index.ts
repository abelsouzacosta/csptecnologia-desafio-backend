import { Router } from 'express';
import ContactController from '../controllers/ContactController';

const controller = new ContactController();
const contactRouter = Router();

contactRouter.get('/', (request, response) => {
  return response.status(200).json({
    message: 'Chegou aqui',
  });
});

contactRouter.post('/create', controller.create);

export { contactRouter };
