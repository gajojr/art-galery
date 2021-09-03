import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_of_making: Date;

  @Column()
  app_role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  administration_role: string;

  @Column()
  document_location: string;
}
