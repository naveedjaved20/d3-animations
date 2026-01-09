'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function DevOpsPipeline() {
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
      .text('DevOps CI/CD Pipeline')

    const stages = [
      { name: 'Code', icon: '📝', x: 150, color: '#667eea' },
      { name: 'Build', icon: '🔨', x: 350, color: '#764ba2' },
      { name: 'Test', icon: '🧪', x: 550, color: '#f093fb' },
      { name: 'Deploy', icon: '🚀', x: 750, color: '#4facfe' },
      { name: 'Monitor', icon: '📊', x: 950, color: '#00f2fe' },
    ]

    // Draw pipeline flow
    stages.forEach((stage, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Stage box
      const box = group
        .append('rect')
        .attr('x', stage.x - 70)
        .attr('y', height / 2 - 60)
        .attr('width', 0)
        .attr('height', 120)
        .attr('rx', 10)
        .attr('fill', stage.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      box
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('width', 140)

      // Icon
      group
        .append('text')
        .attr('x', stage.x)
        .attr('y', height / 2 - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '40px')
        .style('opacity', 0)
        .text(stage.icon)
        .transition()
        .duration(400)
        .delay(400 + i * 200)
        .style('opacity', 1)

      // Name
      group
        .append('text')
        .attr('x', stage.x)
        .attr('y', height / 2 + 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .style('opacity', 0)
        .text(stage.name)
        .transition()
        .duration(400)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Connecting arrows
      if (i < stages.length - 1) {
        const arrow = svg
          .append('polygon')
          .attr('points', `${stage.x + 70},${height / 2} ${stage.x + 70},${height / 2} ${stage.x + 70},${height / 2}`)
          .attr('fill', stage.color)
          .attr('opacity', 0)

        arrow
          .transition()
          .duration(800)
          .delay(800 + i * 200)
          .attr('points', `${stage.x + 70},${height / 2 - 20} ${stages[i + 1].x - 70},${height / 2} ${stage.x + 70},${height / 2 + 20}`)
          .attr('opacity', 0.6)
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
