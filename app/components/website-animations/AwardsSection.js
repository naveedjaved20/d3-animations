'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AwardsSection() {
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
      .text('Awards & Recognition')

    const awards = [
      { year: '2024', title: 'Best Tech Company', icon: '🏆', x: 200, y: 200 },
      { year: '2023', title: 'Innovation Award', icon: '⭐', x: 500, y: 200 },
      { year: '2022', title: 'Excellence in Design', icon: '🎨', x: 800, y: 200 },
      { year: '2021', title: 'Top Performer', icon: '💎', x: 350, y: 350 },
      { year: '2020', title: 'Rising Star', icon: '🌟', x: 650, y: 350 },
    ]

    awards.forEach((award, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Award circle
      const circle = group
        .append('circle')
        .attr('cx', award.x)
        .attr('cy', award.y)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('opacity', 0.1)
        .attr('stroke', '#667eea')
        .attr('stroke-width', 3)

      circle
        .transition()
        .duration(800)
        .delay(i * 200)
        .attr('r', 70)

      // Icon
      group
        .append('text')
        .attr('x', award.x)
        .attr('y', award.y - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '50px')
        .style('opacity', 0)
        .text(award.icon)
        .transition()
        .duration(500)
        .delay(400 + i * 200)
        .style('opacity', 1)

      // Year
      group
        .append('text')
        .attr('x', award.x)
        .attr('y', award.y + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', '#667eea')
        .style('opacity', 0)
        .text(award.year)
        .transition()
        .duration(500)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Title
      group
        .append('text')
        .attr('x', award.x)
        .attr('y', award.y + 75)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(award.title)
        .transition()
        .duration(500)
        .delay(800 + i * 200)
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
