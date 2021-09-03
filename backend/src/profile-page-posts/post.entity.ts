import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  date_of_making: string;

  @Column()
  document_location: string;
}
