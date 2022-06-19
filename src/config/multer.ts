import fs from "fs";
import multer from "multer";
import { resolve } from "path";
import { randomUUID } from "crypto";

const upload = (folder: string) => {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "../../uploads/", folder),
      filename: (request, file, callback) => {
        const fileHash: string = randomUUID();
        const fileName: string = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
};

const deleteFile = async (filename: string) => {
  try {
    return await fs.promises.unlink(filename);
  } catch (error) {
    return;
  }
};

export { upload, deleteFile };
