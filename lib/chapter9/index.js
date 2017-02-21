import { sankey } from 'd3-sankey';
import * as d3 from 'd3';
import 'whatwg-fetch';
async function typescriptSankey() {
    const sankeyData = await (await fetch('data/uk-election-sankey.json')).json();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const sankeyGenerator = sankey()
        .size([width, height])
        .nodes(sankeyData.nodes)
        .links(sankeyData.links);
    const svg = d3.selectAll('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    const path = sankeyGenerator.link();
    const link = svg.append("g")
        .selectAll(".link")
        .data(sankeyData.links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', () => {
        console.dir(d);
        return path(d);
    })
        .style('stroke-width', d => Math.max(1, d.dy))
        .sort((a, b) => b.dy - a.dy);
    const node = svg.append('g').selectAll('.node')
        .data(sankeyData.nodes)
        .enter().append("g")
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);
    node.append('rect')
        .attr('height', d => d.dy)
        .attr('width', sankeyGenerator.nodeWidth())
        .append('title')
        .text(d => `${d.name}\nSeats: ${d.value}`);
    node.append('text')
        .attr('x', -6)
        .attr('y', d => d.dy / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .attr('transform', null)
        .text(d => d.name)
        .filter(d => d.x < width / 2)
        .attr('x', 6 + sankeyGenerator.nodeWidth())
        .attr('text-anchor', 'start');
}
typescriptSankey();
