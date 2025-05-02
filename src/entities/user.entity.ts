import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Rule {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // @PrimaryColumn() // PK 설정
  // @PrimaryGeneratedColumn('uuid') // UUID 자동 생성
  @PrimaryGeneratedColumn() // Auto Increment 설정
  id: number;

  @Column()
  email: string;

  // 제목
  // @Column({
  //   /**
  //    * 컬럼 데코레이터에 사용되는 옵션들
  //    */

  //   // 컬럼 타입 지정.
  //   type: 'varchar',

  //   // 컬럼명 지정.
  //   // name: '_title', // 코드상에서는 "title"로 사용하지만, 실제 DB에서는 "_title"로 사용됨.
  //   name: 'title',

  //   // 컬럼 길이 지정.
  //   length: 100,

  //   // null 허용 여부
  //   nullable: false,

  //   // 생성할 때만 값 지정 가능
  //   // 이후에는 변경 불가능
  //   update: false,

  //   // find() 관련 함수들을 실행할 때 기본으로 해당 컬럼값을 가져오도록 설정
  //   // 기본값은 true
  //   select: false,

  //   // 생성 시 기본값 설정
  //   default: 'default title',

  //   // 중복되지 않는 고유한 값만 허용. 예: 이메일
  //   // 기본값은 false
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Rule,
    default: Rule.USER,
  })
  rule: Rule;

  // 데이터 생성 일자
  @CreateDateColumn() // 데이터가 생성되는 날짜와 시간을 자동으로 기록
  createdAt: Date;

  // 데이터 갱신 일자
  @UpdateDateColumn() // 데이터가 갱신되는 날짜와 시간을 자동으로 기록
  updatedAt: Date;

  // 버전
  @VersionColumn() // 처음 데이터가 저장될 때 1로 설정되고, 데이터가 갱신될 때마다 1씩 증가(save 함수 호출 횟수 기록)
  version: number;

  @Column()
  // @Generated('increment') // 데이터를 생성할 때마다 1씩 증가
  // addotionalId: number;
  @Generated('uuid') // 데이터를 생성할 때마다 uuid 생성
  addotionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    /* 여기 작성된 option들은 OneToOne, ManyToOne, ManyToMany에 모두 적용 가능하다. */

    // find()를 실행할 때마다 항상 relation된 entity도 같이 가져옴. 기본값은 false.
    eager: true,
    // "저장"할 때 relation된 entity도 같이 저장됨. 기본값은 false.
    cascade: true,
    // null 허용 여부. 기본값은 true.
    nullable: false,
    /**
     * onDelete 옵션: postgresql에서만 사용 가능.
     *
     * * 부모 테이블: ProfileModel
     * * 자식 테이블: UserModel
     *
     * - NO ACTION: 부모 테이블의 row가 삭제될 때, 자식 테이블는 아무런 동작을 하지 않음.
     * - CASCADE: 부모 테이블의 row가 삭제될 때, 이를 참조하는 자식 테이블의 row도 같이 삭제됨.
     * - SET NULL: 부모 테이블의 row가 삭제될 때, 이를 참조하는 자식 테이블의 외래키를 NULL로 설정함.
     * - RESTRICT: 부모 테이블의 row가 삭제될 때, 이를 참조하는 자식 테이블이 존재하면 삭제되지 않음.
     * - SET DEFAULT: 부모 테이블의 row가 삭제될 때, 이를 참조하는 자식 테이블 row의 외래키를 부모 테이블에 설정된 기본 외래키를 따름.
     *
     * SET DEFAULT는 특정 상황에서 사용할 때 유용하다.
     * 예를 들어, 특정 페이지의 관리자를 지정할 때, 기본 시스템 관리자가 있고, 추가적인 관리자를 지정할 수 있다고 가정해보자.
     * 이 경우에 기본 시스템 관리자를 기본 외래키로 설정해두면, 추가적인 관리자가 삭제되더라도 기본 시스템 관리자로 외래키가 설정된다.
     * 이를 통해 추가 관리자가 삭제되더라도 시스템 관리자는 항상 존재하기 때문에, 시스템이 정상적으로 작동할 수 있다.
     * 하지만 기본 외래키로 설정된 시스템 관리자는 삭제할 수 없다.
     */
    onDelete: 'CASCADE',
  })
  // UserModel이 외래키(profileId)를 가지며, ProfileModel의 PK를 참조하도록 설정함.
  // 결과적으로 UserModel 테이블에 profileId 컬럼이 생성되고, 이를 통해 ProfileModel과 1:1로 연결됨.
  // 즉, ProfileModel이 부모 테이블이 되고, UserModel이 자식 테이블이 됨.
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
