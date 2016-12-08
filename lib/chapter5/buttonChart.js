import * as d3 from 'd3';
import scenes from '../../data/prison_scenes.json';
import PrisonPopulationChart from './prisonChart';

const buttonPrisonPopulationChart = Object.create(PrisonPopulationChart);

buttonPrisonPopulationChart.scenes = scenes;

buttonPrisonPopulationChart.addUIElements = function addUI() {
  // Add some room for buttons
  this.height -= 100;

  // Needs to update y scale/axis
  this.y.range([this.innerHeight(), 0]);
  this.yAxisElement.call(this.yAxis);

  // ...and the x scale/axis
  this.xAxisElement.attr('transform', `translate(0, ${this.innerHeight()})`);

  this.svg.attr(
    'height',
    +this.svg.attr('height') - 100
  );

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
  this.loadScene0();
};

buttonPrisonPopulationChart.clearSelected = function clearSelected() {
  d3.timeout(() => {
    d3.selectAll('.selected').classed('selected', false);
  }, this.transitionSpeed);
};

buttonPrisonPopulationChart.selectBars = function selectBars(years) {
  this.clearSelected();
  d3.timeout(() => {
    d3.select('.bars').selectAll('.bar')
      .filter(d => years.indexOf(Number(d.year)) > -1)
      .classed('selected', true);
  }, this.transitionSpeed);
};

buttonPrisonPopulationChart.loadScene0 = function scene0() {
  this.update();
  this.clearSelected();
  this.words.html('Choose an era from above');
};

buttonPrisonPopulationChart.loadScene1 = function scene1() {
  const scene = this.scenes[1];
  const range = d3.range(scene.domain[0], scene.domain[1]);
  this.update(this.data.filter(d => range.indexOf(Number(d.year)) > -1));
  this.selectBars(d3.range(1914, 1918));
  this.words.html(scene.copy);
};

buttonPrisonPopulationChart.loadScene2 = function scene2() {
  const scene = this.scenes[2];
  const range = d3.range(scene.domain[0], scene.domain[1]);
  this.update(this.data.filter(d => range.indexOf(Number(d.year)) > -1));
  this.selectBars(d3.range(1939, 1945));
  this.words.html(scene.copy);
};

buttonPrisonPopulationChart.loadScene3 = function scene3() {
  const scene = this.scenes[3];
  const range = d3.range(scene.domain[0], scene.domain[1]);
  this.update(this.data.filter(d => range.indexOf(Number(d.year)) > -1));
  this.words.html(scene.copy);
};

buttonPrisonPopulationChart.loadScene4 = function scene4() {
  const scene = this.scenes[4];
  const range = d3.range(scene.domain[0], scene.domain[1]);
  this.clearSelected();
  this.update(this.data.filter(d => range.indexOf(Number(d.year)) > -1));
  this.selectBars([1993]);
  this.words.text(scene.copy);
};

buttonPrisonPopulationChart.scenes.forEach((v, i) => {
  if (buttonPrisonPopulationChart[`loadScene${i}`]) {
    v.cb = buttonPrisonPopulationChart[`loadScene${i}`].bind(buttonPrisonPopulationChart); // eslint-disable-line
  }
});

export default buttonPrisonPopulationChart;
