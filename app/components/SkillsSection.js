'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SkillsSection() {
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
      .style('fill', '#333')
      .text('Our Skills & Technologies')

    const skills = [
      { name: 'JavaScript', level: 95, color: '#667eea' },
      { name: 'React', level: 90, color: '#764ba2' },
      { name: 'Node.js', level: 85, color: '#f093fb' },
      { name: 'Python', level: 88, color: '#4facfe' },
      { name: 'Design', level: 92, color: '#00f2fe' },
      { name: 'Cloud', level: 80, color: '#f5576c' },
    ]

    skills.forEach((skill, i) => {
      const y = 100 + i * 60
      const barWidth = 600
      const x = (width - barWidth) / 2

      // Skill name
      svg
        .append('text')
        .attr('x', x - 10)
        .attr('y', y + 5)
        .attr('text-anchor', 'end')
        .style('font-size', '16px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(skill.name)

      // Background bar
      svg
        .append('rect')
        .attr('x', x)
        .attr('y', y - 15)
        .attr('width', barWidth)
        .attr('height', 30)
        .attr('rx', 15)
        .attr('fill', '#e0e0e0')

      // Progress bar
      const progressBar = svg
        .append('rect')
        .attr('x', x)
        .attr('y', y - 15)
        .attr('width', 0)
        .attr('height', 30)
        .attr('rx', 15)
        .attr('fill', skill.color)

      progressBar
        .transition()
        .duration(1500)
        .delay(i * 150)
        .attr('width', (skill.level / 100) * barWidth)

      // Percentage text
      const percentText = svg
        .append('text')
        .attr('x', x + barWidth + 15)
        .attr('y', y + 5)
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', skill.color)
        .text('0%')

      percentText
        .transition()
        .duration(1500)
        .delay(i * 150)
        .tween('text', function() {
          const interpolate = d3.interpolate(0, skill.level)
          return function(t) {
            this.textContent = Math.round(interpolate(t)) + '%'
          }
        })
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
