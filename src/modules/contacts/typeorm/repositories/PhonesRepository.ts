import { EntityRepository, Repository } from 'typeorm';
import { Phone } from '../entities/Phones';

@EntityRepository(Phone)
export class PhonesRepository extends Repository<Phone> {}
