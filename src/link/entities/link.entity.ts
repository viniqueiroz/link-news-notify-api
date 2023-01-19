import { Expose, Transform } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'links' })
export class Link extends BaseEntity {
  @Transform(value => value.value.toString(), { toPlainOnly: true })
  @Expose({ name: 'id' })
  @ObjectIdColumn()
  _id: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  public last_verification: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @BeforeInsert()
  beforeInsertVerified() {
    this.last_verification = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updated_at = new Date();
  }
}
