'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ProcessSection() {
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
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .text('Our Process')

    const steps = [
      { number: 1, title: 'Discovery', desc: 'Understanding your needs', x: 150, y: 250 },
      { number: 2, title: 'Planning', desc: 'Creating the roadmap', x: 350, y: 250 },
      { number: 3, title: 'Development', desc: 'Building your solution', x: 550, y: 250 },
      { number: 4, title: 'Launch', desc: 'Going live', x: 750, y: 250 },
    ]

    // Draw connecting line
    const line = svg
      .append('line')
      .attr('x1', 200)
      .attr('y1', 250)
      .attr('x2', 200)
      .attr('y2', 250)
      .attr('stroke', '#667eea')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5,5')

    line
      .transition()
      .duration(2000)
      .delay(1000)
      .attr('x2', 800)

    steps.forEach((step, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Step circle
      const circle = group
        .append('circle')
        .attr('cx', step.x)
        .attr('cy', step.y)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('stroke', '#fff')
        .attr('stroke-width', 4)

      circle
        .transition()
        .duration(600)
        .delay(500 + i * 300)
        .attr('r', 40)

      // Step number
      group
        .append('text')
        .attr('x', step.x)
        .attr('y', step.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(step.number)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(800 + i * 300)
        .style('opacity', 1)

      // Title
      group
        .append('text')
        .attr('x', step.x)
        .attr('y', step.y + 70)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .style('opacity', 0)
        .text(step.title)
        .transition()
        .duration(400)
        .delay(1000 + i * 300)
        .style('opacity', 1)

      // Description
      group
        .append('text')
        .attr('x', step.x)
        .attr('y', step.y + 95)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(step.desc)
        .transition()
        .duration(400)
        .delay(1200 + i * 300)
        .style('opacity', 1)

      group
        .transition()
        .duration(300)
        .delay(500 + i * 300)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
