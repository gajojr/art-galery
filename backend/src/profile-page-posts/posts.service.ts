import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  getPosts(user: User): Promise<Post[]> {
    return this.postsRepository.getPosts(user);
  }

  async getPostById(id: string, user: User): Promise<Post> {
    const found = await this.postsRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return found;
  }

  createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postsRepository.createPost(createPostDto, user);
  }

  async deletePost(id: string, user: User): Promise<void> {
    const result = await this.postsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
}
