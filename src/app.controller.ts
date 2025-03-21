import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Post('users')
  public async createUser(): Promise<UserModel> {
    return await this.userRepository.save({
      title: 'Hello TypeORM',
    });
  }

  @Get('users')
  public async getUsers(): Promise<UserModel[]> {
    return await this.userRepository.find({
      // select: {
      //   title: true, // select 옵션이 false로 설정된 컬럼의 값을 가져오려고 할 때
      // },
      // select: ['title', 'id'], // 그냥 컬럼명을 배열로 넣어도 됨
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
      title: user.title + '!',
    });
  }
}
