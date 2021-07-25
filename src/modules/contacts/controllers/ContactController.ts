import { Request, Response } from 'express';
import { ISearchContact } from '../interfaces/ISearchContact';
import AddANewNumberToContactService from '../services/AddANewNumberToContactService';
import CreateContactService from '../services/CreateContactService';
import DeleteContactService from '../services/DeleteContactService';
import ListContactsService from '../services/ListContactsService';
import UpdateContactService from '../services/UpdateContactService';

export default class ContactController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email }: ISearchContact = request.query;

    const list = new ListContactsService();

    const result = await list.execute();

    const contacts = firstName
      ? result.filter(contact => contact.firstName === firstName)
      : lastName
      ? result.filter(contact => contact.lastName === lastName)
      : email
      ? result.filter(contact => contact.email === email)
      : result;

    return response.status(200).json(contacts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, phone_numbers } = request.body;

    const create = new CreateContactService();

    const contact = await create.execute({
      firstName,
      lastName,
      email,
      phone_numbers,
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const remove = new DeleteContactService();

    const removed = await remove.execute({ id });

    return response.status(200).json(removed);
  }
}
