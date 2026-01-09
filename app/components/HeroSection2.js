'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function HeroSection2() {
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
      .style('background', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Animated wave pattern
    const waveData = []
    for (let i = 0; i <= 100; i++) {
      waveData.push({ x: (i / 100) * width, y: height / 2 })
    }

    const line = d3
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBasis)

    const wavePath = svg
      .append('path')
      .datum(waveData)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('opacity', 0.3)

    function animateWave() {
      waveData.forEach((d, i) => {
        d.y = height / 2 + Math.sin((i / 10) + Date.now() / 1000) * 30
      })
      wavePath.attr('d', line)
      requestAnimationFrame(animateWave)
    }
    animateWave()

    // Typing effect text
    const text = 'We Create Digital Excellence'
    const typingText = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '42px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('')

    let index = 0
    function typeText() {
      if (index < text.length) {
        typingText.text(text.substring(0, index + 1))
        index++
        setTimeout(typeText, 100)
      }
    }
    setTimeout(typeText, 500)

    // Animated stats
    const stats = [
      { label: 'Projects', value: 500, y: height / 2 + 80 },
      { label: 'Clients', value: 200, y: height / 2 + 120 },
      { label: 'Years', value: 10, y: height / 2 + 160 },
    ]

    stats.forEach((stat, i) => {
      const statGroup = svg.append('g').attr('opacity', 0)

      statGroup
        .append('text')
        .attr('x', width / 2 - 200 + i * 200)
        .attr('y', stat.y)
        .attr('text-anchor', 'middle')
        .style('font-size', '32px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(stat.value + '+')

      statGroup
        .append('text')
        .attr('x', width / 2 - 200 + i * 200)
        .attr('y', stat.y + 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', 'rgba(255, 255, 255, 0.9)')
        .text(stat.label)

      statGroup
        .transition()
        .duration(800)
        .delay(2000 + i * 200)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
