import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() title: string;
  @Column() extension: string;
  @Column() mime: string;
  @Column() size: number;
  @Column() uploadDate: Date;

  static fromObj(obj: Object): File {
    const file = new File();
    Object.keys(obj).forEach((key) => (file[key] = obj[key]));
    return file;
  }

  static updateById(id, params) {
    return File.createQueryBuilder()
      .update(File)
      .set(params)
      .where("id = :id", { id })
      .execute();
  }
}
