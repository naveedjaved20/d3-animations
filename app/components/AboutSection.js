'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AboutSection() {
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
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('About Us')

    // Animated timeline/experience bars
    const experiences = [
      { year: '2020', text: 'Company Founded', progress: 100 },
      { year: '2021', text: 'First Major Milestone', progress: 100 },
      { year: '2022', text: 'Team Expansion', progress: 100 },
      { year: '2023', text: 'Global Recognition', progress: 100 },
      { year: '2024', text: 'Industry Leader', progress: 85 },
    ]

    experiences.forEach((exp, i) => {
      const y = 120 + i * 70
      const x = 150

      // Year circle
      const circle = svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('stroke', 'white')
        .attr('stroke-width', 3)

      circle
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('r', 25)

      // Year text
      svg
        .append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .style('opacity', 0)
        .text(exp.year)
        .transition()
        .duration(300)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Connecting line
      if (i < experiences.length - 1) {
        svg
          .append('line')
          .attr('x1', x)
          .attr('y1', y + 25)
          .attr('x2', x)
          .attr('y2', y + 25)
          .attr('stroke', '#667eea')
          .attr('stroke-width', 3)
          .transition()
          .duration(400)
          .delay(800 + i * 200)
          .attr('y2', y + 45)
      }

      // Description
      svg
        .append('text')
        .attr('x', x + 60)
        .attr('y', y)
        .attr('dy', '.35em')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .style('opacity', 0)
        .text(exp.text)
        .transition()
        .duration(500)
        .delay(400 + i * 200)
        .style('opacity', 1)
    })

    // Stats on the right
    const stats = [
      { label: 'Team Members', value: 50, icon: '👥' },
      { label: 'Projects', value: 500, icon: '🚀' },
      { label: 'Countries', value: 25, icon: '🌍' },
    ]

    stats.forEach((stat, i) => {
      const x = 700
      const y = 150 + i * 100

      const statGroup = svg.append('g').attr('opacity', 0)

      // Icon
      statGroup
        .append('text')
        .attr('x', x)
        .attr('y', y - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '40px')
        .text(stat.icon)

      // Value
      const valueText = statGroup
        .append('text')
        .attr('x', x)
        .attr('y', y + 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '36px')
        .style('font-weight', 'bold')
        .style('fill', '#667eea')
        .text('0')

      valueText
        .transition()
        .duration(2000)
        .delay(1000 + i * 300)
        .tween('text', function() {
          const interpolate = d3.interpolate(0, stat.value)
          return function(t) {
            this.textContent = Math.round(interpolate(t))
          }
        })

      // Label
      statGroup
        .append('text')
        .attr('x', x)
        .attr('y', y + 45)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#666')
        .text(stat.label)

      statGroup
        .transition()
        .duration(500)
        .delay(1000 + i * 300)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
