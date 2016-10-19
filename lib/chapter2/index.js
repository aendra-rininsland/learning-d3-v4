import * as d3 from 'd3';
import chartFactory from '../common/index';
import tableFactory from './table-factory';

export default async function lifeExpectancyTable() {
  const getData = async () => {
    try {
      const response = await fetch('data/who-gho-life-expectancy.json');
      const raw = await response.json();
      return raw.fact.filter(d => d.dim.GHO === 'Life expectancy at birth (years)'
        && d.dim.SEX === 'Both sexes' && d.dim.YEAR === '2014')
        .map(d => [
          d.dim.COUNTRY,
          d.Value,
        ]);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const data = await getData();
  data.unshift(['Country', 'Life expectancy (years from birth)']);

  return tableFactory(data).table
    .selectAll('tr')
    .filter(i => i)
    .sort(([, yearsA], [, yearsB]) => yearsA - yearsB);
}

export function renderSVGStuff() {
  const chart = chartFactory();

  const text = chart.container.append('text')
    .text("Ceci n'est pas un trajet!")
    .attr('x', 50)
    .attr('y', 200)
    .attr('text-anchor', 'start');

  const circle = chart.container.append('circle')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('r', 100)
    .attr('fill', 'green')
    .attr('stroke', 'steelblue')
    .attr('fill-opacity', 0.5)
    .attr('stroke-width', 2);

  const ellipses = chart.container.append('ellipse')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('rx', 150)
    .attr('ry', 70)
    .attr('fill', 'green')
    .attr('fill-opacity', 0.3)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 0.7);

  chart.container.append('ellipse')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('rx', 80)
    .attr('ry', 7);

  const line = chart.container.append('line')
    .attr('x1', 10)
    .attr('y1', 10)
    .attr('x2', 100)
    .attr('y2', 100)
    .attr('stroke', 'blue')
    .attr('stroke-width', 3);

  const rect = chart.container.append('rect')
    .attr('x', 200)
    .attr('y', 50)
    .attr('width', 300)
    .attr('height', 400)
    .lower();

  rect.attr('stroke', 'green')
    .attr('stroke-width', 0.5)
    .attr('fill', 'white')
    .attr('rx', 20)
    .attr('ry', 4);

  // chart.container.selectAll('ellipse, circle')
  //   .attr('transform', 'translate(150, 0)');
  //
  // chart.container.selectAll('ellipse, circle')
  //     .attr('transform', 'translate(150, 0) rotate(-45, 350, 250)');

  // chart.container.selectAll('ellipse, circle')
  //   .attr('transform', 'translate(150, 0) rotate(-45, 350, 250) scale(1.2)');
  //
  chart.container.selectAll('ellipse, circle')
    .attr('transform', `translate(150, 0)
      scale(1.2)
      translate(-250, 0)
      rotate(-45, ${350 / 1.2}, ${250 / 1.2})`);
      // skewY(20)`);

  const path = chart.container.append('path')
    .attr('d', 'M 100 100 L 300 100 L 200 300 z')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'red')
    .attr('fill-opacity', 0.7);

  // chart.container.selectAll('*')
  //   .remove();
}

// renderSVGStuff();

