import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
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
    // return await this.userRepository.save({
    //   // title: 'Hello TypeORM',
    //   email: 'user@email.com',
    // });
    let user: UserModel;
    for (let i = 0; i < 100; i++) {
      user = await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }

    return user;
  }

  @Post('sample')
  public async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@devmsj.ai',
    // });

    // 모델에 해당되는 객체 생성 - 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@devmsj.ai',
    // });

    // preload - 많이 사용되지는 않음.
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장은 하지 않음. find와 create를 합친 것과 비슷함.
    // const user3 = await this.userRepository.preload({
    //   id: 101, // id가 101인 유저를 불러옴
    //   email: 'devmsj@devmsj.ai',
    // });

    // await this.userRepository.delete(101); // id가 101인 유저를 삭제함

    // id가 2인 유저의 count 컬럼을 100 증가시킴
    // await this.userRepository.increment(
    //   {
    //     id: 2,
    //   },
    //   'count',
    //   100,
    // );

    // id가 2인 유저의 count 컬럼을 3 감소시킴
    // await this.userRepository.decrement(
    //   {
    //     id: 2,
    //   },
    //   'count',
    //   3,
    // );

    // email이 '0'을 포함하는 유저의 수를 세는 쿼리
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // email이 '0'을 포함하는 유저의 count 컬럼의 합계를 구하는 쿼리
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // id가 4보다 작은 유저의 count 컬럼의 평균값을 구하는 쿼리
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // id가 4보다 작은 유저의 count 컬럼의 최소값을 구하는 쿼리
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // id가 4보다 작은 유저의 count 컬럼의 최대값을 구하는 쿼리
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // 3개의 유저를 가져오고, 전체 유저의 수를 함께 반환하는 쿼리
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3, // 가져올 데이터의 개수
    });

    return usersAndCount;
  }

  @Get('users')
  public async getUsers(): Promise<UserModel[]> {
    return await this.userRepository.find({
      where: {
        // id: Not(2), // id가 2가 아닌 모든 유저를 가져옴
        // id: LessThan(30), // id가 30보다 작은 모든 유저를 가져옴
        // id: LessThanOrEqual(30), // id가 30보다 작거나 같은 모든 유저를 가져옴
        // id: MoreThan(30), // id가 30보다 작은 모든 유저를 가져옴
        // id: MoreThanOrEqual(30), // id가 30보다 작거나 같은 모든 유저를 가져옴
        // id: Equal(30), // id가 30인 유저를 가져옴
        // email: Like('%google%'), // 이메일이 'google'을 포함하는 모든 유저를 가져옴. 대소문자 구분함.
        // email: ILike('%GOOGLE%'), // 이메일이 'google'을 포함하는 모든 유저를 가져옴. 대소문자 구분하지 않음.
        // id: Between(1, 10), // id가 1과 10 사이인 모든 유저를 가져옴
        // id: In([1, 3, 5, 7, 99]), // id가 1, 3, 5, 7, 99인 유저를 가져옴
        // id: IsNull(), // id가 null인 유저를 가져옴
      },
      // select: {
      //   title: true, // select 옵션이 false로 설정된 컬럼의 값을 가져오려고 할 때
      // },
      // select: ['title', 'id'], // 그냥 컬럼명을 배열로 넣어도 됨
      // relations: {
      //   /**
      //    * relations 옵션을 사용하여 join할 테이블을 지정할 수 있음.
      //    * 여기서 지정된 테이블은 select나 where에서 사용 가능.
      //    * 만약 eager 옵션이 true로 설정된 경우, 여기서 join을 하지 않아도 되며, select나 where에서도 사용 가능.
      //    */
      //   profile: true,
      //   // posts: true,
      // },
      // select: {
      //   /**
      //    * select 옵션을 사용하여 가져올 컬럼을 지정할 수 있음.
      //    * 기본은 모든 컬럼을 가져오므로, select 옵션을 사용하지 않으면 모든 컬럼을 가져옴.
      //    */
      //   id: true,
      //   version: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   // relations 옵션이 true로 설정된 경우에만 사용 가능
      //   profile: {
      //     id: true,
      //   },
      // },
      // where: [
      //   /**
      //    * 필터링할 조건을 지정할 수 있음.
      //    * where에서  하나의 스코프({}) 안에 추가되는 조건은 AND 조건으로 연결됨.
      //    * 여러 개의 스코프를 list 형태로 사용하면 OR 조건으로 연결됨.
      //    */
      //   {
      //     version: 3,
      //     // relations 옵션이 true로 설정된 경우에만 사용 가능
      //     profile: {
      //       id: 1,
      //     },
      //   },
      //   {
      //     id: 3,
      //   },
      // ],
      order: {
        // 정렬할 컬럼을 지정할 수 있음.
        // 기본은 오름차순 정렬. 내림차순 정렬은 'DESC'를 사용하면 됨.
        id: 'ASC',
        createdAt: 'DESC',
      },
      // // 몇 개의 데이터를 건너뛸지 지정할 수 있음.
      // skip: 0,
      // // 몇 개의 데이터를 가져올지 지정할 수 있음.
      // // 옵션을 설정하지 않거나, 0으로 설정하면 모든 데이터를 가져옴.
      // take: 10,
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
      email: 'user@email.com',
    });
  }

  @Delete('users/profile/:id')
  public async deleteUser(@Param('id') id: string): Promise<void> {
    await this.profileRepository.delete(+id);
  }

  @Post('users/profile')
  public async createUserAndProfile() {
    return await this.userRepository.save({
      email: 'cascade@test.com',
      // cascade 옵션이 true로 설정되어 있을 때만 profile entity가 같이 생성됨
      profile: {
        profileImg: 'profile.png',
      },
    });

    // return await this.profileRepository.save({
    //   profileImg: 'profile.png',
    //   user,
    // });
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
