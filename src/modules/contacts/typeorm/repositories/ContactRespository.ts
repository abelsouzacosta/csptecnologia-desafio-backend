import { EntityRepository, Repository } from 'typeorm';
import { Contact } from '../entities/Contacts';

@EntityRepository(Contact)
export class ContactsRepository extends Repository<Contact> {
  // pode haver mais de um contato com o mesmo nome
  public async findByFirstName(
    firstName: string,
  ): Promise<Contact[] | undefined> {
    const contact = await this.find({
      where: {
        firstName,
      },
      relations: ['phones'],
    });

    return contact;
  }

  // pode haver mais de um contato com o mesmo sobrenome
  public async findByLastName(
    lastName: string,
  ): Promise<Contact[] | undefined> {
    const contact = await this.find({
      where: {
        lastName,
      },
      relations: ['phones'],
    });

    return contact;
  }

  // o email não pode ser repetido
  public async findByEmail(email: string): Promise<Contact | undefined> {
    const contact = await this.findOne({
      where: {
        email,
      },
      relations: ['phones'],
    });

    return contact;
  }

  // encontra um contato pelo id passado
  public async findById(id: string): Promise<Contact | undefined> {
    const contact = await this.findOne({
      where: {
        id,
      },
      relations: ['phones'],
    });

    return contact;
  }
}
