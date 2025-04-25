import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entities/profile.entity';
import { PostModel } from './entities/post.entity';
import { TagModel } from './entities/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  public async createUser(): Promise<UserModel> {
    return await this.userRepository.save({
      // title: 'Hello TypeORM',
      email: 'user@email.com',
    });
  }

  @Get('users')
  public async getUsers(): Promise<UserModel[]> {
    return await this.userRepository.find({
      // select: {
      //   title: true, // select 옵션이 false로 설정된 컬럼의 값을 가져오려고 할 때
      // },
      // select: ['title', 'id'], // 그냥 컬럼명을 배열로 넣어도 됨
      relations: {
        profile: true, // 관계를 통해서 가져올 수 있는 데이터
        posts: true,
      },
    });
  }

  @Patch('users/:id')
  public async updateUser(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    console.log(user);

    return await this.userRepository.save({
      ...user,
      // title: user.title + '!',
    });
  }

  @Post('users/profile')
  public async createUserAndProfile() {
    const user = await this.createUser();

    return await this.profileRepository.save({
      profileImg: 'profile.png',
      user,
    });
  }

  @Post('users/post')
  public async createUserAndPost() {
    const user = await this.createUser();

    await this.postRepository.save({
      title: 'post 1',
      author: user,
    });
    await this.postRepository.save({
      title: 'post 2',
      author: user,
    });

    return user;
  }

  @Post('posts/tags')
  public async createPostAndTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });
    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  public async getPosts() {
    return await this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  public async getTags() {
    return await this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
