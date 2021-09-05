import { Post } from '../profile-page-posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOfMaking: Date;

  @Column()
  appRole: string;

  @Column({ unique: true })
  email: string;

  @Column()
  administrationRole: string;

  @Column()
  documentLocation: string;

  @OneToMany((_type) => Post, (post) => post.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
