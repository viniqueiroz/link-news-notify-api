import {
  Entity,
  Column,
  ObjectIdColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  verified = false;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
