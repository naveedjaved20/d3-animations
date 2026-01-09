'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AnimatedLineChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 500
    const margin = { top: 40, right: 40, bottom: 60, left: 60 }

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Animated Line Chart with Area Fill')

    // Generate data
    const data = Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: Math.sin(i / 3) * 50 + 50 + Math.random() * 20,
    }))

    const xScale = d3
      .scaleLinear()
      .domain([0, 19])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top])

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .style('font-size', '12px')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1)

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .style('font-size', '12px')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1)

    // Area generator
    const area = d3
      .area()
      .x(d => xScale(d.x))
      .y0(height - margin.bottom)
      .y1(d => yScale(d.y))
      .curve(d3.curveMonotoneX)

    // Line generator
    const line = d3
      .line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX)

    // Draw area
    const areaPath = svg
      .append('path')
      .datum(data)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', area)
      .style('opacity', 0)

    // Gradient definition
    const defs = svg.append('defs')
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#667eea').attr('stop-opacity', 0.6)
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#667eea').attr('stop-opacity', 0.1)

    // Animate area
    const totalLength = areaPath.node().getTotalLength()
    areaPath
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .delay(800)
      .attr('stroke-dashoffset', 0)
      .style('opacity', 1)

    // Draw line
    const linePath = svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#667eea')
      .attr('stroke-width', 3)
      .attr('d', line)
      .style('opacity', 0)

    // Animate line
    const lineLength = linePath.node().getTotalLength()
    linePath
      .attr('stroke-dasharray', lineLength + ' ' + lineLength)
      .attr('stroke-dashoffset', lineLength)
      .transition()
      .duration(2000)
      .delay(1000)
      .attr('stroke-dashoffset', 0)
      .style('opacity', 1)

    // Draw dots
    const dots = svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 0)
      .attr('fill', '#667eea')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')

    dots
      .transition()
      .duration(400)
      .delay((d, i) => 1500 + i * 50)
      .attr('r', 5)
      .on('end', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6)
          .transition()
          .duration(200)
          .attr('r', 5)
      })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '900px' }}></svg>
    </div>
  )
}
