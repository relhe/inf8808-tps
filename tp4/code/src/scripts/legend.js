
import * as d3 from 'd3';
import d3Legend from 'd3-svg-legend';

export function drawLegend(colorScale, g, width) {
  const legend = d3Legend.legendColor()
    .scale(colorScale)
    .shape('circle')
    .shapePadding(10)
    .labelAlign('start')
    .orient('vertical')
    .labels(colorScale.domain().sort());

  g.append('g')
    .attr('transform', `translate(${width - 150}, 20)`)
    .call(legend);
}