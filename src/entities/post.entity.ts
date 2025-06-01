import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';
import { TagModel } from './tag.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 현재 클래스(PostModel, Many)가 UserModel(One)과 N:1 관계를 가짐
  // N:1 관계에서는 Many 쪽(PostModel)이 외래키(authorId)를 자동으로 가지며,
  // @JoinColumn()을 명시적으로 선언하지 않아도 됨.
  // One 쪽(UserModel)은 외래키를 가질 수 없으므로, 관계의 주인은 항상 Many 쪽임.
  // => One 쪽은 단순히 "참조되는" 입장이고, 실제 관계를 소유(관리)하는 것은 외래키를 가진 Many(PostModel) 쪽이 됨.
  // DB에서는 author_id 컬럼이 생성됨.
  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

  @Column()
  title: string;

  // PostModel과 TagModel이 N:M(ManyToMany) 관계를 가짐
  // N:M 관계에서는 두 엔티티(PostModel, TagModel) 모두 서로를 배열로 참조
  // 실제 DB에는 두 엔티티의 PK를 연결하는 중간 테이블(post_model_tags_tag_model)이 자동 생성됨
  // @JoinTable()을 선언한 쪽(PostModel)이 중간 테이블의 "주인(owner)"이 되며,
  // 이 테이블에 대한 생성 및 관리 권한을 가짐
  // 반대쪽(TagModel)에서는 @JoinTable()을 선언하지 않음
  @ManyToMany(() => TagModel, (tag) => tag.posts)

  // 현재 클래스를 중간 테이블 생성 및 관계의 주인(owner)으로 지정
  // @JoinTable은 Many-to-Many 관계에서 두 테이블의 기본 키를 참조하는 중간 연결 테이블(Junction Table)을 TypeORM이 자동으로 생성하고 관리하도록 지시하는 역할을 함.
  @JoinTable()
  tags: TagModel[];
}
