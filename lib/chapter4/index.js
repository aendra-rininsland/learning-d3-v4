/**
* Chapter 4
*/

import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as world from 'earth-topojson';
import chartFactory from '../common/index';

console.dir(world);

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap';
// import * as Rx from 'rxjs';

const sierpinsky = ((run) => {
  if (run) {
    const chart = chartFactory();

    const pointMax = 50000;

    const x = d3.scaleLinear()
      .domain([0, chart.width])
      .range([chart.margin.left, chart.width - chart.margin.right]);

    const y = d3.scaleLinear()
      .domain([0, chart.width])
      .range([chart.margin.left, chart.width - chart.margin.right]);

    const dataset = [
      [chart.width, chart.height],
      [0, chart.height],
      [chart.width / 2, 0],
    ];

    const triangle = dataset.slice(0);

    const drawSierpinsky = (data) => {
      const circles = chart.container.selectAll('circle')
        .data(data);

      circles.enter()
        .append('circle')
        .attr('cx', d => x(d[0]))
        .attr('cy', d => y(d[1]))
        .attr('r', 1);
    };

    const generatePoint = (triangleData, point) => {
      const vertex = triangleData[Math.floor(Math.random() * triangleData.length)];
      const vX = (vertex[0] + point[0]) / 2;
      const vY = (vertex[1] + point[1]) / 2;
      return [vX, vY];
    };

    let point = [chart.width / 2, chart.height / 2];
    dataset.push(point);

    for (let i = 0; i < pointMax; i++) { // Y U FOR LOOPS?!?!
      point = generatePoint(triangle, point);
      dataset.push(point);
    }

    drawSierpinsky(dataset);
  }
})(false);

//
// const req1 = new XMLHttpRequest();
//
// req1.addEventListener('load', function done1() {
//   const response1 = JSON.parse(this.textContent);
//   const req2 = new XMLHttpRequest();
//
//   req2.addEventListener('load', function done2() {
//     console.log(this.textContent);
//   });
//
//   req2.get(response1.newEndpoint);
//   req2.send();
// });
//
// req1.get('http://www.aendrew.com/api/1.json');
// req1.send();
//
//
// d3.json('http://www.aendrew.com/api/1.json', (error1, data1) => {
//   if (data1) {
//     d3.json(data1.newEndpoint, (error2, data2) => {
//       if (data2) {
//         // ...and so on...
//       }
//     });
//   }
// });


// const p = new Promise((resolve, reject) => {
//   d3.json('http://www.aendrew.com/api/1.json', (err, data1) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data1);
//     }
//   });
// });
//
// p.then(data => console.log(data.newEndpoint))
// .catch(err => console.error(err));
//
//
// const p1 = fetch('./data1.json');
// const p2 = fetch('./data2.json');
//
// Promise.all([p1, p2])
//   .then(reqs => [reqs[0].json(), reqs[1].json()])
//   .then(values => {
//     console.log(values[0]); // Resolved data1.json
//     console.log(values[1]); // Resolved data2.json
//   });

// async function getDataAsync() {
//   const data1 = await fetch('./data1.json')
//     .then(res => res.json());
//   const data2 = await fetch('./data2.json')
//     .then(res => res.json());
// }
//
// console.dir(getDataAsync());


// function *getData() {
//
// }
//


// const airQualityChart = (() => {
//     const chart = chartFactory();
//     const endpoint = 'http://api.erg.kcl.ac.uk/AirQuality/Annual/Map/Json';
//     const pollTime = 2000;
//
//     const stream = Rx.Observable.interval(2000);
//     const source = stream.flatMap(() => Rx.Observable.fromPromise(fetch(endpoint)))
//         .flatMap(res => Rx.Observable.fromPromise(res.json()));
//
//     source.subscribe(
//         data => console.info(data),
//         error => console.error(error),
//         () => console.info('done')
//     );
//
// })();
//
// const sensorData = [
//   {location: "a", status: "normal", average: "100", date: "2016-11-01"},
//   {location: "a", status: "normal", average: "200", date: "2016-11-02"},
//   {location: "a", status: "normal", average: "300", date: "2016-11-03"},
//
//   {location: "b", status: "normal", average: "400", date: "2016-11-01"},
//   {location: "b", status: "alarm", average: "500", date: "2016-11-02"},
//   {location: "b", status: "alarm", average: "600", date: "2016-11-03"},
// ];
//
// const sensors = d3.nest()
//   .key(d => d.location)
//   .key(d => d.status)
//   .entries(sensorData);


