'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function WaterfallMethod() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1200
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
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '28px')
      .style('font-weight', 'bold')
      .text('Waterfall Methodology')

    const phases = [
      { name: 'Requirements', icon: '📋', x: 150, color: '#667eea' },
      { name: 'Design', icon: '🎨', x: 350, color: '#764ba2' },
      { name: 'Implementation', icon: '💻', x: 550, color: '#f093fb' },
      { name: 'Testing', icon: '🧪', x: 750, color: '#4facfe' },
      { name: 'Deployment', icon: '🚀', x: 950, color: '#00f2fe' },
      { name: 'Maintenance', icon: '🔧', x: 1150, color: '#f5576c' },
    ]

    phases.forEach((phase, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Waterfall block
      const block = group
        .append('rect')
        .attr('x', phase.x - 80)
        .attr('y', 100)
        .attr('width', 0)
        .attr('height', 300)
        .attr('fill', phase.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      block
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('width', 160)

      // Icon
      group
        .append('text')
        .attr('x', phase.x)
        .attr('y', 200)
        .attr('text-anchor', 'middle')
        .style('font-size', '40px')
        .style('opacity', 0)
        .text(phase.icon)
        .transition()
        .duration(400)
        .delay(400 + i * 200)
        .style('opacity', 1)

      // Name
      group
        .append('text')
        .attr('x', phase.x)
        .attr('y', 260)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .style('opacity', 0)
        .text(phase.name)
        .transition()
        .duration(400)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Connecting arrows (sequential)
      if (i < phases.length - 1) {
        const arrow = svg
          .append('polygon')
          .attr('points', `${phase.x + 80},${height / 2} ${phase.x + 80},${height / 2} ${phase.x + 80},${height / 2}`)
          .attr('fill', phase.color)
          .attr('opacity', 0)

        arrow
          .transition()
          .duration(800)
          .delay(800 + i * 200)
          .attr('points', `${phase.x + 80},${height / 2 - 15} ${phases[i + 1].x - 80},${height / 2} ${phase.x + 80},${height / 2 + 15}`)
          .attr('opacity', 0.8)
      }

      group
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1200px' }}></svg>
    </div>
  )
}
