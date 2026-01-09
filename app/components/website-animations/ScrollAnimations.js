'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ScrollAnimations() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Simulate scroll-triggered animations
    const sections = [
      { title: 'Section 1', color: '#667eea' },
      { title: 'Section 2', color: '#764ba2' },
      { title: 'Section 3', color: '#f093fb' },
      { title: 'Section 4', color: '#4facfe' },
    ]

    sections.forEach((section, i) => {
      const sectionDiv = container
        .append('div')
        .style('position', 'absolute')
        .style('left', '0px')
        .style('top', (i * 120) + 'px')
        .style('width', '100%')
        .style('height', '100px')
        .style('background', section.color)
        .style('border-radius', '10px')
        .style('padding', '20px')
        .style('opacity', 0)
        .style('transform', 'translateX(-50px)')

      sectionDiv
        .append('div')
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .style('color', 'white')
        .text(section.title)

      sectionDiv
        .append('div')
        .style('font-size', '14px')
        .style('color', 'rgba(255,255,255,0.9)')
        .style('margin-top', '10px')
        .text('Scroll-triggered reveal animation')

      // Animate on "scroll" (simulated with delay)
      setTimeout(() => {
        sectionDiv
          .transition()
          .duration(800)
          .delay(i * 200)
          .style('opacity', 1)
          .style('transform', 'translateX(0px)')
      }, 500 + i * 300)
    })

    // Progress indicator
    const progressBar = container
      .append('div')
      .style('position', 'absolute')
      .style('top', '0px')
      .style('left', '0px')
      .style('width', '0%')
      .style('height', '4px')
      .style('background', '#667eea')
      .style('border-radius', '2px')

    progressBar
      .transition()
      .duration(2000)
      .delay(1000)
      .style('width', '100%')
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '900px', height: '500px' }}></div>
    </div>
  )
}
