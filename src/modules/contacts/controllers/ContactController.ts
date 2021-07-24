import { Request, Response } from 'express';
import AddANewNumberToContactService from '../services/AddANewNumberToContactService';
import CreateContactService from '../services/CreateContactService';
import ListContactsService from '../services/ListContactsService';
import UpdateContactService from '../services/UpdateContactService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { firstName, lastName, email } = request.body;

    const update = new UpdateContactService();

    const contact = await update.execute({ id, firstName, lastName, email });

    return response.status(200).json(contact);
  }

  public async addNewNumber(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { contact_id } = request.params;
    const { number } = request.body;

    const add = new AddANewNumberToContactService();

    const contact = await add.execute({ contact_id, number });

    return response.status(200).json(contact);
  }
}
