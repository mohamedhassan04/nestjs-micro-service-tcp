import { Node } from 'libs/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Node {
  @Column({ unique: true, nullable: true })
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  username: string;
}
