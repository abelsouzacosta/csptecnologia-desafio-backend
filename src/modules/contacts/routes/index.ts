import { Router } from 'express';
import ContactController from '../controllers/ContactController';

const controller = new ContactController();
const contactRouter = Router();

contactRouter.get('/', controller.index);

contactRouter.post('/create', controller.create);

contactRouter.put('/:id', controller.update);

contactRouter.delete('/:id', controller.delete);

contactRouter.post(
  '/add_new_number_to_contact/:contact_id',
  controller.addNewNumber,
);

export { contactRouter };
