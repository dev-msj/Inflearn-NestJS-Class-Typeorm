import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  // 제목
  @Column({
    /**
     * 컬럼 데코레이터에 사용되는 옵션들
     */

    // 컬럼 타입 지정.
    type: 'varchar',

    // 컬럼명 지정.
    // name: '_title', // 코드상에서는 "title"로 사용하지만, 실제 DB에서는 "_title"로 사용됨.
    name: 'title',

    // 컬럼 길이 지정.
    length: 100,

    // null 허용 여부
    nullable: false,

    // 생성할 때만 값 지정 가능
    // 이후에는 변경 불가능
    update: false,

    // find() 관련 함수들을 실행할 때 기본으로 해당 컬럼값을 가져오도록 설정
    // 기본값은 true
    select: false,

    // 생성 시 기본값 설정
    default: 'default title',

    // 중복되지 않는 고유한 값만 허용. 예: 이메일
    // 기본값은 false
    unique: false,
  })
  title: string;

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
}
