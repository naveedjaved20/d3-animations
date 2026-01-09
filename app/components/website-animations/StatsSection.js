'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function StatsSection() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 400

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
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .text('Company Statistics')

    const stats = [
      { label: 'Years Experience', value: 15, icon: '📅', color: '#667eea', x: 200 },
      { label: 'Happy Clients', value: 500, suffix: '+', icon: '😊', color: '#764ba2', x: 400 },
      { label: 'Projects Completed', value: 1000, suffix: '+', icon: '🚀', color: '#f093fb', x: 600 },
      { label: 'Team Members', value: 50, suffix: '+', icon: '👥', color: '#4facfe', x: 800 },
    ]

    stats.forEach((stat, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Icon
      group
        .append('text')
        .attr('x', stat.x)
        .attr('y', 150)
        .attr('text-anchor', 'middle')
        .style('font-size', '60px')
        .style('opacity', 0)
        .text(stat.icon)
        .transition()
        .duration(600)
        .delay(i * 200)
        .style('opacity', 1)
        .on('start', function() {
          d3.select(this)
            .transition()
            .duration(400)
            .attr('y', 120)
            .transition()
            .duration(400)
            .attr('y', 150)
        })

      // Value
      const valueText = group
        .append('text')
        .attr('x', stat.x)
        .attr('y', 220)
        .attr('text-anchor', 'middle')
        .style('font-size', '48px')
        .style('font-weight', 'bold')
        .style('fill', stat.color)
        .text('0')
        .style('opacity', 0)

      valueText
        .transition()
        .duration(2000)
        .delay(600 + i * 200)
        .tween('text', function() {
          const interpolate = d3.interpolate(0, stat.value)
          return function(t) {
            this.textContent = Math.round(interpolate(t)) + (stat.suffix || '')
          }
        })
        .style('opacity', 1)

      // Label
      group
        .append('text')
        .attr('x', stat.x)
        .attr('y', 260)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(stat.label)
        .transition()
        .duration(500)
        .delay(1000 + i * 200)
        .style('opacity', 1)

      group
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
