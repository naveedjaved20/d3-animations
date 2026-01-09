'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ParallaxScroll() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Title
    container
      .append('div')
      .style('text-align', 'center')
      .style('font-size', '28px')
      .style('font-weight', 'bold')
      .style('color', '#333')
      .style('margin-bottom', '30px')
      .text('Parallax Scroll Effect - Scroll to See')

    const scrollContainer = container
      .append('div')
      .style('width', '900px')
      .style('height', '2000px')
      .style('position', 'relative')
      .style('background', 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)')
      .style('border-radius', '15px')
      .style('overflow', 'hidden')

    // Background layer (moves slower)
    const bgLayer = scrollContainer
      .append('div')
      .style('position', 'absolute')
      .style('top', '0')
      .style('left', '0')
      .style('width', '100%')
      .style('height', '120%')
      .style('background', 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)')
      .style('opacity', 0.5)

    // Middle layer (moves at normal speed)
    const middleLayer = scrollContainer
      .append('div')
      .style('position', 'absolute')
      .style('top', '200px')
      .style('left', '50%')
      .style('transform', 'translateX(-50%)')
      .style('width', '600px')
      .style('height', '400px')
      .style('background', 'rgba(255,255,255,0.2)')
      .style('border-radius', '15px')
      .style('backdrop-filter', 'blur(10px)')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'center')
      .style('color', 'white')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Middle Layer')

    // Foreground layer (moves faster)
    const fgLayer = scrollContainer
      .append('div')
      .style('position', 'absolute')
      .style('top', '600px')
      .style('left', '50%')
      .style('transform', 'translateX(-50%)')
      .style('width', '400px')
      .style('height', '300px')
      .style('background', 'white')
      .style('border-radius', '15px')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'center')
      .style('color', '#333')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text('Foreground Layer')

    // Parallax effect
    let lastScroll = 0
    function handleScroll() {
      const scrollTop = scrollContainer.node().scrollTop || 0
      const delta = scrollTop - lastScroll

      // Background moves slower
      const bgY = scrollTop * 0.3
      bgLayer.style('transform', `translateY(${bgY}px)`)

      // Middle moves at normal speed
      const middleY = 200 + scrollTop * 0.5
      middleLayer.style('top', middleY + 'px')

      // Foreground moves faster
      const fgY = 600 + scrollTop * 0.8
      fgLayer.style('top', fgY + 'px')

      lastScroll = scrollTop
    }

    scrollContainer.on('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '500px', overflow: 'auto' }}></div>
    </div>
  )
}
