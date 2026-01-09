'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SkillBars() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const skills = [
      { name: 'JavaScript', level: 95 },
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 88 },
    ]

    skills.forEach((skill, i) => {
      const skillDiv = container
        .append('div')
        .style('width', '700px')
        .style('margin-bottom', '25px')
        .style('opacity', 0)
        .style('transform', 'translateX(-30px)')

      skillDiv
        .append('div')
        .style('font-size', '16px')
        .style('font-weight', '600')
        .style('color', '#333')
        .style('margin-bottom', '8px')
        .text(skill.name)

      const barContainer = skillDiv
        .append('div')
        .style('width', '100%')
        .style('height', '30px')
        .style('background', '#e0e0e0')
        .style('border-radius', '15px')
        .style('overflow', 'hidden')
        .style('position', 'relative')

      const progressBar = barContainer
        .append('div')
        .style('position', 'absolute')
        .style('left', '0')
        .style('top', '0')
        .style('height', '100%')
        .style('width', '0%')
        .style('background', 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)')
        .style('border-radius', '15px')

      const percentText = barContainer
        .append('div')
        .style('position', 'absolute')
        .style('right', '15px')
        .style('top', '50%')
        .style('transform', 'translateY(-50%)')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .text('0%')

      // Animate entrance and progress
      setTimeout(() => {
        skillDiv
          .transition()
          .duration(600)
          .delay(i * 200)
          .style('opacity', 1)
          .style('transform', 'translateX(0px)')

        progressBar
          .transition()
          .duration(2000)
          .delay(600 + i * 200)
          .style('width', skill.level + '%')

        percentText
          .transition()
          .duration(2000)
          .delay(600 + i * 200)
          .tween('text', function() {
            const interpolate = d3.interpolate(0, skill.level)
            return function(t) {
              this.textContent = Math.round(interpolate(t)) + '%'
            }
          })
      }, 100)
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '700px' }}></div>
    </div>
  )
}
