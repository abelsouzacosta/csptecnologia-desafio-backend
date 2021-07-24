import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ContactsRepository } from '../typeorm/repositories/ContactRespository';
import { IUpdateContact } from '../interfaces/IContactUpdate';
import { IContactResponse } from '../interfaces/IContactResponse';

export default class UpdateContactService {
  public async execute({
    id,
    firstName,
    lastName,
    email,
  }: IUpdateContact): Promise<IContactResponse | undefined> {
    const repository: ContactsRepository =
      getCustomRepository(ContactsRepository);

    // verifica se o contato realmente existe
    const getContactById = await repository.findOne({
      where: {
        id,
      },
    });

    if (!getContactById) throw new ApplicationError('Contact not found');

    // se o campo email for passado na requisição
    // é preciso verificar se o email passado já não pertence
    // a outra instância de contato
    if (email) {
      const getContactByEmail = await repository.findOne({
        where: {
          email,
        },
      });

      if (getContactByEmail && getContactByEmail.id !== getContactById.id)
        throw new ApplicationError('This email are already in use');

      getContactById.email = email;
    }

    getContactById.firstName = firstName;
    getContactById.lastName = lastName;

    await repository.save(getContactById);

    return getContactById;
  }
}
