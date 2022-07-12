import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log({ id: this.id });
  }

  @AfterRemove()
  logRemove() {
    console.log({ id: this.id });
  }

  @AfterUpdate()
  logUpdate() {
    console.log({ id: this.id });
  }
}
