
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain(colorScale, data) {
  colorScale.domain([0, d3.max(data, d => d.Counts)]);
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects(data) {
  d3.select('#graph-g')
    .selectAll('.rect-group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'rect-group')
    .append('rect')
    .attr('class', 'rect');
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale(xScale, data, width, range) {
  const years = range(d3.min(data, d => d.Plantation_Year), d3.max(data, d => d.Plantation_Year));
  xScale.domain(years).range([0, width]);
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale(yScale, neighborhoodNames, height) {
  yScale.domain(neighborhoodNames.sort()).range([0, height]);
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis(xScale) {
  d3.select('.x.axis').call(d3.axisTop(xScale));
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis(yScale, width) {
  d3.select('.y.axis')
    .attr('transform', `translate(${width}, 5)`)
    .call(d3.axisRight(yScale));
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
export function rotateYTicks() {
  d3.select('.y.axis')
    .selectAll('text')
    .attr('transform', 'rotate(-30)')
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects(xScale, yScale, colorScale) {
  d3.selectAll('.rect')
    .attr('x', d => xScale(d.Plantation_Year))
    .attr('y', d => yScale(d.Arrond_Nom))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .attr('fill', d => colorScale(d.Counts));
}
