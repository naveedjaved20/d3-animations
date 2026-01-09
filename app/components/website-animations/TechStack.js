'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function TechStack() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 500

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const techs = [
      { name: 'React', x: 150, y: 150 },
      { name: 'Node.js', x: 300, y: 200 },
      { name: 'Python', x: 450, y: 150 },
      { name: 'AWS', x: 600, y: 200 },
      { name: 'Docker', x: 750, y: 150 },
    ]

    // Draw connections
    for (let i = 0; i < techs.length - 1; i++) {
      const line = svg
        .append('line')
        .attr('x1', techs[i].x)
        .attr('y1', techs[i].y)
        .attr('x2', techs[i].x)
        .attr('y2', techs[i].y)
        .attr('stroke', '#667eea')
        .attr('stroke-width', 2)
        .attr('opacity', 0.3)

      line
        .transition()
        .duration(1000)
        .delay(i * 200)
        .attr('x2', techs[i + 1].x)
        .attr('y2', techs[i + 1].y)
    }

    // Draw tech logos/circles
    techs.forEach((tech, i) => {
      const group = svg.append('g').attr('opacity', 0)

      const circle = group
        .append('circle')
        .attr('cx', tech.x)
        .attr('cy', tech.y)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      circle
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('r', 40)

      group
        .append('text')
        .attr('x', tech.x)
        .attr('y', tech.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(tech.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(600 + i * 200)
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
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '900px' }}></svg>
    </div>
  )
}
