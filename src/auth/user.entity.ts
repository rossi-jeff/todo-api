import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '../global/models/base-model.abstract';

@Entity()
export class User extends BaseModel {
  @Index('IDX-UserName', { unique: true })
  @Column('varchar', { length: 25 })
  UserName: string;

  @Column('varchar', { nullable: true, default: '', length: 255 })
  PassWord: string;

  @Column('varchar', { nullable: true, default: '', length: 100 })
  Email: string;
}
