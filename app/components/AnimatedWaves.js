'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AnimatedWaves() {
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
      .text('Animated Wave Patterns')

    const numWaves = 3
    const waves = []

    for (let i = 0; i < numWaves; i++) {
      const waveData = []
      const numPoints = 100
      const amplitude = 50 + i * 30
      const frequency = 0.02 + i * 0.01
      const speed = 0.01 + i * 0.005
      const yOffset = (height / (numWaves + 1)) * (i + 1)

      for (let j = 0; j <= numPoints; j++) {
        waveData.push({
          x: (j / numPoints) * width,
          y: yOffset,
          amplitude,
          frequency,
          speed,
          phase: Math.random() * Math.PI * 2,
        })
      }

      waves.push({
        data: waveData,
        color: d3.interpolateRainbow(i / numWaves),
        opacity: 0.6 - i * 0.15,
      })
    }

    const line = d3
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBasis)

    waves.forEach((wave, i) => {
      const path = svg
        .append('path')
        .datum(wave.data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', wave.color)
        .attr('stroke-width', 4)
        .attr('opacity', 0)

      path
        .transition()
        .duration(1000)
        .delay(i * 200)
        .attr('opacity', wave.opacity)

      // Animate wave
      function animateWave() {
        wave.data.forEach(point => {
          point.y =
            point.y -
            point.amplitude * Math.sin(point.x * point.frequency + point.phase) +
            point.amplitude * Math.sin(point.x * point.frequency + point.phase + Date.now() * point.speed)
        })

        path.datum(wave.data).attr('d', line)
        requestAnimationFrame(animateWave)
      }

      setTimeout(() => animateWave(), 1000 + i * 200)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
