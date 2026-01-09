'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AgileFlow() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1200
    const height = 700

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
      .text('Agile Development Process Flow')

    // Define Agile phases
    const phases = [
      {
        id: 'planning',
        name: 'Sprint Planning',
        description: 'Define goals & tasks',
        x: 200,
        y: 150,
        color: '#667eea',
        icon: '📋',
      },
      {
        id: 'development',
        name: 'Development',
        description: 'Build features',
        x: 500,
        y: 150,
        color: '#764ba2',
        icon: '💻',
      },
      {
        id: 'testing',
        name: 'Testing',
        description: 'QA & validation',
        x: 800,
        y: 150,
        color: '#f093fb',
        icon: '🧪',
      },
      {
        id: 'review',
        name: 'Sprint Review',
        description: 'Demo & feedback',
        x: 1100,
        y: 150,
        color: '#4facfe',
        icon: '👁️',
      },
      {
        id: 'retrospective',
        name: 'Retrospective',
        description: 'Improve process',
        x: 650,
        y: 350,
        color: '#00f2fe',
        icon: '🔄',
      },
      {
        id: 'backlog',
        name: 'Product Backlog',
        description: 'Prioritized items',
        x: 200,
        y: 500,
        color: '#f5576c',
        icon: '📝',
      },
    ]

    // Draw connections
    const connections = [
      { from: 'planning', to: 'development' },
      { from: 'development', to: 'testing' },
      { from: 'testing', to: 'review' },
      { from: 'review', to: 'retrospective' },
      { from: 'retrospective', to: 'backlog' },
      { from: 'backlog', to: 'planning' },
      { from: 'retrospective', to: 'planning' },
    ]

    connections.forEach((conn, i) => {
      const fromPhase = phases.find(p => p.id === conn.from)
      const toPhase = phases.find(p => p.id === conn.to)

      if (fromPhase && toPhase) {
        const line = svg
          .append('line')
          .attr('x1', fromPhase.x)
          .attr('y1', fromPhase.y)
          .attr('x2', fromPhase.x)
          .attr('y2', fromPhase.y)
          .attr('stroke', '#667eea')
          .attr('stroke-width', 3)
          .attr('marker-end', 'url(#arrowhead)')
          .attr('opacity', 0.4)

        line
          .transition()
          .duration(1000)
          .delay(i * 200)
          .attr('x2', toPhase.x)
          .attr('y2', toPhase.y)
      }
    })

    // Arrow marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 5)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#667eea')

    // Draw phases
    phases.forEach((phase, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Phase box
      const box = group
        .append('rect')
        .attr('x', phase.x - 100)
        .attr('y', phase.y - 80)
        .attr('width', 0)
        .attr('height', 120)
        .attr('rx', 15)
        .attr('fill', phase.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      box
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('width', 200)

      // Icon
      group
        .append('text')
        .attr('x', phase.x)
        .attr('y', phase.y - 30)
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
        .attr('y', phase.y + 10)
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

      // Description
      group
        .append('text')
        .attr('x', phase.x)
        .attr('y', phase.y + 35)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'rgba(255,255,255,0.9)')
        .style('opacity', 0)
        .text(phase.description)
        .transition()
        .duration(400)
        .delay(800 + i * 200)
        .style('opacity', 1)

      group
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })

    // Sprint cycle label
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', '600')
      .style('fill', '#667eea')
      .text('Continuous Iterative Cycle')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(2000)
      .style('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1200px' }}></svg>
    </div>
  )
}
