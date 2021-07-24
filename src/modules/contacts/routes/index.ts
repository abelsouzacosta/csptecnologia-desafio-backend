import { Router } from 'express';
import ContactController from '../controllers/ContactController';

const controller = new ContactController();
const contactRouter = Router();

contactRouter.get('/', controller.index);

contactRouter.post('/create', controller.create);

export { contactRouter };
