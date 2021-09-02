import { Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { v4 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts(): Post[] {
    return this.posts;
  }

  createPost(createPostDto: CreatePostDto): Post {
    const {
      user_id,
      description,
      category,
      date_of_making,
      document_location,
    } = createPostDto;

    const post: Post = {
      id: uuid(),
      user_id,
      description,
      category,
      date_of_making,
      document_location,
    };

    this.posts.push(post);

    return post;
  }
}
