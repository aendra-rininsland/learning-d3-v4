import 'source-map-support/register';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as d3 from 'd3';
import { readFileSync } from 'fs';

async function renderView(ctx, next) {
  await next(); // This ensures all the other middleware runs first!

  if (ctx.method === 'GET') {
    ctx.body =
    `<!doctype html>
      <html>
      <head>
        <title>Find your nearest airport!</title>
      </head>
      <body>
        <form method="POST" action="/">
          <h1>Enter your latitude and longitude, or allow your browser to check.</h1>
          <input type="text" name="location" /> <br />
          <input type="submit" value="Check" />
        </form>
        <script type="text/javascript">
        navigator.geolocation.getCurrentPosition(function(position) {
          document.querySelector('[name="location"]').value = position.coords.latitude + ',' + position.coords.longitude;
        });
        </script>
      </body>
    </html>`;
  } else if (ctx.method === 'POST'){
    const airport = ctx.state.airport.data;
    ctx.body = `<!doctype html>
    <html>
    <head>
      <title>Your nearest airport is: ${airport.name}</title>
    </head>
    <body style="text-align: center;">
      <h1>
        The airport closest to your location is: ${airport.name}
      </h1>
      <table style="margin: 0 auto;">
      <tr>
        ${Object.keys(airport).map(v => `<th>${v}</th>`).join('')}
      </tr>
      <tr>
        ${Object.keys(airport).map(v => `<td>${airport[v]}</td>`).join('')}
        </tr>
      </body>
    </html>`;
  }
}

async function renderViewCanvas(ctx, next) {
  await next(); // This ensures all the other middleware runs first!

  if (ctx.method === 'GET') {
    ctx.body =
    `<!doctype html>
      <html>
      <head>
        <title>Find your nearest airport!</title>
      </head>
      <body>
        <form method="POST" action="/">
          <h1>Enter your latitude and longitude, or allow your browser to check.</h1>
          <input type="text" name="location" /> <br />
          <input type="submit" value="Check" />
        </form>
        <script type="text/javascript">
        navigator.geolocation.getCurrentPosition(function(position) {
          document.querySelector('[name="location"]').value = position.coords.latitude + ',' + position.coords.longitude;
        });
        </script>
      </body>
    </html>`;
  } else if (ctx.method === 'POST'){
    const airport = ctx.state.airport.data;
    const { canvasOutput } = ctx.state;
    ctx.body = `<!doctype html>
    <html>
    <head>
      <title>Your nearest airport is: ${airport.name}</title>
    </head>
    <body style="text-align: center;">
      <h1>
        The airport closest to your location is: ${airport.name}
      </h1>
      <img style="width: 480px; height: 250px;" src="${canvasOutput}" />
      <table style="margin: 0 auto;">
      <tr>
        ${Object.keys(airport).map(v => `<th>${v}</th>`).join('')}
      </tr>
      <tr>
        ${Object.keys(airport).map(v => `<td>${airport[v]}</td>`).join('')}
        </tr>
      </body>
    </html>`;
  }
}


function nearestAirport(ctx, next) {
  if (ctx.method === 'POST' && ctx.request.body && ctx.request.body.location) {
    const { location } = ctx.request.body;

    const airportData = readFileSync('data/airports.dat', { encoding: 'utf8' });
    const points = d3.csvParseRows(airportData)
      .filter(airport => !airport[5].match(/\N/) && airport[4] !== '')
      .map(airport => ({
        name: airport[1],
        location: airport[2],
        country: airport[3],
        code: airport[4],
        latitude: airport[6],
        longitude: airport[7],
        timezone: airport[11]
      }));

    ctx.state.airport = nearestLocation(location, points);
    next();
  }
}

export function nearestLocation(location, points) {
  const coords = location.split(/,\s?/);
  const voronoi = d3.voronoi()
    .x(d => d.latitude)
    .y(d => d.longitude);

  return voronoi(points).find(coords[0], coords[1]);
}

function canvasMap(location, airports) {
  let canvas = new Canvas(960, 500);
  let ctx = canvas.getContext('2d');
  let projection = d3.geo.mercator()
    .center([location.split(/,\s?/)[1],
      location.split(/,\s?/)[0]])
    .scale(500);

  let boundaries = require('earth-topojson/110m.json');
  let airport = nearestVoronoi(location, airports);
  let airportProjected = projection([airport.point.longitude, airport.point.latitude]);

  let path = d3.geo.path()
    .projection(projection)
    .context(ctx);

  ctx.beginPath();
  path(topojson.feature(boundaries, boundaries.objects.countries));
  ctx.stroke();

  ctx.fillStyle = '#f00';
  ctx.fillRect(airportProjected[0] - 5 , airportProjected[1] - 5, 10, 10);

  return canvas.toDataURL();
}

const app = new Koa();
const port = process.env.PORT || 5555;

app.use(bodyParser())
   .use(nearestAirport)
   .use(renderView);

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
