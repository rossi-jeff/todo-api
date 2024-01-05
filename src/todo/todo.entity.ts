import { User } from '../auth/user.entity';
import { BaseModel } from '../global/models/base-model.abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todo extends BaseModel {
  @Column('varchar', { nullable: true, default: '', length: 255 })
  Task: string;

  @Column({ default: false })
  Completed: boolean;

  @Column({ type: 'bigint' })
  UserId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserId' })
  user: User;
}
