import * as d3 from 'd3';
import * as legend from 'd3-svg-legend';
import './chapter6.css';
import chartFactory, {
  fixateColors,
  addRoot,
  colorScale as color,
  tooltip,
  heightOrValueComparator,
  valueComparator,
  descendantsDarker,
} from '../common';

const getHouseColor = (d) => {
  const ancestors = d.ancestors();
  let house;
  if (ancestors.length > 1) {
    ancestors.pop();
    house = ancestors.pop().id.split(' ').pop();
  } else {
    house = 'Westeros';
  }

  return color(house);
};

const getMajorHouses = data => addRoot(data, 'itemLabel', 'fatherLabel', 'Westeros')
    .map((d, i, a) => {
      if (d.fatherLabel === 'Westeros') {
        const childrenLen = a.filter(e => e.fatherLabel === d.itemLabel).length;
        return childrenLen > 0 ? d : undefined;
      } else {
        return d;
      }
    })
    .filter(i => i);

const westerosChart = chartFactory({
  margin: { left: 50, right: 50, top: 50, bottom: 50 },
  padding: { left: 10, right: 10, top: 10, bottom: 10 },
});

westerosChart.loadData = async function loadData(uri) {
  if (uri.match(/\.csv$/)) {
    this.data = d3.csvParse(await (await fetch(uri)).text());
  } else if (uri.match(/\.json$/)) {
    this.data = await (await fetch(uri)).json();
  }


  return this.data;
};

westerosChart.init = function initChart(chartType, dataUri, ...args) {
  this.loadData(dataUri).then(data => this[chartType].call(this, data, ...args));
  this.innerHeight = this.height - this.margin.top - this.margin.bottom - this.padding.top - this.padding.bottom;
  this.innerWidth = this.width - this.margin.left - this.margin.right - this.padding.left - this.padding.right;
};

westerosChart.tree = function Tree(_data) {
  const data = getMajorHouses(_data);

  const chart = this.container;

  const stratify = d3.stratify()
    .parentId(d => d.fatherLabel)
    .id(d => d.itemLabel);
  const root = stratify(data);

  const layout = d3.tree()
    .size([
      this.innerHeight,
      this.innerWidth,
    ]);

  // Links
  const links = layout(root)
    .descendants()
    .slice(1);

  chart.selectAll('.link')
    .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => {
        return `M${d.x},${d.y
        }C${d.x},${(d.y + d.parent.y) / 2
        } ${d.parent.x},${(d.y + d.parent.y) / 2
        } ${d.parent.x},${d.parent.y}`
      });
      // .attr('d', d => `M${d.y},${d.x
      //          }C${(d.y + d.parent.y) / 2},${d.x
      //          } ${(d.y + d.parent.y) / 2},${d.parent.x
      //          } ${d.parent.y},${d.parent.x}`);

  // Nodes
  const nodes = chart.selectAll('.node')
    .data(root.descendants())
    .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);
      // .attr('transform', d => `translate(${d.y},${d.x})`);

  fixateColors(root.ancestors().shift().children.map((v) => {
    const fragments = v.id.split(' ');
    const house = fragments.pop();
    return house;
  }), 'id');

  nodes.append('circle')
    .attr('r', 4.5)
    .attr('fill', getHouseColor);

  nodes.call(tooltip(d => d.data.itemLabel, this.container));

  const l = legend
    .legendColor()
    .scale(color);

  this.container
    .append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(0, ${this.innerHeight / 2})`)
    .call(l);
};

westerosChart.cluster = function Cluster(_data) {
  const data = getMajorHouses(_data);

  const stratify = d3.stratify()
    .parentId(d => d.fatherLabel)
    .id(d => d.itemLabel);

  const root = stratify(data);

  fixateColors(root.ancestors().shift().children.map((v) => {
    const fragments = v.id.split(' ');
    const house = fragments.pop();
    return house;
  }), 'id');

  const layout = d3.cluster()
    .size([
      this.innerHeight,
      this.innerWidth - 150,
    ]);

  const links = layout(root)
    .descendants()
    .slice(1);

  this.container.selectAll('.link')
    .data(links)
    .enter()
    .append('path')
    .classed('link', true)
    .attr('d', d => `M${d.y},${d.x
             }C${(d.y + d.parent.y) / 2},${d.x
             } ${(d.y + d.parent.y) / 2},${d.parent.x
             } ${d.parent.y},${d.parent.x}`);

  const nodes = this.container.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .classed('node', true)
    .attr('transform', d => `translate(${d.y},${d.x})`);

  nodes.append('circle')
    .attr('r', 5)
    .attr('fill', getHouseColor);

  nodes.call(tooltip(d => d.data.itemLabel, this.container));

  const l = legend
    .legendColor()
    .scale(color);

  this.container
    .append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${this.innerWidth - 100}, 0)`)
    .call(l);
};

westerosChart.treemap = function Treemap(_data) {
  const data = getMajorHouses(_data);

  const stratify = d3.stratify()
    .parentId(d => d.fatherLabel)
    .id(d => d.itemLabel);

  const root = stratify(data)
    .sum(d => d.screentime)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  fixateColors(root.ancestors().shift().children.map((v) => {
    const fragments = v.id.split(' ');
    const house = fragments.pop();
    return house;
  }), 'id');

  const layout = d3.treemap()
    .size([
      this.innerHeight,
      this.innerWidth,
    ])
    .padding(3)
    .round(true);

  layout(root);

  const nodes = this.container.selectAll('.node')
    .data(root.descendants().slice(1))
    .enter()
    .append('g')
      .attr('class', 'node');

  nodes.append('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => descendantsDarker(d, color, true));

  nodes.call(tooltip(d => d.data.itemLabel, this.container));
};

westerosChart.partition = function Partition(_data) {
  const data = getMajorHouses(_data);

  fixateColors(data, 'itemLabel');

  const stratify = d3.stratify()
    .parentId(d => d.fatherLabel)
    .id(d => d.itemLabel);

  const root = stratify(data)
    .sum(d => d.screentime)
    .sort(heightOrValueComparator);

  const layout = d3.partition()
    .size([
      this.innerWidth - 100,
      this.innerHeight,
    ])
    .padding(2)
    .round(true);

  layout(root);

  const nodes = this.container.selectAll('.node')
    .data(root.descendants().slice(1))
    .enter()
    .append('g')
      .attr('class', 'node');

  nodes.append('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => descendantsDarker(d, color, false));

  nodes.call(tooltip(d => d.data.itemLabel, this.container));
};

westerosChart.pack = function Pack(_data) {
  const data = getMajorHouses(_data);

  fixateColors(data, 'itemLabel');

  const stratify = d3.stratify()
    .parentId(d => d.fatherLabel)
    .id(d => d.itemLabel);

  const root = stratify(data)
    .sum(d => d.screentime)
    .sort(valueComparator);

  const layout = d3.pack()
    .size([
      this.innerWidth,
      this.innerHeight,
    ]);

  layout(root);

  const nodes = this.container.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('circle')
      .attr('class', 'node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', d => descendantsDarker(d, color, false, 5));

  nodes.call(tooltip(d => d.data.itemLabel, this.container));
};

export default westerosChart;
