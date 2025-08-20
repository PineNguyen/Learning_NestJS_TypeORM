import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//Declare entity User table corresponding a table in database
//Include id, name and email column
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
