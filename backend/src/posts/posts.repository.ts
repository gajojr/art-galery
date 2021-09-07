import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDataDto } from './dto/post-data.dto';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getPosts(): Promise<PostDataDto[]> {
    const query = this.createQueryBuilder('post');

    const posts = await query.getMany();
    return posts;
  }
}
