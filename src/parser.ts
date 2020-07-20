import { readFileSync } from 'fs';
import { FILEPATH, START, END } from './shared/constants';

const collectRawData = (): Array<Array<number>> => {
  const result = readFileSync(FILEPATH, 'utf8')
    .split('\n')
    .slice(START, END)
    .map((row: string) => row.split(' ').map(Number));
  return result;
};

export default collectRawData;
