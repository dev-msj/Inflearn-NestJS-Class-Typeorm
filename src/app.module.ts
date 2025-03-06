import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5633,
      username: 'alex',
      password: 'password',
      database: 'typeormstudy',
      entities: [UserModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
