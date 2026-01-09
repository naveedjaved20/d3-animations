'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function LogoMarquee() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const logos = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F']
    const marquee = container
      .append('div')
      .style('width', '100%')
      .style('height', '100px')
      .style('background', 'white')
      .style('border-radius', '10px')
      .style('overflow', 'hidden')
      .style('position', 'relative')
      .style('opacity', 0)

    marquee
      .transition()
      .duration(600)
      .style('opacity', 1)

    // Duplicate logos for seamless loop
    const allLogos = [...logos, ...logos]

    allLogos.forEach((logo, i) => {
      const logoDiv = marquee
        .append('div')
        .style('position', 'absolute')
        .style('left', (i * 200) + 'px')
        .style('top', '50%')
        .style('transform', 'translateY(-50%)')
        .style('width', '150px')
        .style('height', '60px')
        .style('background', '#f5f5f5')
        .style('border-radius', '8px')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('font-weight', 'bold')
        .style('color', '#667eea')
        .text(logo)
        .style('opacity', 0)

      logoDiv
        .transition()
        .duration(400)
        .delay(i * 50)
        .style('opacity', 1)
    })

    // Animate marquee continuously
    let animationId
    let position = 0
    let isPaused = false

    function animateMarquee() {
      if (isPaused) {
        animationId = requestAnimationFrame(animateMarquee)
        return
      }

      position -= 0.5
      if (position <= -1200) {
        position = 0
      }

      marquee.selectAll('div').style('left', (d, i) => (i * 200 + position) + 'px')
      animationId = requestAnimationFrame(animateMarquee)
    }

    setTimeout(() => {
      animationId = requestAnimationFrame(animateMarquee)
    }, 1000)

    // Pause on hover
    marquee.on('mouseenter', function() {
      isPaused = true
    })

    marquee.on('mouseleave', function() {
      isPaused = false
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '900px', height: '150px' }}></div>
    </div>
  )
}
