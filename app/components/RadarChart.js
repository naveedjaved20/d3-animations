'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function RadarChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 800
    const radius = Math.min(width, height) / 2 - 80

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
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Multi-Dimensional Comparison (Radar)')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const categories = ['Design', 'Speed', 'Quality', 'Support', 'Innovation', 'Value']
    const data = [85, 90, 75, 88, 82, 80]
    const maxValue = 100

    const angleSlice = (Math.PI * 2) / categories.length

    // Scales
    const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius])

    // Draw grid circles
    for (let i = 1; i <= 5; i++) {
      g.append('circle')
        .attr('r', (radius / 5) * i)
        .attr('fill', 'none')
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 1)
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(i * 50)
        .style('opacity', 1)
    }

    // Draw grid lines
    categories.forEach((category, i) => {
      const angle = i * angleSlice - Math.PI / 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0)
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 1)
        .transition()
        .duration(500)
        .delay(300 + i * 50)
        .attr('x2', x)
        .attr('y2', y)
    })

    // Draw labels
    categories.forEach((category, i) => {
      const angle = i * angleSlice - Math.PI / 2
      const labelRadius = radius + 30
      const x = Math.cos(angle) * labelRadius
      const y = Math.sin(angle) * labelRadius

      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '14px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(category)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(600 + i * 50)
        .style('opacity', 1)
    })

    // Draw data polygon
    const line = d3
      .lineRadial()
      .angle((d, i) => i * angleSlice - Math.PI / 2)
      .radius(d => rScale(d))
      .curve(d3.curveLinearClosed)

    const path = g
      .append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', '#667eea')
      .attr('fill-opacity', 0.3)
      .attr('stroke', '#667eea')
      .attr('stroke-width', 3)
      .style('opacity', 0)

    // Animate path
    const totalLength = path.node().getTotalLength()
    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .delay(1000)
      .attr('stroke-dashoffset', 0)
      .style('opacity', 1)

    // Draw data points
    data.forEach((value, i) => {
      const angle = i * angleSlice - Math.PI / 2
      const r = rScale(value)
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r

      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .transition()
        .duration(600)
        .delay(1500 + i * 100)
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 6)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '800px' }}></svg>
    </div>
  )
}
