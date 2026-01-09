'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function NewsletterSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const section = container
      .append('div')
      .style('width', '800px')
      .style('height', '300px')
      .style('background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
      .style('border-radius', '15px')
      .style('padding', '50px')
      .style('text-align', 'center')
      .style('color', 'white')
      .style('opacity', 0)

    section
      .transition()
      .duration(800)
      .style('opacity', 1)

    // Title
    section
      .append('div')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('margin-bottom', '15px')
      .text('Stay Updated')
      .style('opacity', 0)
      .transition()
      .duration(600)
      .delay(300)
      .style('opacity', 1)

    // Description
    section
      .append('div')
      .style('font-size', '16px')
      .style('margin-bottom', '30px')
      .style('opacity', 0.9)
      .text('Subscribe to our newsletter for the latest updates and insights')
      .style('opacity', 0)
      .transition()
      .duration(600)
      .delay(500)
      .style('opacity', 0.9)

    // Email input and button
    const form = section
      .append('div')
      .style('display', 'flex')
      .style('gap', '15px')
      .style('justify-content', 'center')
      .style('opacity', 0)

    const input = form
      .append('input')
      .attr('type', 'email')
      .attr('placeholder', 'Enter your email')
      .style('padding', '15px 20px')
      .style('border', 'none')
      .style('border-radius', '30px')
      .style('font-size', '16px')
      .style('width', '350px')
      .style('outline', 'none')
      .style('opacity', 0)
      .style('transform', 'translateX(-20px)')

    const button = form
      .append('button')
      .style('padding', '15px 40px')
      .style('background', 'white')
      .style('color', '#667eea')
      .style('border', 'none')
      .style('border-radius', '30px')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .text('Subscribe')
      .style('opacity', 0)
      .style('transform', 'translateX(20px)')

    // Animate form entrance
    setTimeout(() => {
      form
        .transition()
        .duration(600)
        .delay(700)
        .style('opacity', 1)

      input
        .transition()
        .duration(600)
        .delay(700)
        .style('opacity', 1)
        .style('transform', 'translateX(0px)')

      button
        .transition()
        .duration(600)
        .delay(700)
        .style('opacity', 1)
        .style('transform', 'translateX(0px)')
    }, 100)

    // Button hover effect
    button.on('mouseenter', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .style('transform', 'scale(1.05)')
        .style('box-shadow', '0 10px 30px rgba(255,255,255,0.3)')
    })

    button.on('mouseleave', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .style('transform', 'scale(1)')
        .style('box-shadow', 'none')
    })

    // Success animation
    button.on('click', function() {
      d3.select(this)
        .text('Subscribing...')
        .style('background', '#4caf50')
        .transition()
        .duration(1000)
        .on('end', function() {
          d3.select(this).text('✓ Subscribed!')
        })
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative' }}></div>
    </div>
  )
}
