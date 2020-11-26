import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() login: string;

  @Column({ select: false }) password: string;

  static fromObj(obj: Object): User {
    const user = new User();
    Object.keys(obj).forEach((key) => (user[key] = obj[key]));
    return user;
  }

  static updateById(id, params) {
    return User.createQueryBuilder()
      .update(User)
      .set(params)
      .where("id = :id", { id })
      .execute();
  }
}
