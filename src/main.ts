import { PNG } from 'pngjs';
import { WIDTH, HEIGHT } from './shared/constants';
import { renderRawPng, renderLinearPng, renderLogarithmicPng } from './png';
import collectRawData from './parser';

const OPTIONS: PNGOptions = {
  width: WIDTH,
  height: HEIGHT,
  filterType: -1,
};

const rawPng: PNG = new PNG(OPTIONS);
const linearPng: PNG = new PNG(OPTIONS);
const logarithmicPng: PNG = new PNG(OPTIONS);

const main = (): void => {
  const rawData: Array<Array<number>> = collectRawData();
  renderRawPng(rawData, rawPng);
  renderLinearPng(rawData, linearPng);
  renderLogarithmicPng(rawData, logarithmicPng);
};

main();
