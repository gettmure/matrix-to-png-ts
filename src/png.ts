import { createWriteStream } from 'fs';
import { PNG } from 'pngjs';
import { WIDTH, HEIGHT, a } from './shared/constants';

const findHighestNumber = (matrix: Array<Array<number>>) => {
  let result = 0;
  matrix.forEach((row: Array<number>) => {
    row.forEach((value: number) => {
      result = value > result ? value : result;
    });
  });
  return result;
};

const getBaseLog = (base: number, argument: number) => {
  return Math.log(argument) / Math.log(base);
};

const createPngPixels = (matrix: Array<Array<number>>, image: PNG): PNG => {
  matrix.forEach((row: Array<number>, rowIndex: number) => {
    row.forEach((value: number, columnIndex: number) => {
      const idx = (WIDTH * rowIndex + columnIndex) << 2;
      image.data[idx] = value;
      image.data[idx + 1] = value;
      image.data[idx + 2] = value;
      image.data[idx + 3] = 255;
    });
  });
  return image;
};

const renderRawPng = (matrix: Array<Array<number>>, image: PNG): void => {
  image = createPngPixels(matrix, image);
  image.pack().pipe(createWriteStream('raw.jpg'));
};

const renderLinearPng = (matrix: Array<Array<number>>, image: PNG): void => {
  const max = findHighestNumber(matrix);
  matrix = matrix.map((row: Array<number>) => {
    return row.map((value: number) => {
      const y: number = Math.round((value / (max / 10)) * 255);
      if (y < 0) {
        return 0;
      }
      if (y > 255) {
        return 255;
      }
      return y;
    });
  });
  image = createPngPixels(matrix, image);
  image.pack().pipe(createWriteStream('linear.jpg'));
};

const renderLogarithmicPng = (
  matrix: Array<Array<number>>,
  image: PNG
): void => {
  const max = findHighestNumber(matrix);
  matrix = matrix.map((row: Array<number>) =>
    row.map((value: number) => {
      const y = 255 * getBaseLog(a, ((a - 1) / max) * value + 1);
      if (y < 0) {
        return 0;
      }
      if (y > 255) {
        return 255;
      }
      return y;
    })
  );
  image = createPngPixels(matrix, image);
  image.pack().pipe(createWriteStream('logarithmic.jpg'));
};

export { renderRawPng, renderLinearPng, renderLogarithmicPng };
