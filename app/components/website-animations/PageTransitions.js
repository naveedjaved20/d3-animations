'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PageTransitions() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const transitions = [
      { name: 'Fade + Slide', type: 'fade-slide' },
      { name: 'Direction Aware', type: 'direction' },
      { name: 'Mask Reveal', type: 'mask' },
      { name: 'Blur Crossfade', type: 'blur' },
    ]

    transitions.forEach((transition, i) => {
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', (i % 2) * 480 + 'px')
        .style('top', Math.floor(i / 2) * 250 + 'px')
        .style('width', '450px')
        .style('height', '220px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        .style('padding', '30px')
        .style('opacity', 0)
        .style('transform', 'translateY(30px)')
        .style('cursor', 'pointer')
        .on('click', function() {
          // Simulate transition
          d3.select(this)
            .style('opacity', 0)
            .style('transform', 'translateY(-30px)')
            .transition()
            .duration(600)
            .style('opacity', 1)
            .style('transform', 'translateY(0px)')
        })

      card
        .append('div')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('margin-bottom', '15px')
        .text(transition.name)

      card
        .append('div')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('line-height', '1.6')
        .text('Click to see transition effect')

      // Animate entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .delay(i * 150)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')
      }, 100)
    })
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
      <div ref={containerRef} style={{ position: 'relative', width: '960px', height: '500px' }}></div>
    </div>
  )
}
