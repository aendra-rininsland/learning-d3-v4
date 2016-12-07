import * as d3 from 'd3';
import scenes from '../../data/prison_scenes.json';
import PrisonPopulationChart from './prisonChart';

const interactivePrisonPopulationChart = Object.create(PrisonPopulationChart);

interactivePrisonPopulationChart.scenes = scenes;
interactivePrisonPopulationChart.addUIElements = function () {
  this.buttons = d3.select('body')
    .append('div')
    .classed('buttons', true)
      .selectAll('.button')
      .data(this.scenes)
      .enter()
      .append('button')
      .classed('scene', true)
      .text(d => d.label)
      .on('click', d => d.cb())
      .on('touchstart', d => d.cb());

  this.words = d3.select('body').append('div');
  this.words.classed('words', true);
};

interactivePrisonPopulationChart.clearSelected = () => d3.selectAll('.selected').classed('selected', false);
interactivePrisonPopulationChart.updateChart = async function(data) {
  const chart = this;

  chart.x.domain(data.map(d => d.year));
  chart.y.domain([0, d3.max(data, d => Number(d.total))]);

  chart.container.selectAll('.axis.x')
    .call(d3.axisBottom().scale(chart.x).tickValues(chart.x.domain().filter((d, i) => !(i % 5))));
  chart.container.selectAll('.axis.y')
    .call(chart.yAxis);

  // // Update
  // bars.transition()
  //   .style('x', d => chart.x(d.year))
  //   .style('width', `${chart.x.bandwidth()}px`)
  //   .style('height', d => `${chart.height - chart.y(+d.total)}px`)
  //   .style('y', d => chart.y(+d.total));

  // Update
  const bars = d3.selectAll('.bars .bar').data(data, d => d.year);

  // Remove
  // bars.exit().remove();

  const newBars = bars.enter() // Enter
    .append('rect')
    .classed('bar', true);
    // .style('x', d => chart.x(+d.year))
    // .style('y', () => chart.y(0))
    // .style('width', `${chart.x.bandwidth()}px`)
    // .style('height', d => `${chart.height - chart.y(+d.total)}px`);
    // .style('width', `${chart.x.bandwidth()}px`)
    // .style('height', '0px');

  newBars.merge(bars) // Update
    .style('x', d => chart.x(+d.year))
    .style('y', d => chart.y(+d.total))
    .style('width', `${chart.x.bandwidth()}px`)
    .style('height', d => `${chart.height - chart.y(+d.total)}px`);
};

interactivePrisonPopulationChart.selectBars = function (years) {
  this.bars.filter(d => years.indexOf(Number(d.year)) > -1).classed('selected', true);
};

interactivePrisonPopulationChart.loadScene0 = function () {
  this.clearSelected();
  this.updateChart();
  this.words.html('');
};

interactivePrisonPopulationChart.loadScene1 = function () {
  const scene = this.scenes[1];
  this.clearSelected();
  this.updateChart(this.data.filter(d =>
      d3.range(scene.domain[0], scene.domain[1]).indexOf(Number(d.year)) > -1))
        .then(() => this.selectBars(d3.range(1914, 1918)));
  this.words.html(scene.copy);
};

interactivePrisonPopulationChart.loadScene2 = function () {
  const scene = this.scenes[2];
  this.clearSelected();
  this.updateChart(this.data.filter(d => d3.range(scene.domain[0], scene.domain[1]).indexOf(Number(d.year)) > -1))
    .then(() => this.selectBars(d3.range(1939, 1945)));
  this.words.html(scene.copy);
};

interactivePrisonPopulationChart.loadScene3 = function () {
  const scene = this.scenes[3];
  this.clearSelected();
  this.updateChart(this.data.filter(d => d3.range(scene.domain[0], scene.domain[1]).indexOf(Number(d.year)) > -1));
  this.words.html(scene.copy);
};

interactivePrisonPopulationChart.loadScene4 = function () {
  const scene = this.scenes[4];
  this.clearSelected();
  this.updateChart(this.data.filter(d => d3.range(scene.domain[0], scene.domain[1]).indexOf(Number(d.year)) > -1))
    .then(() => this.selectBars([1993]));
  this.words.text(scene.copy);
};

interactivePrisonPopulationChart.scenes.forEach((v, i) => {
  if (interactivePrisonPopulationChart[`loadScene${i}`]) {
    v.cb = interactivePrisonPopulationChart[`loadScene${i}`].bind(interactivePrisonPopulationChart);
  }
});

((enabled) => {
  if (!enabled) return;
  interactivePrisonPopulationChart.margin.bottom = 100;
  interactivePrisonPopulationChart.svg.node().setAttribute(
    'height',
    interactivePrisonPopulationChart.svg.node().getAttribute('height') - 100
  );
  interactivePrisonPopulationChart.resolveData().then(() => {
    interactivePrisonPopulationChart.addUIElements();
    interactivePrisonPopulationChart.draw();
  });
})(false);

export default interactivePrisonPopulationChart;
