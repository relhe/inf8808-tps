import * as d3 from 'd3';

export function setRadiusScale(data) {
  const allPopulations = [...data['2000'], ...data['2015']].map(d => d.Population);
  return d3.scaleLinear()
    .domain(d3.extent(allPopulations))
    .range([5, 20]);
}

export function setColorScale(data) {
  const continents = Array.from(new Set(
    [...data['2000'], ...data['2015']].map(d => d.Continent)
  ));
  return d3.scaleOrdinal()
    .domain(continents.sort())
    .range(d3.schemeSet1);
}

export function setXScale(width, data) {
  const allGDP = [...data['2000'], ...data['2015']].map(d => d.GDP);
  return d3.scaleLog()
    .domain(d3.extent(allGDP))
    .range([0, width])
    .nice();
}

export function setYScale(height, data) {
  const allCO2 = [...data['2000'], ...data['2015']].map(d => d.CO2);
  return d3.scaleLog()
    .domain(d3.extent(allCO2))
    .range([height, 0])
    .nice();
}