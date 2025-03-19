import * as d3 from 'd3';

export function positionLabels(g, width, height) {
  g.select('.x.axis-text')
    .attr('transform', `translate(${width/2}, ${height + 40})`);

  g.select('.y.axis-text')
    .attr('transform', `translate(-40, ${height/2}) rotate(-90)`);
}

export function drawCircles(data, rScale, colorScale, xScale, yScale, tip) {
  // Select only circles with the class 'graph-circle'
  d3.select('#graph-g').selectAll('circle.graph-circle')
    .data(data, d => d['Country Name'])
    .join(
      enter => enter.append('circle')
        .attr('class', 'graph-circle') // Add a class to distinguish graph circles
        .attr('r', d => rScale(d.Population))
        .attr('fill', d => colorScale(d.Continent))
        .attr('fill-opacity', 0.7)
        .attr('stroke', 'white')
        .call(sel => tip ? sel.on('mouseover', tip.show).on('mouseout', tip.hide) : sel),
      update => update,
      exit => exit.remove()
    );
}

export function setCircleHoverHandler(tip) {
  d3.select('#graph-g').selectAll('circle.graph-circle')
    .on('mouseover', function(event, d) {
      tip.show(d, this);
      d3.select(this).attr('fill-opacity', 1);
    })
    .on('mouseout', function(event, d) {
      tip.hide(d, this);
      d3.select(this).attr('fill-opacity', 0.7);
    });
}

export function moveCircles(xScale, yScale, transitionDuration) {
  d3.select('#graph-g').selectAll('circle.graph-circle')
    .transition()
    .duration(transitionDuration)
    .attr('cx', d => xScale(d.GDP))
    .attr('cy', d => yScale(d.CO2));
}

export function setTitleText(year) {
  d3.select('.title')
    .text(`Data for year : ${year}`);
}