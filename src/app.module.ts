import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { StudentModel, TeacherModel } from './entities/person.entity';
import {
  AirplaneModel,
  BookModel,
  CarModel,
  ComputerModel,
  SingleBaseModel,
} from './entities/inheritance.entity';
import { ProfileModel } from './entities/profile.entity';
import { PostModel } from './entities/post.entity';
import { TagModel } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5633,
      username: 'alex',
      password: 'password',
      database: 'typeormstudy',
      entities: [
        UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel,
        SingleBaseModel,
        ComputerModel,
        AirplaneModel,
        ProfileModel,
        PostModel,
        TagModel,
      ], // 엔티티 클래스를 등록하여 DB 테이블과 맵핑 (synchronize: true 옵션과 함께 사용 시 스키마 자동 생성)
      synchronize: true, // 개발 환경에서만 사용 권장 - 프로덕션에서는 마이그레이션 사용
    }),
    TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel, TagModel]), // 현재 모듈에서 사용할 Repository를 등록 (의존성 주입을 위해 필요)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
