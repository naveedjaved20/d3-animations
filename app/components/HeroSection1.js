'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function HeroSection1() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 400

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Animated background circles
    const circles = []
    for (let i = 0; i < 20; i++) {
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100 + 20,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const circleElements = svg
      .selectAll('.bg-circle')
      .data(circles)
      .enter()
      .append('circle')
      .attr('class', 'bg-circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 0)
      .attr('fill', 'white')
      .attr('opacity', d => d.opacity)

    circleElements
      .transition()
      .duration(2000)
      .delay((d, i) => i * 100)
      .attr('r', d => d.radius)

    // Main heading
    const heading = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 - 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '48px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('opacity', 0)
      .text('Welcome to Our Portfolio')

    heading
      .transition()
      .duration(1000)
      .delay(500)
      .style('opacity', 1)

    // Subheading
    const subheading = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('fill', 'rgba(255, 255, 255, 0.9)')
      .style('opacity', 0)
      .text('Innovative Solutions for Your Business')

    subheading
      .transition()
      .duration(1000)
      .delay(1000)
      .style('opacity', 1)

    // Animated line under text
    const line = svg
      .append('line')
      .attr('x1', width / 2 - 150)
      .attr('y1', height / 2 + 50)
      .attr('x2', width / 2 - 150)
      .attr('y2', height / 2 + 50)
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .style('opacity', 0)

    line
      .transition()
      .duration(1500)
      .delay(1500)
      .attr('x2', width / 2 + 150)
      .style('opacity', 1)

    // Floating particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    const particleElements = svg
      .selectAll('.particle')
      .data(particles)
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.radius)
      .attr('fill', 'white')
      .attr('opacity', 0.6)

    function animateParticles() {
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        particleElements
          .filter((d, j) => j === i)
          .attr('cx', p.x)
          .attr('cy', p.y)
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
