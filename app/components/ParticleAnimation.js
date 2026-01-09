'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ParticleAnimation() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 600
    const numParticles = 100

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(20, 20, 30, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Create particles
    const particles = Array.from({ length: numParticles }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 3 + 1,
      color: d3.schemeCategory10[Math.floor(Math.random() * 10)],
    }))

    const circles = svg
      .selectAll('circle')
      .data(particles)
      .enter()
      .append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d.color)
      .attr('opacity', 0.7)

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('Particle Animation')

    function animate() {
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        circles
          .filter((d, j) => j === i)
          .attr('cx', particle.x)
          .attr('cy', particle.y)
      })

      // Draw connections
      svg.selectAll('.connection').remove()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            svg
              .append('line')
              .attr('class', 'connection')
              .attr('x1', particles[i].x)
              .attr('y1', particles[i].y)
              .attr('x2', particles[j].x)
              .attr('y2', particles[j].y)
              .attr('stroke', particles[i].color)
              .attr('stroke-opacity', 0.2 * (1 - distance / 100))
              .attr('stroke-width', 1)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
