import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_of_making: Date;

  @Column()
  document_location: string;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
