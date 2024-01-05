import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '../global/models/base-model.abstract';
import * as bcrypt from 'bcrypt';

const rounds = 10;

@Entity()
export class User extends BaseModel {
  @Index('IDX-UserName', { unique: true })
  @Column('varchar', { length: 25 })
  UserName: string;

  @Column('varchar', {
    nullable: true,
    default: '',
    length: 255,
    select: false,
  })
  PassWord: string;

  @Column('varchar', { nullable: true, default: '', length: 100 })
  Email: string;

  @Column({ type: 'boolean', default: false })
  Random: boolean;

  validatePassword(password: string) {
    if (!password || !this.PassWord) return false;
    return bcrypt.compareSync(password, this.PassWord);
  }

  setEncryptedPassword(password: string) {
    this.PassWord = bcrypt.hashSync(password, rounds);
  }
}
