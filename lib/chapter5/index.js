import * as d3 from 'd3';
import chartFactory from '../common';
import scenes from '../../data/prison_scenes.json';

// import './brushableChart';
import prisonChart from './prisonChart';

(async (enabled) => {
  if (!enabled) return;
  await prisonChart.resolveData();
  await prisonChart.init();

  const data = prisonChart.data;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInterval(() => {
    try {
      const from = getRandomInt(0, data.length - 1);
      const to = getRandomInt(from, data.length - 1);
      prisonChart.update(data.slice(from, to));
    } catch(e) {
      console.error(e);
    }
  }, 2000);
})(true);
