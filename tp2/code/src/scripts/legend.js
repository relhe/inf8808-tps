/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw(data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".
  // Select the div with class "legend"
  const legend = d3.select('.legend');

  // Clear any existing legend elements to avoid duplication
  legend.selectAll('*').remove();

  // Append one div per legend element
  const legendElements = legend
    .selectAll('.legend-element')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'legend-element')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('margin-bottom', '5px');

  // Add colored rectangles for each legend element
  legendElements
    .append('svg')
    .attr('width', 15)
    .attr('height', 15)
    .append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', (d) => color(d));

  // Add text labels next to the rectangles
  legendElements
    .append('span')
    .text((d) => d)
    .style('margin-left', '5px')
    .style('font-size', '12px');
}
