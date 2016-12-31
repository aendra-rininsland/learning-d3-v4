import * as d3 from 'd3';
import * as legend from 'd3-svg-legend';
import baseChart from '../chapter6/';
import './chapter7.css';
import {
  fixateColors,
  colorScale as color,
  tooltip,
  connectionMatrix,
  uniques,
} from '../common';

baseChart.pie = function Pie(_data) {
  const data = _data.filter(d => d.screentime > 60);
  fixateColors(data, 'itemLabel');

  this.innerHeight = this.height - (this.margin.bottom + this.margin.top);
  this.innerWidth = this.width - (this.margin.right + this.margin.left);

  const pie = d3.pie().value(d => +d.screentime);
  const arc = d3.arc()
    .outerRadius(this.innerHeight / 2)
    .innerRadius(null);

  const chart = this.container.append('g')
    .classed('pie', true)
    .attr('transform', `translate(${this.innerWidth / 2}, ${this.innerHeight / 2})`);

  const slices = chart.selectAll('.arc').data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .classed('arc', true)
    .attr('fill', d => color(d.data.itemLabel));

  slices.call(tooltip(d => d.data.itemLabel, this.container));
};

// @TODO find data that works with this example
baseChart.histogram = function histogram(_data) {
  const data = _data.filter(d => d['Book of Death'] !== '');
  const x = d3.scaleLinear()
    .rangeRound([this.margin.left, this.width - this.margin.right])
    .domain(d3.extent(data, d => +d['Book of Death']));

  const bins = d3.histogram()
    .domain(x.domain())
    .value(d => +d['Book of Death'])(data);
  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([this.height - this.margin.bottom, this.margin.top]);

  const bar = this.container.selectAll('.bar')
    .data(bins)
    .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${x(d.x0)}, ${y(d.length)})`);

  bar.append('rect')
    .attr('x', 1)
    .attr('width', x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr('height', d => (this.height - this.margin.bottom) - y(d.length));

  bar.append('text')
    .attr('dy', '0.75em')
    .attr('y', 6)
    .attr('x', (x(bins[0].x1) - x(bins[0].x0)) / 2)
    .attr('text-anchor', 'middle')
    .text(d => d.length);
  this.container.append('g')
    .attr('class', 'axis x')
    .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
    .call(d3.axisBottom(x));
};

// Dataset from https://www.reddit.com/r/gameofthrones/comments/4s2n6z/tv_characters_by_number_of_spoken_lines_in_game/
baseChart.stack = function Stack(_data) {
  const data = Object.entries(_data.reduce((last, curr, i) => {
    curr.forEach((d) => {
      last[d.name] = last[d.name] || Array(6).fill(0);
      last[d.name][i] = d.lines;
    });
    return last;
  }, {}))
  .map(([key, value]) => {
    const item = {
      name: key,
    };

    value.forEach((d, i) => (item[`season ${i + 1}`] = d));
    item.total = d3.sum(value);
    return item;
  })
  .sort((a, b) => b.total - a.total);

  const x = d3.scaleBand()
      .rangeRound([0, this.width - this.margin.right - this.margin.left])
      .paddingInner(0.2)
      // .align(0.1);

  const y = d3.scaleLinear()
      .rangeRound([this.height - (this.margin.bottom + this.margin.top + 20), 0]);

  const z = d3.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  const keys = ['season 1', 'season 2', 'season 3', 'season 4', 'season 5', 'season 6'];

  x.domain(data.map(d => d.name));
  y.domain([0, d3.max(data, d => d.total)]).nice();
  z.domain(keys);
  console.dir(data);
  console.dir(d3.stack().keys(keys)(data));
  this.container.append('g')
          .selectAll('g')
          .data(d3.stack().keys(keys)(data))
          .enter()
          .append('g')
            .attr('fill', d => z(d.key))
            .selectAll('rect')
            .data(d => d)
            .enter()
              .append('rect')
              .attr('x', d => x(d.data.name))
              .attr('y', d => y(d[1]))
              .attr('height', d => y(d[0]) - y(d[1]))
              .attr('width', x.bandwidth());

  this.container.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${this.height - (this.margin.bottom + this.margin.top + 20)})`)
            .call(d3.axisBottom(x));

  this.container.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(y).ticks(null, 's'))

  // const legend = this.container.append('g')
  //           .attr('font-family', 'sans-serif')
  //           .attr('font-size', 10)
  //           .attr('text-anchor', 'end')
  //         .selectAll('g')
  //         .data(keys.slice().reverse())
  //         .enter().append('g')
  //           .attr('transform', (d, i) => `translate(0,${i * 20})`);
  //
  // legend.append('rect')
  //           .attr('x', this.width - this.margin.right - 19)
  //           .attr('width', 19)
  //           .attr('height', 19)
  //           .attr('fill', z);
  //
  // legend.append('text')
  //           .attr('x', this.width - this.margin.right - 24)
  //           .attr('y', 9.5)
  //           .attr('dy', '0.32em')
  //           .text(d => d);
};

