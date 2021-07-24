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
    });

    return contact;
  }

  // o email não pode ser repetido
  public async findByEmail(email: string): Promise<Contact | undefined> {
    const contact = await this.findOne({
      where: {
        email,
      },
    });

    return contact;
  }
}
