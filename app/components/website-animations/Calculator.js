'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Calculator() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Title
    container
      .append('div')
      .style('text-align', 'center')
      .style('font-size', '28px')
      .style('font-weight', 'bold')
      .style('color', '#333')
      .style('margin-bottom', '30px')
      .text('Project Cost Calculator')

    const calculator = container
      .append('div')
      .style('width', '400px')
      .style('background', 'white')
      .style('border-radius', '15px')
      .style('padding', '30px')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
      .style('opacity', 0)

    calculator
      .transition()
      .duration(600)
      .style('opacity', 1)

    // Input fields
    const inputs = [
      { label: 'Project Hours', value: 100, id: 'hours' },
      { label: 'Hourly Rate ($)', value: 50, id: 'rate' },
    ]

    inputs.forEach((input, i) => {
      const inputGroup = calculator.append('div').style('margin-bottom', '20px')

      inputGroup
        .append('label')
        .style('display', 'block')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('margin-bottom', '8px')
        .text(input.label)

      const inputField = inputGroup
        .append('input')
        .attr('type', 'number')
        .attr('value', input.value)
        .style('width', '100%')
        .style('padding', '12px')
        .style('border', '2px solid #e0e0e0')
        .style('border-radius', '8px')
        .style('font-size', '16px')
        .style('opacity', 0)
        .style('transform', 'translateY(10px)')

      inputField
        .transition()
        .duration(400)
        .delay(200 + i * 100)
        .style('opacity', 1)
        .style('transform', 'translateY(0px)')
    })

    // Result display
    const result = calculator
      .append('div')
      .style('margin-top', '30px')
      .style('padding', '20px')
      .style('background', '#f5f5f5')
      .style('border-radius', '10px')
      .style('text-align', 'center')
      .style('opacity', 0)

    result
      .append('div')
      .style('font-size', '14px')
      .style('color', '#666')
      .style('margin-bottom', '10px')
      .text('Estimated Cost')

    const total = result
      .append('div')
      .style('font-size', '36px')
      .style('font-weight', 'bold')
      .style('color', '#667eea')
      .text('$0')
      .style('opacity', 0)

    // Calculate function
    function calculate() {
      const hours = parseFloat(calculator.select('#hours').property('value') || 100)
      const rate = parseFloat(calculator.select('#rate').property('value') || 50)
      const cost = hours * rate

      total
        .transition()
        .duration(800)
        .tween('text', function() {
          const interpolate = d3.interpolate(parseFloat(this.textContent.replace('$', '')) || 0, cost)
          return function(t) {
            this.textContent = '$' + Math.round(interpolate(t)).toLocaleString()
          }
        })
    }

    calculator.selectAll('input').on('input', calculate)

    result
      .transition()
      .duration(600)
      .delay(600)
      .style('opacity', 1)

    total
      .transition()
      .duration(400)
      .delay(800)
      .style('opacity', 1)

    // Initial calculation
    setTimeout(() => calculate(), 1000)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div ref={containerRef} style={{ position: 'relative' }}></div>
    </div>
  )
}
