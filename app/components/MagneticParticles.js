'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function MagneticParticles() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 600

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('Magnetic Particle Field')

    const numParticles = 200
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 2 + 1,
      color: d3.schemeCategory10[Math.floor(Math.random() * 10)],
    }))

    const mouse = { x: width / 2, y: height / 2 }

    svg.on('mousemove', function(event) {
      const [mx, my] = d3.pointer(event)
      mouse.x = mx
      mouse.y = my
    })

    const particleElements = svg
      .selectAll('.particle')
      .data(particles)
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 0)
      .attr('fill', d => d.color)
      .attr('opacity', 0.7)

    particleElements
      .transition()
      .duration(1000)
      .delay((d, i) => i * 10)
      .attr('r', d => d.radius)

    function animate() {
      particles.forEach((particle, i) => {
        // Magnetic attraction to mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = distance > 0 ? 100 / (distance * distance) : 0

        particle.vx += (dx / distance) * force * 0.1
        particle.vy += (dy / distance) * force * 0.1

        // Damping
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        // Keep in bounds
        particle.x = Math.max(0, Math.min(width, particle.x))
        particle.y = Math.max(0, Math.min(height, particle.y))

        particleElements.filter((d, j) => j === i).attr('cx', particle.x).attr('cy', particle.y)
      })

      // Draw connections
      svg.selectAll('.connection').remove()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            svg
              .append('line')
              .attr('class', 'connection')
              .attr('x1', particles[i].x)
              .attr('y1', particles[i].y)
              .attr('x2', particles[j].x)
              .attr('y2', particles[j].y)
              .attr('stroke', particles[i].color)
              .attr('stroke-opacity', 0.2 * (1 - distance / 80))
              .attr('stroke-width', 1)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
