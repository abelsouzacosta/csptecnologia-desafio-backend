import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ContactsRepository } from '../typeorm/repositories/ContactRespository';
import { PhonesRepository } from '../typeorm/repositories/PhonesRepository';
import { CheckIfItsANumber } from '../providers/CheckIfItsANumber';
import { IAddNewNumber } from '../interfaces/IAddNewNumber';
import { Contact } from '../typeorm/entities/Contacts';

export default class AddANewNumberToContactService {
  public async execute({
    contact_id,
    number,
  }: IAddNewNumber): Promise<Contact | undefined> {
    const contactRepository: ContactsRepository =
      getCustomRepository(ContactsRepository);

    const phonesRepository: PhonesRepository =
      getCustomRepository(PhonesRepository);

    // verifica se o id passado é de um contato existente
    const contact = await contactRepository.findById(contact_id);

    if (!contact) throw new ApplicationError('Contact not found');

    // verifica se é um número valido
    const isAValidNumber = CheckIfItsANumber(number);

    if (!isAValidNumber)
      throw new ApplicationError('Format error: Not a valid phone number');

    // verifica possível duplicação do número de telefone
    const phoneExists = await phonesRepository.findByNumber(number);

    if (phoneExists) {
      if (phoneExists.contact_id === contact_id)
        throw new ApplicationError(
          'This number are already owned by this contact: unnecessary duplication',
        );
    }

    const added = phonesRepository.create({
      number,
      contact_id,
    });

    if (!(await phonesRepository.save(added)))
      throw new ApplicationError(
        "There's an error on trying to adding a new phone to the contact",
      );

    return contact;
  }
}
