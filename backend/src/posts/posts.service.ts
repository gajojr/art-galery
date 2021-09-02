import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.model';
import { v4 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostsWithFilters(filterDto: GetPostsFilterDto): Post[] {
    const { category, order_by } = filterDto;

    let posts = this.getAllPosts();

    if (category) {
      posts = posts.filter((post) => post.category === category);
    }

    // if(order_by) {
    //   posts = posts.filter((post) => post.category === category);
    // }

    return posts;
  }

  getPostById(id: string): Post {
    const found = this.posts.find((post) => post.id === id);

    if (!found) {
      throw new NotFoundException(`Post with id: ${id} not found`);
    }

    return found;
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

  deletePost(id: string): void {
    const found = this.getPostById(id);
    this.posts = this.posts.filter((post) => post.id !== found.id);
  }
}
