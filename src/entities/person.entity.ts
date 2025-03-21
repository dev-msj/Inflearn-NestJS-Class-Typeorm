import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * TypeORM의 Embedded Columns 기능을 활용한 예제
 *
 * 여러 엔티티에서 공통으로 사용되는 컬럼 그룹을 별도 클래스로 분리하여 재사용
 */

// 임베드 가능한 컬럼 그룹 정의
export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

@Entity()
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  // Name 클래스를 임베드하여 사용
  // 실제 DB에는 'name_first', 'name_last' 컬럼이 생성됨
  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  // StudentModel과 동일한 구조의 컬럼을 재사용
  // 실제 DB에는 'name_first', 'name_last' 컬럼이 생성됨
  @Column(() => Name)
  name: Name;

  @Column()
  salary: number;
}
