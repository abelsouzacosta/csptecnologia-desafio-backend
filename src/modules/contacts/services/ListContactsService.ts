import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ContactsRepository } from '../typeorm/repositories/ContactRespository';
import { Contact } from '../typeorm/entities/Contacts';

export default class ListContactsService {
  public async execute(): Promise<Contact[] | undefined> {
    const repository: ContactsRepository =
      getCustomRepository(ContactsRepository);

    const contacts = await repository.find({
      relations: ['phones'],
    });

    if (!contacts) throw new ApplicationError('No contact were found');

    return contacts;
  }
}
