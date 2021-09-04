import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getPosts(user: User): Promise<Post[]> {
    const query = this.createQueryBuilder('post');

    query.where({ user });

    const posts = await query.getMany();
    return posts;
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.create({ ...createPostDto, user });

    await this.save(post);

    return post;
  }
}
