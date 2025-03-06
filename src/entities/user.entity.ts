import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // ID
  // @PrimaryColumn() // PK 설정
  // @PrimaryGeneratedColumn('uuid') // UUID 자동 생성
  @PrimaryGeneratedColumn() // Auto Increment 설정
  id: number;

  // 제목
  @Column()
  title: string;

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