const scalesDemo = ((enabled) => {
  if (enabled) {
    const chart = chartFactory();

    (function ordinalScales() {
      const data = d3.range(30);
      const colors = d3.scaleOrdinal(d3.schemeCategory10);
      const points = d3.scalePoint()
        .domain(data)
        .range([0, chart.height])
        .padding(1.0);

      const bands = d3.scaleBand()
        .domain(data)
        .range([0, chart.width])
        .padding(0.1);

      chart.container.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.symbol()
          .type(d3.symbolCircle)
          .size(10)
        )
        .attr('transform', d => `translate(${(chart.width / 2)}, ${points(d)})`)
        .style('fill', d => colors(d));

      ['10', '20', '20b', '20c'].forEach((scheme, i) => {
        const height = 10;
        const padding = 5;
        const categoryScheme = `schemeCategory${scheme}`;
        const selector = `rect.scheme-${scheme}`;
        const categoryColor = d3.scaleOrdinal(d3[categoryScheme]);

        chart.container.selectAll(selector)
            .data(data.slice())
            .enter()
            .append('rect')
            .classed(selector, true)
            .attr('x', d => bands(d))
            .attr('y', (chart.height / 2) - ((i * height) + (padding * i)))
            .attr('width', bands.bandwidth)
            .attr('height', height)
            .style('fill', d => categoryColor(d));
      });
    }());

    (function ordinalScales() {
      const weierstrass = (x) => {
        const a = 0.5;
        const b = (1 + 3 * Math.PI / 2) / a; // eslint-disable-line

        return d3.sum(d3.range(100).map(n => Math.pow(a, n) * Math.cos(Math.pow(b, n) * Math.PI * x))); // eslint-disable-line
      };

      const data = d3.range(-100, 100)
        .map(d => d / 200);
      const extent = d3.extent(data.map(weierstrass));
      const colors = d3.scaleOrdinal(d3.schemeCategory10);
      const x = d3.scaleLinear()
        .domain(d3.extent(data))
        .range([0, chart.width]);

      const drawSingle = line => chart.container.append('path')
        .datum(data)
        .attr('d', line)
        .style('stroke-width', 2)
        .style('fill', 'none');

      const linear = d3.scaleLinear()
        .domain(extent)
        .range([chart.height / 4, 0]);
      const line1 = d3.line()
        .x(x)
        .y(d => linear(weierstrass(d)));
      drawSingle(line1)
        .attr('transform', `translate(0, ${chart.height / 16})`)
        .style('stroke', colors(0));

      const identity = d3.scaleIdentity()
        .domain(extent);
      const line2 = line1.y(d => identity(weierstrass(d)));
      drawSingle(line2)
        .attr('transform', `translate(0, ${chart.height / 12})`)
        .style('stroke', colors(1));

      const power = d3.scalePow()
        .exponent(0.2)
        .domain(extent)
        .range([chart.height / 2, 0]);
      const line3 = line1.y(d => power(weierstrass(d)));
      drawSingle(line3)
        .attr('transform', `translate(0, ${chart.height / 8})`)
        .style('stroke', colors(2));

      const log = d3.scaleLog()
        .domain(d3.extent(data.filter(d => (d > 0 ? d : 0))))
        .range([0, chart.width]);
      const line4 = line1.x(d => (d > 0 ? log(d) : 0))
        .y(d => linear(weierstrass(d)));
      drawSingle(line4)
        .attr('transform', `translate(0, ${chart.height / 4})`)
        .style('stroke', colors(3));

      const offset = 100;
      const quantize = d3.scaleQuantize()
        .domain(extent)
        .range(d3.range(-1, 2, 0.5)
        .map(d => d * 100));
      const line5 = line1.x(x)
        .y(d => quantize(weierstrass(d)));
      drawSingle(line5)
        .attr('transform', `translate(0, ${(chart.height / 2) + offset})`)
        .style('stroke', colors(4));

      const threshold = d3.scaleThreshold()
        .domain([-1, 0, 1])
        .range([-50, 0, 50, 100]);
      const line6 = line1.x(x)
        .y(d => threshold(weierstrass(d)));
      drawSingle(line6)
        .attr('transform', `translate(0, ${(chart.height / 2) + (offset * 2)})`)
        .style('stroke', colors(5));
    }());
  }
})(false);

