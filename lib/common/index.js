import { select as d3Select } from 'd3';

const protoChart = {
  width: window.innerWidth,
  height: window.innerHeight,
  margin: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
  create: function (opts) { // eslint-disable-line
    Object.entries(opts)
      .forEach(([key, val]) => {
        this[key] = Object.assign(this[key], val);
      });

    this.svg = d3Select('body')
      .append('svg')
      .attr('id', 'chart');

    this.container = this.svg.append('g')
      .attr('id', 'container');

    return this;
  },
};

export default Object.create(protoChart);
