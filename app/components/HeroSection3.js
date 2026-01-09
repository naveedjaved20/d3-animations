'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function HeroSection3() {
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
      .style('background', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Geometric shapes animation
    const shapes = [
      { type: 'circle', x: 150, y: 100, size: 60, delay: 0 },
      { type: 'square', x: 300, y: 150, size: 80, delay: 200 },
      { type: 'triangle', x: 500, y: 120, size: 70, delay: 400 },
      { type: 'circle', x: 700, y: 180, size: 50, delay: 600 },
      { type: 'square', x: 850, y: 100, size: 65, delay: 800 },
    ]

    shapes.forEach(shape => {
      const group = svg.append('g').attr('opacity', 0)

      if (shape.type === 'circle') {
        group
          .append('circle')
          .attr('cx', shape.x)
          .attr('cy', shape.y)
          .attr('r', 0)
          .attr('fill', 'white')
          .attr('opacity', 0.2)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .transition()
          .duration(800)
          .delay(shape.delay)
          .attr('r', shape.size)
      } else if (shape.type === 'square') {
        group
          .append('rect')
          .attr('x', shape.x - shape.size / 2)
          .attr('y', shape.y - shape.size / 2)
          .attr('width', 0)
          .attr('height', 0)
          .attr('fill', 'white')
          .attr('opacity', 0.2)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .attr('transform', 'rotate(45 ' + shape.x + ' ' + shape.y + ')')
          .transition()
          .duration(800)
          .delay(shape.delay)
          .attr('width', shape.size)
          .attr('height', shape.size)
      } else if (shape.type === 'triangle') {
        const points = [
          [shape.x, shape.y - shape.size / 2],
          [shape.x - shape.size / 2, shape.y + shape.size / 2],
          [shape.x + shape.size / 2, shape.y + shape.size / 2],
        ]
        group
          .append('polygon')
          .attr('points', '0,0 0,0 0,0')
          .attr('fill', 'white')
          .attr('opacity', 0.2)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .transition()
          .duration(800)
          .delay(shape.delay)
          .attr('points', points.map(p => p.join(',')).join(' '))
      }

      group
        .transition()
        .duration(300)
        .delay(shape.delay)
        .attr('opacity', 1)
    })

    // Main text
    const mainText = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '46px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('opacity', 0)
      .text('Transform Your Vision Into Reality')

    mainText
      .transition()
      .duration(1000)
      .delay(1200)
      .style('opacity', 1)

    // CTA Button (visual representation)
    const button = svg
      .append('g')
      .attr('opacity', 0)
      .attr('transform', `translate(${width / 2}, ${height / 2 + 80})`)

    button
      .append('rect')
      .attr('x', -80)
      .attr('y', -20)
      .attr('width', 0)
      .attr('height', 40)
      .attr('rx', 20)
      .attr('fill', 'white')
      .transition()
      .duration(600)
      .delay(2000)
      .attr('width', 160)

    button
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '16px')
      .style('font-weight', '600')
      .style('fill', '#4facfe')
      .text('Get Started')

    button
      .transition()
      .duration(300)
      .delay(2000)
      .attr('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
