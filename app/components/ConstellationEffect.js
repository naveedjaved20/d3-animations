'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ConstellationEffect() {
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
      .style('background', 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)')
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
      .text('Constellation Effect')

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random(),
    }))

    // Draw stars
    const starElements = svg
      .selectAll('.star')
      .data(stars)
      .enter()
      .append('circle')
      .attr('class', 'star')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 0)
      .attr('fill', 'white')
      .attr('opacity', d => d.opacity)

    starElements
      .transition()
      .duration(1000)
      .delay((d, i) => i * 20)
      .attr('r', d => d.radius)

    // Twinkle animation
    function twinkle() {
      starElements.each(function(d) {
        d.twinkle += 0.05
        const opacity = d.opacity + Math.sin(d.twinkle) * 0.3
        d3.select(this).attr('opacity', Math.max(0.1, Math.min(1, opacity)))
      })
      requestAnimationFrame(twinkle)
    }
    twinkle()

    // Draw connections
    function drawConnections() {
      svg.selectAll('.connection').remove()

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            svg
              .append('line')
              .attr('class', 'connection')
              .attr('x1', stars[i].x)
              .attr('y1', stars[i].y)
              .attr('x2', stars[j].x)
              .attr('y2', stars[j].y)
              .attr('stroke', 'rgba(255, 255, 255, 0.2)')
              .attr('stroke-width', 1)
          }
        }
      }
    }

    drawConnections()

    // Animate stars slowly
    function animate() {
      stars.forEach((star, i) => {
        star.x += (Math.random() - 0.5) * 0.5
        star.y += (Math.random() - 0.5) * 0.5

        // Keep in bounds
        star.x = Math.max(10, Math.min(width - 10, star.x))
        star.y = Math.max(10, Math.min(height - 10, star.y))

        starElements.filter((d, j) => j === i).attr('cx', star.x).attr('cy', star.y)
      })

      drawConnections()
      requestAnimationFrame(animate)
    }

    setTimeout(() => animate(), 2000)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
