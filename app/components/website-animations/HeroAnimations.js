'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function HeroAnimations() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Animated headline
    const headline = 'Innovative Technology Solutions'
    const headlineDiv = container
      .append('div')
      .style('text-align', 'center')
      .style('margin-bottom', '30px')

    headline.split(' ').forEach((word, i) => {
      const wordSpan = headlineDiv
        .append('span')
        .style('display', 'inline-block')
        .style('font-size', '36px')
        .style('font-weight', 'bold')
        .style('color', 'white')
        .style('margin', '0 5px')
        .style('opacity', 0)
        .style('transform', 'translateY(20px)')
        .text(word)

      wordSpan
        .transition()
        .duration(600)
        .delay(i * 100)
        .style('opacity', 1)
        .style('transform', 'translateY(0px)')
    })

    // Particle background
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 900,
      y: Math.random() * 300,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    const particleElements = container
      .selectAll('.particle')
      .data(particles)
      .enter()
      .append('div')
      .style('position', 'absolute')
      .style('width', d => d.radius * 2 + 'px')
      .style('height', d => d.radius * 2 + 'px')
      .style('background', 'white')
      .style('border-radius', '50%')
      .style('opacity', 0.3)
      .style('left', d => d.x + 'px')
      .style('top', d => d.y + 'px')

    particleElements
      .transition()
      .duration(1000)
      .delay((d, i) => i * 30)
      .style('opacity', 0.3)

    function animateParticles() {
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > 900) p.vx *= -1
        if (p.y < 0 || p.y > 300) p.vy *= -1

        particleElements
          .filter((d, j) => j === i)
          .style('left', p.x + 'px')
          .style('top', p.y + 'px')
      })

      requestAnimationFrame(animateParticles)
    }

    setTimeout(() => animateParticles(), 1500)

    // CTA Button
    const ctaButton = container
      .append('div')
      .style('text-align', 'center')
      .style('margin-top', '40px')

    const button = ctaButton
      .append('div')
      .style('display', 'inline-block')
      .style('padding', '15px 40px')
      .style('background', 'white')
      .style('color', '#667eea')
      .style('border-radius', '30px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .style('transform', 'scale(0.8)')
      .text('Get Started')

    button
      .transition()
      .duration(600)
      .delay(1000)
      .style('opacity', 1)
      .style('transform', 'scale(1)')

    button.on('mouseenter', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .style('transform', 'scale(1.1)')
        .style('box-shadow', '0 10px 30px rgba(255,255,255,0.3)')
    })

    button.on('mouseleave', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .style('transform', 'scale(1)')
        .style('box-shadow', 'none')
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '10px'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '900px', height: '400px' }}></div>
    </div>
  )
}
