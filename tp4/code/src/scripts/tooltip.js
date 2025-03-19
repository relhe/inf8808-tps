import * as d3 from 'd3';

export function getContents(d) {
  return `
    <div class="tooltip-content">
      <strong>Country:</strong> ${d['Country Name']}<br/>
      <strong>Population:</strong> ${d3.format(',')(d.Population)}<br/>
      <strong>GDP:</strong> ${d3.format('$.2f')(d.GDP)} (USD)<br/>
      <strong>CO2 emissions:</strong> ${d3.format('.2f')(d.CO2)} metric tonnes
    </div>
  `;
}