import * as d3 from 'd3';
import PrisonPopulationChart from './prisonChart';

const draggablePrisonPopulationChart = Object.create(PrisonPopulationChart);
draggablePrisonPopulationChart.margin = {
  top: 50,
  left: 50,
  bottom: 50,
  right: 50,
};

draggablePrisonPopulationChart.x
  .padding(0.1)
  .range([draggablePrisonPopulationChart.margin.left, draggablePrisonPopulationChart.width * 4]);

draggablePrisonPopulationChart.y
  .range([draggablePrisonPopulationChart.height - draggablePrisonPopulationChart.margin.bottom, draggablePrisonPopulationChart.margin.top]);

draggablePrisonPopulationChart.addDragBehavior = function addDrag() {
  const bars = d3.select('.bars');
  const yAxisDimensions = d3.select('.axis.y').raise().node().getBBox();

  bars.on('transitionend', () => {
    bars.on('transitionend', null);
    const dragContainer = this.container.append('rect')
      .classed('bar-container', true)
      .attr('width', bars.node().getBBox().width)
      .attr('height', bars.node().getBBox().height)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill-opacity', 0);

    const drag = d3.drag().on('drag', () => {
      const barsTranslateX = bars.node().transform.baseVal.length ? bars.node().transform.baseVal[0].matrix.e : 0;
      const xAxisTranslateX = d3.select('.axis.x').node().transform.baseVal[0].matrix.e;
      const xAxisTranslateY = d3.select('.axis.x').node().transform.baseVal[0].matrix.f;
      const dx = d3.event.dx;
      if (barsTranslateX + dx < 0 && barsTranslateX + dx > -(dragContainer.attr('width') - this.width)) {
        bars.attr('transform', `translate(${barsTranslateX + dx}, 0)`);
        d3.select('.axis.x').attr('transform',
          `translate(${xAxisTranslateX + d3.event.dx}, ${xAxisTranslateY})`);
      }
    });

    dragContainer.call(drag);
  });
};

(async (enabled) => {
  if (!enabled) return;
  await draggablePrisonPopulationChart.resolveData();
  await draggablePrisonPopulationChart.draw();
  draggablePrisonPopulationChart.addDragBehavior();
})(false);