baseChart.stream = function Stream({ data }) {
  const episodesPerSeason = 10;
  const totalSeasons = 6;
  const seasons = d3.nest()
    .key(d => d.death.episode)
    .key(d => d.death.season)
    .entries(data.filter(d => !d.death.isFlashback))
    .map(v => {
      return d3.range(1, totalSeasons + 1).reduce((item, episodeNumber) => {
        const deaths = v.values.filter(d => d.key == episodeNumber).shift() || 0;
        item[`season-${episodeNumber}`] = deaths ? deaths.values.length : 0;
        return item;
      }, { episode: v.key });
    })
    .sort((a, b) => +a.episode - +b.episode);

  const stack = d3.stack()
    .keys(d3.range(1, totalSeasons + 1).map(key => `season-${key}`))
    .offset(d3.stackOffsetWiggle);

  const x = d3.scaleLinear()
    .domain([1, episodesPerSeason])
    .range([this.margin.left, this.width - this.margin.right - this.margin.left - 20]);

  const y = d3.scaleLinear()
    .domain([
      d3.min(stack(seasons), d => d3.min(d, e => e[0])),
      d3.max(stack(seasons), d => d3.max(d, e => e[1]))
    ])
    .range([this.height - (this.margin.bottom + this.margin.top + 30), 0]);

  const area = d3.area()
      .x(d => x(d.data.episode))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(d3.curveBasis);

  const stream = this.container.append('g')
    .attr('class', 'streams')
    .selectAll('path')
      .data(stack(seasons))
      .enter()
      .append('path')
        .attr('d', area)
        .style('fill', (d, i) => color(i));

  this.container.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${this.height - (this.margin.bottom + this.margin.top + 30)})`)
    .call(d3.axisBottom(x));

  const legendOrdinal = legend.legendColor()
  .orient('horizontal')
  .title('Season')
  .labels(d => d.i + 1)
  .scale(color);

  this.container.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(50,${this.height - (this.margin.bottom + this.margin.top + 130)})`)
    .call(legendOrdinal);

  stream.call(tooltip(d => `Season ${d.index + 1}`, this.container));
};

// @TODO figure out why it's acting weird
baseChart.chord = function Chord(_data) {
  this.innerHeight = this.height - (this.margin.bottom + this.margin.top);
  this.innerWidth = this.width - (this.margin.right + this.margin.left);
  const minimumWeight = 20;
  const majorLinks = _data.filter(d => +d.Weight > minimumWeight);
  const majorSources = uniques(majorLinks, d => d.Source);
  const data = majorLinks.filter(d => majorSources.indexOf(d.Target) > -1);

  const matrix = connectionMatrix(data, 'Source', 'Target', 'Weight');
  const outerRadius = (Math.min(this.width, this.height) * 0.5) - 40;
  const innerRadius = outerRadius - 30;
  const chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

  const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  const ribbon = d3.ribbon()
      .radius(innerRadius);

  const chart = this.container
    .append('g')
    .attr('class', 'chord')
    .attr('transform', `translate(${this.innerWidth / 2}, ${this.innerHeight / 2})`)
    .datum(chord(matrix));

  const group = chart.append('g').attr('class', 'groups')
    .selectAll('g')
    .data(chords => chords.groups)
      .enter()
      .append('g');
  group.append('path')
    .style('fill', d => color(d.index))
    .style('stroke', d => d3.color(color(d.index)).darker())
    .attr('d', arc);

  const ribbons = chart.append('g').attr('class', 'ribbons')
    .selectAll('path')
    .data(chords => chords)
    .enter()
      .append('path')
      .attr('d', ribbon)
      .style('fill', d => color(d.index))
      .style('stroke', d => d3.color(color(d.index)).darker());

  ribbons.call(tooltip(d => majorSources[d.target.index], this.container));
  group.call(tooltip(d => majorSources[d.index], this.container));
};

baseChart.force = function Force(_data) {
  const nodes = uniques(
    uniques(_data, d => d.Target).concat(uniques(_data, d => d.Source)),
    d => d)
    .map(d => ({ id: d }));
  const links = _data.map(d => ({ source: d.Source, target: d.Target, value: d.Weight }));
  const sim = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(this.width / 2, this.height / 2));

  const link = this.container.append('g').attr('class', 'links')
    .selectAll('line')
    .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

  const node = this.container.append('g').attr('class', 'nodes')
    .selectAll('circle')
    .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      // .attr('fill', )
      .call(d3.drag()
        .on('start', dragstart)
        .on('drag', dragging)
        .on('end', dragend));
  node.call(tooltip(d => d.id, this.container));

  sim.nodes(nodes).on('tick', ticked);
  sim.force('link').links(links);

  function ticked() {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
  }

  function dragstart(d) {
    if (!d3.event.active) sim.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragend(d) {
    if (!d3.event.active) sim.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
};

export default baseChart;
