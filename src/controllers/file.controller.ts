import { Request } from "express";
import { File } from "../entity/File";
import { env } from "../environment/environment";
import { ControllerError } from "../utils/errors";
import { unlink } from "fs";

const getFileQb = () => {
  return File.createQueryBuilder("file").select([
    "file.id",
    "file.title",
    "file.extension",
    "file.mimetype",
    "file.size",
    "file.uploadDate",
  ]);
};

const getFilePath = (name, id, extension?) =>
  env.publicPath +
  "/files/" +
  id +
  "_" +
  name +
  (extension ? "." + extension : "");

export const FileController = {
  addFile: async (req: Request) => {
    if (!req.files) {
      throw new ControllerError("Нет файла для загрузки", 400);
    }

    let file = req.files.file;

    const [fileName, fileExtension] = file.name.split(".");

    const fileEntity = await File.fromObj({
      title: fileName,
      extension: fileExtension,
      mimetype: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
    }).save();

    file.mv(getFilePath(file.name, fileEntity.id));
    return fileEntity;
  },

  getFiles: async (req: Request) => {
    const files = await getFileQb()
      .limit(req.query.list_size || 10)
      .offset(req.query.page * req.query.list_size || 0)
      .getMany();

    return files;
  },

  getFile: async (req: Request) => {
    const file = await getFileQb()
      .where("file.id = :fileId", {
        fileId: req.params.id,
      })
      .getOne();

    if (!file) {
      throw new ControllerError("Файл не найден", 400);
    }

    return file;
  },

  deleteFile: async (req: Request) => {
    const file = await FileController.getFile(req);

    unlink(getFilePath(file.title, file.id, file.extension), async (err) => {
      if (err) {
        throw new ControllerError("Не удалось удалить файл", 400);
      } else {
        await File.createQueryBuilder("file")
          .delete()
          .where("file.id = :fileId", { fileId: file.id })
          .execute();
      }
    });

    return { status: "success" };
  },
};
