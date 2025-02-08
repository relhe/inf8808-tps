/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents(d) {
  return `
    <div id="tooltip-title">
      ${d.player}
    </div>
    <div class="tooltip-value">
      ${d.lines} ${d.lines === 1 ? 'line' : 'lines'}
    </div>
  `;
}