import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ContactsRepository } from '../typeorm/repositories/ContactRespository';
import { PhonesRepository } from '../typeorm/repositories/PhonesRepository';
import { ICreateContact } from '../interfaces/ICreateContact';
import { IContactResponse } from '../interfaces/IContactResponse';

export default class CreateContactService {
  public async execute({
    firstName,
    lastName,
    email,
    phone_numbers,
  }: ICreateContact): Promise<IContactResponse | undefined> {
    // inicializando o repositorio de contatos
    const contactRepository: ContactsRepository =
      getCustomRepository(ContactsRepository);
    // inicializa o repositorio de telefones
    const phoneRepository: PhonesRepository =
      getCustomRepository(PhonesRepository);

    // verifica se já existe um contato com o email no banco de dados
    // email esta definido como unique
    const contactAlreadyExists = await contactRepository.findByEmail(email);

    // contato já existe -> lança erro
    if (contactAlreadyExists)
      throw new ApplicationError('This contact already exists');

    // cria a instância de contato
    const contact = contactRepository.create({
      firstName,
      lastName,
      email,
    });

    await contactRepository.save(contact);

    // isolando id do contato
    const { id: contact_id } = contact;

    // verifica se phone_numbers tem algum conteúdo
    if (!phone_numbers.length)
      throw new ApplicationError('At least one phone number must be provided');

    // mapeia o array recebido na requisição cadastrando
    // cada um dos números como um número do respectivo contato
    phone_numbers.map(async number => {
      // cria instância de telefone
      const phone = phoneRepository.create({
        number,
        contact_id,
      });

      await phoneRepository.save(phone);
    });

    return contact;
  }
}
