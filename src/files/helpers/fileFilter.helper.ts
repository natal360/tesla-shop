import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  // console.log(file)
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtenstion = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExtensions.includes(fileExtenstion)) {
    return callback(null, true);
  } else {
    return callback(
      new BadRequestException(
        `Allow fileTypes: ${validExtensions.map((allowFile) => allowFile)}`,
      ),
      false,
    );
  }
};
