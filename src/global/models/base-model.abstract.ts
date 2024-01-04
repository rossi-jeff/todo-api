import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @CreateDateColumn()
  Created: string;

  @UpdateDateColumn()
  Updated: string;

  @VersionColumn({ type: 'int', default: 1 })
  Version: number;

  @Column({ default: false })
  IsDeleted: boolean;
}
