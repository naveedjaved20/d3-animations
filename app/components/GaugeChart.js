'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function GaugeChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 500

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
      .text('Performance Gauges')

    const gauges = [
      { label: 'Performance', value: 85, color: '#667eea', x: 200 },
      { label: 'Efficiency', value: 72, color: '#764ba2', x: 500 },
      { label: 'Quality', value: 90, color: '#f093fb', x: 800 },
    ]

    gauges.forEach((gauge, i) => {
      const g = svg
        .append('g')
        .attr('transform', `translate(${gauge.x}, ${height / 2})`)

      const radius = 80
      const arc = d3
        .arc()
        .innerRadius(radius - 20)
        .outerRadius(radius)
        .startAngle(-Math.PI / 2)

      // Background arc
      g.append('path')
        .datum({ endAngle: Math.PI / 2 })
        .attr('d', arc)
        .attr('fill', '#e0e0e0')
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(i * 200)
        .style('opacity', 1)

      // Value arc
      const valueArc = g
        .append('path')
        .datum({ endAngle: -Math.PI / 2 })
        .attr('d', arc)
        .attr('fill', gauge.color)
        .style('opacity', 0)

      valueArc
        .transition()
        .duration(2000)
        .delay(500 + i * 200)
        .attrTween('d', function() {
          const interpolate = d3.interpolate(-Math.PI / 2, (-Math.PI / 2) + (Math.PI * gauge.value) / 100)
          return function(t) {
            return arc({ endAngle: interpolate(t) })
          }
        })
        .style('opacity', 0.8)

      // Needle
      const needle = g
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -radius + 10)
        .attr('stroke', '#333')
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .style('opacity', 0)

      needle
        .transition()
        .duration(2000)
        .delay(500 + i * 200)
        .attrTween('transform', function() {
          const interpolate = d3.interpolate(-90, -90 + (180 * gauge.value) / 100)
          return function(t) {
            return `rotate(${interpolate(t)})`
          }
        })
        .style('opacity', 1)

      // Center circle
      g.append('circle')
        .attr('r', 8)
        .attr('fill', '#333')
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(1000 + i * 200)
        .style('opacity', 1)

      // Value text
      const valueText = g
        .append('text')
        .attr('y', radius + 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '32px')
        .style('font-weight', 'bold')
        .style('fill', gauge.color)
        .text('0')
        .style('opacity', 0)

      valueText
        .transition()
        .duration(2000)
        .delay(500 + i * 200)
        .tween('text', function() {
          const interpolate = d3.interpolate(0, gauge.value)
          return function(t) {
            this.textContent = Math.round(interpolate(t))
          }
        })
        .style('opacity', 1)

      // Label
      g.append('text')
        .attr('y', radius + 55)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(gauge.label)
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(1000 + i * 200)
        .style('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
