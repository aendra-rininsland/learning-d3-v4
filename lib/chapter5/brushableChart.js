import * as d3 from 'd3';
import interactivePrisonChart from './buttonChart';

const brushablePrisonPopulationChart = Object.create(interactivePrisonChart);

brushablePrisonPopulationChart.margin.right = 50;

brushablePrisonPopulationChart.x
  .padding(0.1)
  .range([brushablePrisonPopulationChart.margin.left, brushablePrisonPopulationChart.width]);

brushablePrisonPopulationChart.y
  .range([brushablePrisonPopulationChart.height - brushablePrisonPopulationChart.margin.bottom, brushablePrisonPopulationChart.margin.top]);


brushablePrisonPopulationChart.addUIElements = function () {
  this.brush = d3.brush();
  this.container.append('g')
    .classed('brush', true)
    .call(this.brush
      .on('brush', this.brushmove.bind(this))
      .on('end', this.brushend.bind(this)));
};

brushablePrisonPopulationChart.brushmove = function () {
  const e = d3.event.selection;
  if (e) {
    d3.selectAll('.bar').classed('selected', d =>
      e[0][0] <= this.x(d.year)
      && this.x(d.year) <= e[1][0]
    );
  }
};

brushablePrisonPopulationChart.brushend = function () {
  if (!d3.event.sourceEvent) return; // Only transition after input.
  if (!d3.event.selection) return; // Ignore empty selections.
  const selected = d3.selectAll('.selected');
  console.dir(selected);
  // Clear brush object
  d3.select('g.brush').call(d3.event.target.move, null);
  // d3.event.target.move(d3.select('g.brush'), null);

  // Zoom to selection
  const first = selected._groups[0][0];
  const last = selected._groups[0][selected.size() - 1];
  const startYear = d3.select(first).data()[0].year;
  const endYear = d3.select(last).data()[0].year;
  this.clearSelected();
  this.updateChart(this.data.filter(d =>
    d3.range(startYear, endYear).indexOf(Number(d.year)) > -1));

  const hitbox = this.svg
    .append('rect')
    .classed('hitbox', true)
    .attr('width', this.svg.attr('width'))
    .attr('height', this.svg.attr('height'))
    .attr('fill-opacity', 0);

  hitbox.on('contextmenu', this.rightclick.bind(this));
};

brushablePrisonPopulationChart.rightclick = function () {
  d3.event.preventDefault();
  this.clearSelected();
  this.updateChart.call(this, this.data);
  this.svg.select('.hitbox').remove();
};

export default brushablePrisonPopulationChart;
