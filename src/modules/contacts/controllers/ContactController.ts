import { Request, Response } from 'express';
import CreateContactService from '../services/CreateContactService';
import ListContactsService from '../services/ListContactsService';

export default class ContactController {
  public async index(request: Request, response: Response): Promise<Response> {
    const list = new ListContactsService();

    const contacts = await list.execute();

    return response.status(200).json(contacts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, phone_number } = request.body;

    const create = new CreateContactService();

    const contact = await create.execute({
      firstName,
      lastName,
      email,
      phone_number,
    });

    return response.status(200).json(contact);
  }
}
