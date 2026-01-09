'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PieChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 600
    const height = 600
    const radius = Math.min(width, height) / 2 - 40

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const data = [
      { label: 'Web Development', value: 35 },
      { label: 'Mobile Apps', value: 25 },
      { label: 'Data Analytics', value: 20 },
      { label: 'Consulting', value: 15 },
      { label: 'Other', value: 5 },
    ]

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const pie = d3.pie().value(d => d.value).sort(null)

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius)

    const arcHover = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius + 20)

    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    const paths = arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover)
        tooltip.style('opacity', 1)
      })
      .on('mousemove', function(event, d) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`<strong>${d.data.label}</strong><br/>${d.data.value}%`)
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc)
        tooltip.style('opacity', 0)
      })

    // Animate pie slices
    paths
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return function(t) {
          return arc(interpolate(t))
        }
      })

    // Add labels
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(d => d.data.value + '%')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay(500)
      .style('opacity', 1)

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 180}, 40)`)

    const legendItems = legend
      .selectAll('.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)

    legendItems
      .append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d, i) => color(i))

    legendItems
      .append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', '12px')
      .text(d => d.label)

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Service Distribution')

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '8px 12px')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000)

    return () => {
      tooltip.remove()
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
