import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post } from './post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  getPosts(filterDto: GetPostsFilterDto): Promise<Post[]> {
    return this.postsRepository.getPosts(filterDto);
  }

  async getPostById(id: string): Promise<Post> {
    const found = await this.postsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return found;
  }

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.createPost(createPostDto);
  }

  async deletePost(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
}
