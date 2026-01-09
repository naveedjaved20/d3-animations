'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function LeanStartup() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 600

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
      .style('font-size', '28px')
      .style('font-weight', 'bold')
      .text('Lean Startup Methodology')

    const centerX = width / 2
    const centerY = height / 2

    // Build-Measure-Learn loop
    const stages = [
      { name: 'Build', icon: '🔨', angle: -Math.PI / 2, color: '#667eea' },
      { name: 'Measure', icon: '📊', angle: Math.PI / 6, color: '#764ba2' },
      { name: 'Learn', icon: '💡', angle: (5 * Math.PI) / 6, color: '#f093fb' },
    ]

    const radius = 150

    // Draw circular connections
    stages.forEach((stage, i) => {
      const nextStage = stages[(i + 1) % stages.length]
      const startAngle = stage.angle
      const endAngle = nextStage.angle

      const arc = d3
        .arc()
        .innerRadius(radius - 20)
        .outerRadius(radius)
        .startAngle(startAngle)
        .endAngle(startAngle)

      const path = svg
        .append('path')
        .attr('transform', `translate(${centerX}, ${centerY})`)
        .attr('d', arc)
        .attr('fill', 'none')
        .attr('stroke', stage.color)
        .attr('stroke-width', 4)
        .attr('opacity', 0.4)

      path
        .transition()
        .duration(1500)
        .delay(i * 300)
        .attrTween('d', function() {
          const interpolate = d3.interpolate(startAngle, endAngle)
          return function(t) {
            return arc.endAngle(interpolate(t))()
          }
        })
    })

    // Draw stages
    stages.forEach((stage, i) => {
      const x = centerX + Math.cos(stage.angle) * radius
      const y = centerY + Math.sin(stage.angle) * radius

      const group = svg.append('g').attr('opacity', 0)

      // Stage circle
      const circle = group
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 0)
        .attr('fill', stage.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 4)

      circle
        .transition()
        .duration(600)
        .delay(500 + i * 300)
        .attr('r', 60)

      // Icon
      group
        .append('text')
        .attr('x', x)
        .attr('y', y - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '35px')
        .style('opacity', 0)
        .text(stage.icon)
        .transition()
        .duration(400)
        .delay(700 + i * 300)
        .style('opacity', 1)

      // Name
      group
        .append('text')
        .attr('x', x)
        .attr('y', y + 90)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .style('opacity', 0)
        .text(stage.name)
        .transition()
        .duration(400)
        .delay(900 + i * 300)
        .style('opacity', 1)

      group
        .transition()
        .duration(300)
        .delay(500 + i * 300)
        .attr('opacity', 1)
    })

    // Center label
    svg
      .append('text')
      .attr('x', centerX)
      .attr('y', centerY)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '22px')
      .style('font-weight', 'bold')
      .style('fill', '#667eea')
      .text('Continuous Loop')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(2000)
      .style('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
