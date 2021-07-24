import { EntityRepository, Repository } from 'typeorm';
import { Phone } from '../entities/Phones';

@EntityRepository(Phone)
export class PhonesRepository extends Repository<Phone> {
  public async findByNumber(number: string): Promise<Phone | undefined> {
    const phone = await this.findOne({
      where: {
        number,
      },
    });

    return phone;
  }

  public async findByContactId(contact_id: string): Promise<Phone | undefined> {
    const phone = await this.findOne({
      where: {
        contact_id,
      },
    });

    return phone;
  }
}
