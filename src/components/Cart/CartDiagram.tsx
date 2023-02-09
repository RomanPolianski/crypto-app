import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toUSD } from '../../utils/formatters/toUSDformatter';

const CartDiagram = () => {
  const diagramData = useSelector((state: RootState) => state.cart.diagramData);
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);

  const pieChart = useRef();

  useEffect(() => {
    //@ts-ignore
    const piedata = d3.pie().value((d) => d.value)(diagramData);
    const width = 450,
      height = 450,
      margin = 70;
    const radius = Math.min(width, height) / 2 - margin;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);
    const colors = d3
      .scaleOrdinal()
      .domain([
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
      ])
      .range(d3.schemePaired);

    const svg = d3
      //@ts-ignore
      .select(pieChart.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'transparent')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const tooldiv = d3
      .select('#chartArea')
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'white');

    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg
      .selectAll('allSlices')
      .data(piedata)
      .join('path')
      //@ts-ignore
      .attr('d', arc)
      //@ts-ignore
      .attr('fill', (d) => colors(d.data.value))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)

      .on('mouseover', (e, d) => {
        tooldiv
          .style('visibility', 'visible')
          //@ts-ignore
          .text(`${d.data.name}:` + ` ${toUSD(d.data.value)}`);
      })
      .on('mousemove', (e, d) => {
        tooldiv
          .style('top', e.pageY - 50 + 'px')
          .style('left', e.pageX - 50 + 'px');
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden');
      });

    svg
      .selectAll('allPolylines')
      .data(piedata)
      .join('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      //@ts-ignore
      .attr('points', function (d) {
        //@ts-ignore
        const posA = arc.centroid(d);
        //@ts-ignore
        const posB = outerArc.centroid(d);
        //@ts-ignore
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    svg
      .selectAll('allLabels')
      .data(piedata)
      .join('text')
      //@ts-ignore
      .text((d) => d.data.name)
      .attr('transform', function (d) {
        //@ts-ignore
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }, [cartTotal, diagramData]);

  return (
    <div id="chartArea">
      {
        // @ts-ignore */
        <svg ref={pieChart}></svg>
      }
    </div>
  );
};

export default CartDiagram;
