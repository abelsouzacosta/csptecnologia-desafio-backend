import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ContactsRepository } from '../typeorm/repositories/ContactRespository';
import { IDeleteContact } from '../interfaces/IDeleteContact';

export default class DeleteContactService {
  public async execute({ id }: IDeleteContact): Promise<boolean | undefined> {
    const repository: ContactsRepository =
      getCustomRepository(ContactsRepository);

    const contact = await repository.findById(id);

    if (!contact) throw new ApplicationError('Contact not found');

    if (!(await repository.remove(contact)))
      throw new ApplicationError('Was not possible to remove contact');

    return true;
  }
}
