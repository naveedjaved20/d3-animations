'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function LoadingAnimation() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
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
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('Loading Animations')

    const centerX = width / 2
    const centerY = height / 2

    // Spinner animation
    const spinner = svg
      .append('g')
      .attr('transform', `translate(${centerX - 150}, ${centerY})`)

    const spinnerCircle = spinner
      .append('circle')
      .attr('r', 40)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 4)
      .attr('stroke-dasharray', '60 200')
      .attr('stroke-linecap', 'round')

    function animateSpinner() {
      spinnerCircle
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attrTween('transform', function() {
          return function(t) {
            return `rotate(${t * 360})`
          }
        })
        .on('end', animateSpinner)
    }

    animateSpinner()

    // Pulsing dots
    const dotsGroup = svg
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)

    for (let i = 0; i < 5; i++) {
      const dot = dotsGroup
        .append('circle')
        .attr('cx', (i - 2) * 30)
        .attr('cy', 0)
        .attr('r', 8)
        .attr('fill', 'white')
        .attr('opacity', 0.3)

      function animateDot(dotElement) {
        dotElement
          .transition()
          .duration(600)
          .attr('r', 15)
          .attr('opacity', 1)
          .transition()
          .duration(600)
          .attr('r', 8)
          .attr('opacity', 0.3)
          .on('end', function() {
            animateDot(d3.select(this))
          })
      }

      dot
        .transition()
        .duration(600)
        .delay(i * 150)
        .on('end', function() {
          animateDot(d3.select(this))
        })
    }

    // Progress bar
    const progressGroup = svg
      .append('g')
      .attr('transform', `translate(${centerX + 150}, ${centerY})`)

    progressGroup
      .append('rect')
      .attr('x', -100)
      .attr('y', -10)
      .attr('width', 200)
      .attr('height', 20)
      .attr('rx', 10)
      .attr('fill', 'rgba(255,255,255,0.2)')

    const progressBar = progressGroup
      .append('rect')
      .attr('x', -100)
      .attr('y', -10)
      .attr('width', 0)
      .attr('height', 20)
      .attr('rx', 10)
      .attr('fill', 'white')

    function animateProgress() {
      progressBar
        .transition()
        .duration(3000)
        .attr('width', 200)
        .on('end', function() {
          d3.select(this)
            .attr('width', 0)
          animateProgress()
        })
    }

    animateProgress()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '800px' }}></svg>
    </div>
  )
}
