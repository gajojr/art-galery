import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

const mockPostsRepository = () => ({
  getPosts: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'gojko12',
  password: 'idegas12',
  name: 'Radojica',
  lastname: 'Petrovic',
  id: 'adsfsd-asgfsda-gsda',
  date_of_making: new Date(),
  app_role: 'viewer/critic',
  email: 'gojko@gmail.com',
  administration_role: 'user',
  document_location: 'sdagfasd/sfads/sdfa',
  posts: [],
};

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PostsRepository, useFactory: mockPostsRepository },
      ],
    }).compile();

    postsService = module.get(PostsService);
    postsRepository = module.get(PostsRepository);
  });

  describe('getPosts', () => {
    it('calls PostsRepository.getPosts and returns the result', async () => {
      postsRepository.getPosts.mockResolvedValue('someValue');
      const result = await postsService.getPosts(mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getPostById', () => {
    it('calls PostsRepository.findOne and returns the result', async () => {
      const mockPost = {
        user_id: 2,
        description: 'Ide gas',
        category: 'Pessimsm',
        date_of_making: new Date(),
        document_location: 'sdfasdf/sdasdaa/sd',
      };

      postsRepository.findOne.mockResolvedValue(mockPost);
      const result = await postsService.getPostById(
        'adsfsd-asgfsda-gsda',
        mockUser,
      );

      expect(result).toEqual(mockPost);
    });

    it('calls PostsRepository.findOne and handles an error', async () => {
      postsRepository.findOne.mockResolvedValue(null);
      expect(
        postsService.getPostById('adsfsd-asgfsda-gsda', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
