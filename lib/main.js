// import { chartFactory } from './common/index';
//
// const chartA = chartFactory();


// console.dir(chartA.margin.left);
// console.dir(chartB.margin.left);
//
// chartA.margin.left = 200;
// console.dir(chartA.margin.left);
// console.dir(chartB.margin.left);

import chartFactory from './common/index';

const chart = chartFactory.create({
  margin: {
    left: 555,
  },
});

console.dir(chart);
