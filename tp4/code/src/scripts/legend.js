import * as d3 from 'd3';

export function drawLegend(colorScale, g, width) {
  // Define the margin bottom (e.g., 40 pixels)
  const marginBottom = 40;

  // Define the vertical spacing between legend items (e.g., 25 pixels)
  const itemSpacing = 25;

  // Create a legend group and position it with marginBottom
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 20}, -50)`); // Add marginBottom to the y position

  // Add a title to the legend
  legendGroup.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('dy', '0.32em')
    .attr('font-size', '14px')
    .attr('font-weight', 'bold')
    .text('Legend');

  // Get the sorted list of continents
  const continents = colorScale.domain().sort();

  // Add legend items (circles and labels)
  legendGroup.selectAll('.legend-item')
    .data(continents)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${(i + 1) * itemSpacing})`) // Add spacing between items
    .each(function (d) {
      const item = d3.select(this);

      // Add colored circle
      item.append('circle')
        .attr('cx', 10)
        .attr('cy', 10)
        .attr('r', 11)
        .attr('fill', d => colorScale(d));

      // Add label text
      item.append('text')
        .attr('x', 25)
        .attr('y', 10)
        .attr('dy', '0.32em')
        .text(d);
    });
}