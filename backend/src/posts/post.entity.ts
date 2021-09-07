import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOfMaking: Date;

  @Column()
  documentLocation: string;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
