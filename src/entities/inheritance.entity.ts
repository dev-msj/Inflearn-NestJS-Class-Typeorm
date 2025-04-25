import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 패턴 1: Class Table Inheritance (각 엔티티별 테이블)
 *
 * BaseModel이 공통 컬럼을 정의하고, 자식 엔티티들이 이를 상속받음
 * 특징:
 * - BaseModel은 테이블로 생성되지 않음 (@Entity 데코레이터 없음)
 * - 각 자식 엔티티(BookModel, CarModel)는 별도의 테이블로 생성됨
 * - 각 테이블은 BaseModel의 모든 컬럼을 포함함
 */
/**
 * 개인적인 생각으로는 아래와 같이 3가지 모델로 분리하여 템플릿처럼 적용하면 더 좋을 것 같다.
 *
 * export class BaseModel {
 *  @CreateDateColumn()
 *  createdAt: Date;
 *
 *  @UpdateDateColumn()
 *  updatedAt: Date;
 * }
 *
 * export class BaseAutoIncrementModel {
 *  @PrimaryGeneratedColumn()
 *  id: number;
 * }
 *
 *
 * export class BaseUUIDModel {
 *  @PrimaryGeneratedColumn()
 *  id: number;
 * }
 */
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

/**
 * 패턴 2: Single Table Inheritance (단일 테이블 상속)
 *
 * 특징:
 * - 하나의 테이블(SingleBaseModel)에 모든 자식 엔티티의 컬럼이 통합됨
 * - 'type' 컬럼으로 각 레코드의 엔티티 타입을 구분
 * - 자식 엔티티에 고유한 컬럼은 다른 엔티티의 레코드에서는 NULL 값을 가짐
 *
 * 사용 사례: 상속 구조가 간단하고 자식 엔티티 간 공통 컬럼이 많은 경우
 */
@Entity() // SingleBaseModel 테이블이 생성됨
@TableInheritance({ column: { name: 'type', type: 'varchar' } }) // type 컬럼으로 자식 엔티티 구분
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity() // 실제 테이블 생성이 없고 SingleBaseModel 테이블에 brand 컬럼이 추가됨
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity() // 실제 테이블 생성 없고 SingleBaseModel 테이블에 country 컬럼이 추가됨
export class AirplaneModel extends SingleBaseModel {
  @Column()
  country: string;
}