export function yayPaths() {
  const chart = chartFactory();

  const sine = d3.range(0, 10)
    .map(k => [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)]);

  const x = d3.scaleLinear()
    .range([
      0,
      (chart.width / 2) - (chart.margin.left + chart.margin.right),
    ])
    .domain(d3.extent(sine, d => d[0]));

  const y = d3.scaleLinear()
    .range([
      (chart.height / 2) - (chart.margin.top + chart.margin.bottom),
      0,
    ])
    .domain([-1, 1]);

  const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

  const g = chart.container.append('g');

  g.append('path')
    .datum(sine)
    .attr('d', line)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  g.append('path')
    .datum(sine)
    .attr('d', line.curve(d3.curveStepBefore))
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('fill', 'none');

  const g2 = chart.container.append('g')
    .attr('transform',
      `translate(${(chart.width / 2) + (chart.margin.left + chart.margin.right)},
        ${chart.margin.top})`);

  const area = d3.area()
    .x(d => x(d[0]))
    .y0(chart.height / 2)
    .y1(d => y(d[1]))
    .curve(d3.curveBasis);

  g2.append('path')
    .datum(sine)
    .attr('d', area)
    .attr('fill', 'steelblue')
    .attr('fill-opacity', 0.4);

  g2.append('path')
    .datum(sine)
    .attr('d', line.curve(d3.curveBasis))
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  const arc = d3.arc();
  const g3 = chart.container.append('g')
    .attr('transform', `translate(${chart.margin.left + chart.margin.right},
      ${(chart.height / 2) + (chart.margin.top + chart.margin.bottom)})`);

  g3.append('path')
    .attr('d',
      arc({
        outerRadius: 100,
        innerRadius: 50,
        startAngle: -Math.PI * 0.25,
        endAngle: Math.PI * 0.25,
      }))
    .attr('transform', 'translate(150, 150)')
    .attr('fill', 'lightslategrey');


  const symbols = d3.symbol()
    .type(d => (d[1] > 0 ? d3.symbolTriangle : d3.symbolDiamond))
    .size((d, i) => (i % 2 ? 0 : 64));

  g2.selectAll('path')
    .data(sine)
    .enter()
    .append('path')
    .attr('d', symbols)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'white')
    .attr('transform', d => `translate(${x(d[0])},${y(d[1])})`);
  //
  // g3.append('g')
  //   .selectAll('path')
  //   .data([{
  //     source: {
  //       radius: 50,
  //       startAngle: -Math.PI * 0.30,
  //       endAngle: -Math.PI * 0.20,
  //     },
  //     target: {
  //       radius: 50,
  //       startAngle: Math.PI * 0.30,
  //       endAngle: Math.PI * 0.30,
  //     },
  //   }])
  //     .enter()
  //     .append('path')
  //     .attr('d', d3.ribbon());
  //
  // const data = d3.zip(d3.range(0, 12), d3.shuffle(d3.range(0, 12)));
  // const colors = ['linen', 'lightsteelblue', 'lightcyan', 'lavender', 'honeydew', 'gainsboro'];
  // const ribbon = d3.ribbon()
  //   .source(d => d[0])
  //   .target(d => d[1])
  //   .radius(150)
  //   .startAngle(d => -2 * Math.PI * (1 / data.length) * d)
  //   .endAngle(d => -2 * Math.PI * (1 / data.length) * ((d - 1) % data.length));
  //
  // g3.append('g')
  //   .attr('transform', 'translate(300, 200)')
  //   .selectAll('path')
  //   .data(data)
  //   .enter()
  //   .append('path')
  //   .attr('d', ribbon)
  //   .attr('fill', (d, i) => colors[i % colors.length])
  //   .attr('stroke', (d, i) => colors[(i + 1) % colors.length]);
}

// yayPaths();

export function axisDemos() {
  const chart = chartFactory({
    margin: { top: 10, bottom: 10, left: 10, right: 10 },
  });

  const amount = 100;

  const x = d3.scaleLinear()
    .domain([0, amount])
    .range([
      0,
      chart.width - chart.margin.right - chart.margin.left - 20,
    ]);

  /* eslint-disable newline-per-chained-call */
  const axes = [
    d3.axisBottom().scale(x),
    d3.axisTop().scale(x).ticks(5),
    d3.axisBottom().scale(x).tickSize(10, 5, 10),
    d3.axisTop().scale(x).tickValues([0, 20, 50, 70, 100])
      .tickFormat((d, i) => ['a', 'e', 'i', 'o', 'u'][i]),
  ];
  /* eslint-enable */

  axes.forEach((axis, i) =>
    chart.container.append('g')
        .data(d3.range(0, amount))
        .classed('trippy', i % 2)
        .attr('transform', `translate(0,${(i * 50) + chart.margin.top})`)
        .call(axis)
  );
}

axisDemos();

export function colorWheels() {
  const chart = chartFactory();
  const rings = 15;
  const colors = d3.schemeCategory20b;
  const angle = d3.scaleLinear()
    .domain([0, 20])
    .range([0, 2*Math.PI]);

  const arc = d3.arc()
    .innerRadius(d => d*50/rings)
    .outerRadius(d => 50+d*50/rings)
    .startAngle((d, i, j) => angle(j))
    .endAngle((d, i, j) => angle(j+1));

  const shade = {
    darker: (d, j) => d3.rgb(colors[j])
      .darker(d / rings),
    brighter: (d, j) => d3.rgb(colors[j])
      .brighter(d / rings)
  };

  [
    [100, 100, shade.darker],
    [300, 100, shade.brighter]
  ].forEach(conf =>
    chart.container.append('g')
    .attr('transform', `translate(${conf[0]}, ${conf[1]})`)
    .selectAll('g')
    .data(colors)
    .enter()
    .append('g')
    .selectAll('path')
    .data(d => d3.range(0, rings))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i, j) => conf[2](d, j))
  );
}

// colorWheels();
