import * as d3 from 'd3';
import * as dsv from 'd3-dsv';
import chartFactory from '../common';

const prisonChart = chartFactory({ margin: { left: 50, right: 50, top: 50, bottom: 50 } });
prisonChart.padding = 20;
prisonChart.innerHeight = prisonChart.height - (prisonChart.margin.bottom + prisonChart.margin.top + prisonChart.padding);
prisonChart.innerWidth = prisonChart.width - (prisonChart.margin.right + prisonChart.margin.left + prisonChart.padding);

prisonChart.resolveData = async function resolveData() {
  return dsv.csvParse(await (await fetch('data/uk_prison_data_1900-2015.csv')).text());
};

prisonChart.x = d3.scaleBand()
  .range([0, prisonChart.innerWidth]) // This so should be simplified...
  .padding(0.2);

prisonChart.y = d3.scaleLinear()
  .range([prisonChart.innerHeight, 0]);

prisonChart.init = async function init() {
  this.data = this.data || await this.resolveData();

  this.x.domain(this.data.map(d => d.year));
  this.y.domain([0, d3.max(this.data, d => Number(d.total))]);

  this.xAxis = d3.axisBottom().scale(this.x)
    .tickValues(this.x.domain().filter((d, i) => !(i % 5)));
  this.yAxis = d3.axisLeft().scale(this.y);

  this.xAxisElement = this.container.append('g')
      .classed('axis x', true)
      .attr('transform', `translate(0, ${prisonChart.innerHeight})`);
  this.xAxisElement.call(this.xAxis);

  this.container.append('g')
      .classed('axis y', true)
      .call(this.yAxis);

  this.barsContainer = this.container.append('g')
    .classed('bars', true);
};

prisonChart.update = function update(data) {
  // Update
  const bars = this.barsContainer.selectAll('.bar');
  const barsJoin = bars.data(data, d => d.year);
  barsJoin.style('x', d => this.x(+d.year))
    .style('y', d => this.y(+d.total))
    .style('width', `${this.x.bandwidth()}px`)
    .style('height', d => `${this.innerHeight - this.y(+d.total)}px`);

  // Update scales
  this.x.domain(data.map(d => +d.year));
  this.xAxis.tickValues(this.x.domain().filter((d, i, a) => a.length > 10 ? !(i % 5) : true));
  this.xAxisElement.transition().call(this.xAxis);

  // Remove
  barsJoin.exit()
    .style('opacity', 0)
    .style('height', 0)
    .style('y', this.y(0))
    .transition()
    .delay(1000)
    .remove();

  const newBars = barsJoin.enter() // Enter
    .append('rect')
    .classed('bar', true);

  barsJoin.merge(newBars) // Update
    // .transition()
    // .style('x', d => this.x(+d.year))
    // .style('y', d => this.y(+d.total))
    .style('x', d => this.x(+d.year))
    .style('y', d => this.y(+d.total))
    .style('width', `${this.x.bandwidth()}px`)
    .style('height', d => `${this.innerHeight - this.y(+d.total)}px`);

// this.x.domain(data.map(d => +d.year));
// this.xAxis = d3.axisBottom().scale(this.x)
//   .tickValues(this.x.domain().filter((d, i) => !(i % 5)));
// this.xAxis.scale(this.x);
// this.xAxisElement.call(this.xAxis);
};

export default prisonChart;
