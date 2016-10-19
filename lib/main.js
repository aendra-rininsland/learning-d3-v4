import * as d3 from 'd3';
import chartFactory from './common/index';
import './chapter2/index';
import '../styles/index.css!';
// This isn't mentioned in the book, but I've added this line to let hotreload work.
export const __hotReload = true; // eslint-disable-line
import tableFactory from './chapter2/table-factory';

window.d3 = d3;



//
// const parentChart = chartFactory({width: 200, height: 200});
// const childChart = chartFactory({}, parentChart);
// childChart.width === 200;
