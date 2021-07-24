import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // estabelce o relacionamento entre
  // o contato e o telefone
  @ManyToOne(() => Contact, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column()
  contact_id: string;
}
