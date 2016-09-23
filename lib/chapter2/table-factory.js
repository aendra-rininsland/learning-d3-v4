import { select as d3Select } from 'd3-selection';

export default function TableBuilder(rows) {
  const header = rows.shift(); // Remove the first element for the header
  const data = rows; // Everything else is a normal data row

  const table = d3Select('body')
    .append('table')
    .attr('class', 'table');

  return {
    table,
    header,
    data,
  };
}
