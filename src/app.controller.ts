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
    return await this.userRepository.find();
  }

  @Patch('users/:id')
  public async updateUser(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return await this.userRepository.save({
      ...user,
      title: user.title + '!',
    });
  }
}
