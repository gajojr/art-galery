import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getPosts(filterDto: GetPostsFilterDto): Promise<Post[]> {
    const { category, order_by } = filterDto;
    const query = this.createQueryBuilder('post');

    if (category) {
      query.andWhere('post.category = :category', { category });
    }

    // if (order_by) {
    //   query.andWhere();
    // }

    const posts = await query.getMany();
    return posts;
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const {
      user_id,
      description,
      category,
      date_of_making,
      document_location,
    } = createPostDto;

    const post = this.create({
      user_id,
      description,
      category,
      date_of_making,
      document_location,
    });

    await this.save(post);

    return post;
  }
}
