/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale(scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  scale
    .domain(data.map((d) => d.Act))
    .range([0, width])
    .padding(0.2);
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale(scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  const maxLineCount = d3.max(data, (d) =>
    d.Players.reduce((sum, player) => sum + player.Count, 0),
  );
  scale.domain([0, maxLineCount]).range([height, 0]);
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups(data, x) {
  // TODO : Create the groups
  // d3.select('#graph-g');
  const graph = d3.select('#graph-g');

  // Create groups for each act
  const groups = graph
    .selectAll('.group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'group')
    .attr('transform', (d) => `translate(${x(d.Act)}, 0)`);

  return groups;
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars(y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  // d3.select('#graph-g');
  const groups = d3.select('#graph-g').selectAll('.group');

  // Draw bars inside the groups
  groups
    .selectAll('rect')
    .data((d) => d.Players)
    .enter()
    .append('rect')
    .attr('x', (d) => xSubgroup(d.Player))
    .attr('y', (d) => y(d.Count))
    .attr('width', xSubgroup.bandwidth())
    .attr('height', (d) => height - y(d.Count))
    .attr('fill', (d) => color(d.Player))
    .on('mouseover', function (_, d) {
      tip.show({
        group: `Act ${d3.select(this.parentNode).datum().Act}`,
        player: d.Player,
        lines: d.Count,
      }, this);
    })
    .on('mouseout', tip.hide);
}
