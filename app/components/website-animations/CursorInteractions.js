'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function CursorInteractions() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Custom cursor
    const cursor = container
      .append('div')
      .style('position', 'absolute')
      .style('width', '20px')
      .style('height', '20px')
      .style('border-radius', '50%')
      .style('background', 'rgba(102, 126, 234, 0.5)')
      .style('border', '2px solid #667eea')
      .style('pointer-events', 'none')
      .style('transform', 'translate(-50%, -50%)')
      .style('z-index', '1000')
      .style('opacity', 0)

    container.on('mousemove', function(event) {
      const [x, y] = d3.pointer(event)
      cursor
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('opacity', 1)
    })

    container.on('mouseleave', () => {
      cursor.style('opacity', 0)
    })

    // Magnetic buttons
    const buttons = [
      { text: 'Magnetic Button 1', x: 200, y: 200 },
      { text: 'Magnetic Button 2', x: 500, y: 250 },
      { text: 'Magnetic Button 3', x: 700, y: 300 },
    ]

    buttons.forEach((btn, i) => {
      const button = container
        .append('div')
        .style('position', 'absolute')
        .style('left', btn.x + 'px')
        .style('top', btn.y + 'px')
        .style('padding', '15px 30px')
        .style('background', '#667eea')
        .style('color', 'white')
        .style('border-radius', '8px')
        .style('font-weight', '600')
        .style('cursor', 'pointer')
        .style('opacity', 0)
        .style('transform', 'scale(0.9)')
        .text(btn.text)

      button
        .transition()
        .duration(500)
        .delay(i * 150)
        .style('opacity', 1)
        .style('transform', 'scale(1)')

      button.on('mouseenter', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style('transform', 'scale(1.1)')
          .style('box-shadow', '0 10px 30px rgba(102, 126, 234, 0.4)')
      })

      button.on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style('transform', 'scale(1)')
          .style('box-shadow', 'none')
      })

      // Magnetic effect
      button.on('mousemove', function(event) {
        const [mx, my] = d3.pointer(event, this)
        const rect = this.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const dx = (event.clientX - centerX) * 0.2
        const dy = (event.clientY - centerY) * 0.2

        d3.select(this)
          .style('transform', `translate(${dx}px, ${dy}px) scale(1.05)`)
      })

      button.on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(300)
          .style('transform', 'translate(0px, 0px) scale(1)')
      })
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
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '500px' }}></div>
    </div>
  )
}
