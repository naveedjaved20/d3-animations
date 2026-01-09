'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ParticleExplosion() {
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
      .style('background', 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)')
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
      .text('Interactive Particle Explosions - Click Anywhere!')

    const particles = []
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    svg.on('click', function(event) {
      const [x, y] = d3.pointer(event)

      // Create explosion
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2
        const speed = Math.random() * 5 + 2
        const particle = {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 4 + 2,
          color: color(i % 10),
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
        }
        particles.push(particle)

        const circle = svg
          .append('circle')
          .attr('cx', particle.x)
          .attr('cy', particle.y)
          .attr('r', particle.radius)
          .attr('fill', particle.color)
          .attr('opacity', 1)

        particle.element = circle
      }
    })

    function animate() {
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // Gravity
        particle.life -= particle.decay

        if (particle.life > 0 && particle.element) {
          particle.element
            .attr('cx', particle.x)
            .attr('cy', particle.y)
            .attr('opacity', particle.life)
            .attr('r', particle.radius * particle.life)
        } else {
          if (particle.element) particle.element.remove()
          particles.splice(i, 1)
        }
      })

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
