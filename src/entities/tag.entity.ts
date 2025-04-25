import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostModel } from './post.entity';

@Entity()
export class TagModel {
  @PrimaryGeneratedColumn()
  id: number;

  // TagModel과 PostModel이 N:M(ManyToMany) 관계를 가짐
  // 이 필드는 PostModel에서 선언한 @ManyToMany와 연결되어 있음
  // 실제 DB에는 중간 테이블(post_model_tags_tag_model)이 생성되며,
  // TagModel에서는 @JoinTable()을 선언하지 않으므로, 관계의 주인이 아님
  // 단순히 PostModel과의 다대다 관계를 참조하는 역할만 함
  @ManyToMany(() => PostModel, (post) => post.tags)
  posts: PostModel[];

  @Column()
  name: string;
}
