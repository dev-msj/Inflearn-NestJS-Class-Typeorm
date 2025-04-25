import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  // UserModel과 1:1 양방향 관계 설정.
  // 두 번째 인자인 (user) => user.profile을 통해 UserModel의 profile 프로퍼티와 연결되어
  // 서로를 참조할 수 있는 양방향 관계가 생성됨.
  @OneToOne(() => UserModel, (user) => user.profile)
  // ProfileModel이 외래키(userId)를 가지며, UserModel의 PK를 참조하도록 설정함.
  // 즉, ProfileModel 테이블에 userId 컬럼이 생성되고, 이를 통해 UserModel과 1:1로 연결됨.
  @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}