const geoDemo = (async (enabled) => {
  if (enabled) {
    const chart = chartFactory();
    const projection = d3.geoEquirectangular()
      .center([8, 56])
      .scale(150);


    function zoomable() {
   // Slow way
   // chart.call(d3.behavior.zoom()
   //   .translate(projection.translate())
   //   .scale(projection.scale())
   //   .on('zoom', () => onzoom()));

   // Fast way
      chart.call(d3.behavior.zoom()
     .center([chart.attr('width') / 2, chart.attr('height') / 2])
     .scale(projection.scale())
     .on('zoom', () => onzoom()));
    }

    function onzoom() {
   // Slow way
   // projection
   //   .translate(d3.event.translate)
   //   .scale(d3.event.scale);
   //
   // d3.selectAll('path')
   // .attr('d', d3.geo.path().projection(projection));
   //
   // d3.selectAll('line.route')
   //   .attr('x1', (d) => projection([d.from.lon, d.from.lat])[0])
   //   .attr('y1', (d) => projection([d.from.lon, d.from.lat])[1])
   //   .attr('x2', (d) => projection([d.to.lon, d.to.lat])[0])
   //   .attr('y2', (d) => projection([d.to.lon, d.to.lat])[1]);

   // Fast way
      const scaleFactor = d3.event.scale / projection.scale();
      chart.attr('transform', `translate(${d3.event.translate}) scale(${scaleFactor})`);
      d3.selectAll('line.route').each(function () {
        d3.select(this).style('stroke-width', `${2 / scaleFactor}px`);
      });
    }

    function addToMap(collection, key) {
      return chart.append('g')
   .selectAll('path')
   .data(topojson.feature(collection, collection.objects[key]).features)
   .enter()
   .append('path')
   .attr('d', d3.geo.path().projection(projection));
    }

    function draw(sea, land, cultural) {
      addToMap(sea, 'ne_50m_ocean')
   .classed('ocean', true);
      addToMap(land, 'ne_50m_land')
   .classed('land', true);
   // addToMap(sea, 'ne_50m_rivers_lake_centerlines')
   // .classed('river', true);
      addToMap(cultural, 'ne_50m_admin_0_boundary_lines_land')
   .classed('boundary', true);
   // addToMap(cultural, 'ne_10m_urban_areas')
   // .classed('urban', true);

      zoomable();
    }

    function addRenditions(_airports, renditions) {
      let airports = {},
        routes;

      d3.csv.parseRows(_airports).forEach((airport) => {
        const id = airport[4];
        airports[id] = {
          lat: airport[6],
          lon: airport[7],
        };
      });

      routes = renditions.map((v) => {
        const dep = v['Departure Airport'];
        const arr = v['Arrival Airport'];
        return {
          from: airports[dep],
          to: airports[arr],
        };
      }).filter(v => v.to && v.from).slice(0, 100);

      const lines = chart.selectAll('.route')
     .data(routes)
     .enter()
     .append('line')
     .attr('x1', d => projection([d.from.lon, d.from.lat])[0])
     .attr('y1', d => projection([d.from.lon, d.from.lat])[1])
     .attr('x2', d => projection([d.to.lon, d.to.lat])[0])
     .attr('y2', d => projection([d.to.lon, d.to.lat])[1])
     .classed('route', true);
    }
  }
})(true);

export const __hotReload = true; // eslint-disable-line
