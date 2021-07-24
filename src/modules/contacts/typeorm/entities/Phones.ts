import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './Contacts';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @CreateDateColumn()
  creted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Contact, contact => contact.phones)
  contact: Contact;
}
