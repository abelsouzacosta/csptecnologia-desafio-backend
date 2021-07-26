import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ContactsRepository } from '../typeorm/repositories/ContactRespository';
import { Contact } from '../typeorm/entities/Contacts';
import { IDeleteContact } from '../interfaces/IDeleteContact';

type DetailContact = IDeleteContact;

export default class ContactDetailsService {
  public async execute({ id }: DetailContact): Promise<Contact> {
    const repository: ContactsRepository =
      getCustomRepository(ContactsRepository);

    const contact = await repository.findById(id);

    if (!contact) throw new ApplicationError('Contact not found');

    return contact;
  }
}
