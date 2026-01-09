'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function MorphingText() {
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

    const words = ['INNOVATION', 'CREATIVITY', 'EXCELLENCE', 'FUTURE']
    let currentWordIndex = 0

    const textGroup = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    function createMorphingText(word) {
      textGroup.selectAll('*').remove()

      const letters = word.split('')
      letters.forEach((letter, i) => {
        const letterGroup = textGroup.append('g')

        // Create letter path (simplified - using text as path)
        const text = letterGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('font-size', '80px')
          .attr('font-weight', 'bold')
          .attr('fill', 'white')
          .attr('x', (i - letters.length / 2) * 60)
          .attr('y', 0)
          .attr('opacity', 0)
          .text(letter)

        // Animate letter appearance with morphing effect
        text
          .transition()
          .duration(800)
          .delay(i * 100)
          .attrTween('transform', function() {
            return function(t) {
              const scale = d3.easeElasticOut(t)
              const rotation = (1 - t) * 360
              return `translate(${(i - letters.length / 2) * 60}, 0) scale(${scale}) rotate(${rotation})`
            }
          })
          .attr('opacity', 1)
      })
    }

    createMorphingText(words[currentWordIndex])

    // Cycle through words
    const interval = setInterval(() => {
      // Fade out current
      const currentLetters = words[currentWordIndex].split('')
      textGroup
        .selectAll('text')
        .each(function(d, i) {
          const text = d3.select(this)
          text
            .transition()
            .duration(500)
            .attr('opacity', 0)
            .attrTween('transform', function() {
              return function(t) {
                const scale = 1 - t * 0.5
                const rotation = t * 180
                return `translate(${(i - currentLetters.length / 2) * 60}, 0) scale(${scale}) rotate(${rotation})`
              }
            })
            .on('end', function() {
              if (i === currentLetters.length - 1) {
                currentWordIndex = (currentWordIndex + 1) % words.length
                createMorphingText(words[currentWordIndex])
              }
            })
        })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
