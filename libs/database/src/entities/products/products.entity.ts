import { Node } from 'libs/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends Node {
  @Column({ unique: true, nullable: true })
  name: string;
  @Column({ nullable: true })
  stock: number;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  userId: string;
}
