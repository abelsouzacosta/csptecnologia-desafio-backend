import { Router } from 'express';
import { contactRouter } from 'src/modules/contacts/routes';

const router = Router();

router.use('/contacts', contactRouter);

export { router };
