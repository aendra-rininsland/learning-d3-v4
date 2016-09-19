export let __hotReload = true; // This isn't mentioned in the book, but I've added this line to let hotreload work.

import { select as d3Select } from 'd3-selection';
import { csvParse as d3CsvParse } from 'd3-dsv';
import { mean as d3Mean, max as d3Max } from 'd3-array';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
import { transition as d3Transition } from 'd3-transition';
import * as styles from 'styles/index.css!';

// import { chartFactory } from './common/index';
//
// const chartA = chartFactory();


// console.dir(chartA.margin.left);
// console.dir(chartB.margin.left);
//
// chartA.margin.left = 200;
// console.dir(chartA.margin.left);
// console.dir(chartB.margin.left);

// import chartFactory from './common/index';
//
// const chart = chartFactory({
//   margin: {
//     left: 555,
//   },
//   id: 'wooo',
// });
//
// console.dir(chart);

//
// class BasicChart {
//   constructor() {
//     this.width = window.innerWidth;
//     this.height = window.innerHeight;
//     this.margin = {
//       left: 5,
//       top: 5,
//       bottom: 5,
//       right: 5,
//     };
//
//     this.svg = d3.select('body')
//       .append('svg')
//       .attr('id', this.id || 'chart')
//       .attr('width', this.width - this.margin.right)
//       .attr('height', this.height - this.margin.bottom);
//
//     this.container = this.svg.append('g')
//       .attr('id', 'container')
//       .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
//   }
// }
//
// class NewChart extends BasicChart {
//   constructor(opts) {
//     super();
//     Object.entries(opts)
//       .forEach(([key, val]) => {
//         this[key] = Object(val) === val ? Object.assign({}, this[key], val) : val;
//       });
//   }
// }
//
// const chart = new NewChart({
//   margin: {
//     left: 500,
//   },
// });
//
// console.dir(chart);

// const chart = d3.select('body')
//   .append('svg')
//   .attr('id', 'chart');

const chart = d3Select('body')
  .append('svg')
  .attr('id', 'chart');

const req = new window.XMLHttpRequest();
req.addEventListener('load', mungeData);
req.open('GET', 'data/EU-referendum-result-data.csv');
req.send();

function mungeData() {
  const data = d3CsvParse(this.responseText);
  const regions = data.reduce((last, row) => {
    if (!last[row.Region]) last[row.Region] = []; // eslint-disable-line no-param-reassign
    last[row.Region].push(row);
    return last;
  }, {});
  const regionsPctTurnout = Object.entries(regions)
    .map(([region, areas]) => ({
      region,
      meanPctTurnout: d3Mean(areas, d => d.Pct_Turnout),
    }));

  renderChart(regionsPctTurnout);
}

function renderChart(data) {
  chart.attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  const x = d3ScaleBand()
    .domain(data.map(d => d.region))
    .rangeRound([50, window.innerWidth - 50])
    .padding(0.1);

  const y = d3ScaleLinear()
    .domain([0, d3Max(data, d => d.meanPctTurnout)])
    .range([window.innerHeight - 50, 0]);

  const xAxis = d3AxisBottom()
    .scale(x);
  const yAxis = d3AxisLeft()
    .scale(y);

  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${window.innerHeight - 50})`)
    .call(xAxis);

  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);

  chart.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.region))
    .attr('y', window.innerHeight - 50)
    .attr('width', x.bandwidth())
    .attr('height', 0)
      .transition()
      .delay((d, i) => i * 20)
      .duration(800)
      .attr('y', d => y(d.meanPctTurnout))
      .attr('height', d => (window.innerHeight - 50) - y(d.meanPctTurnout));
}
