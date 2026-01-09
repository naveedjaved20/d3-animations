'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AnimatedLogo() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 600
    const height = 400

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
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
      .text('Animated Logo')

    const centerX = width / 2
    const centerY = height / 2

    // Create logo shape (geometric design)
    const logoGroup = svg
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)
      .attr('opacity', 0)

    // Animated circles
    for (let i = 0; i < 3; i++) {
      const circle = logoGroup
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 0)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 4)
        .attr('opacity', 0.8)

      circle
        .transition()
        .duration(1000)
        .delay(i * 200)
        .attr('r', 40 + i * 30)
        .style('opacity', 0.8 - i * 0.2)
    }

    // Center icon
    logoGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '60px')
      .text('⚡')
      .style('opacity', 0)
      .transition()
        .duration(800)
        .delay(1000)
        .style('opacity', 1)
        .attrTween('transform', function() {
          return function(t) {
            const scale = d3.easeElasticOut(t)
            const rotation = (1 - t) * 360
            return `scale(${scale}) rotate(${rotation})`
          }
        })

    // Company name
    const companyName = svg
      .append('text')
      .attr('x', centerX)
      .attr('y', centerY + 120)
      .attr('text-anchor', 'middle')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('TechCo')
      .style('opacity', 0)
      .style('transform', 'translateY(20px)')

    companyName
      .transition()
      .duration(800)
      .delay(1500)
      .style('opacity', 1)
      .style('transform', 'translateY(0px)')

    logoGroup
      .transition()
      .duration(500)
      .delay(500)
      .attr('opacity', 1)

    // Continuous rotation animation
    function animate() {
      logoGroup
        .transition()
        .duration(20000)
        .ease(d3.easeLinear)
        .attrTween('transform', function() {
          return function(t) {
            return `translate(${centerX}, ${centerY}) rotate(${t * 360})`
          }
        })
        .on('end', animate)
    }

    setTimeout(() => animate(), 2000)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '600px' }}></svg>
    </div>
  )
}
