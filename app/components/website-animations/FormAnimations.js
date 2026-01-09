'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function FormAnimations() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const form = container
      .append('div')
      .style('width', '500px')
      .style('background', 'white')
      .style('border-radius', '15px')
      .style('padding', '40px')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
      .style('opacity', 0)

    form
      .transition()
      .duration(600)
      .style('opacity', 1)

    const fields = [
      { label: 'Name', type: 'text' },
      { label: 'Email', type: 'email' },
      { label: 'Message', type: 'textarea' },
    ]

    fields.forEach((field, i) => {
      const fieldGroup = form.append('div').style('margin-bottom', '30px')

      const label = fieldGroup
        .append('label')
        .style('display', 'block')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('margin-bottom', '8px')
        .style('opacity', 0)
        .text(field.label)

      const input = fieldGroup
        .append(field.type === 'textarea' ? 'textarea' : 'input')
        .attr('type', field.type)
        .style('width', '100%')
        .style('padding', '12px')
        .style('border', '2px solid #e0e0e0')
        .style('border-radius', '8px')
        .style('font-size', '14px')
        .style('opacity', 0)
        .style('transform', 'translateY(10px)')

      if (field.type === 'textarea') {
        input.attr('rows', 4)
      }

      // Floating label effect
      input.on('focus', function() {
        d3.select(this)
          .style('border-color', '#667eea')
          .style('outline', 'none')

        label
          .style('color', '#667eea')
          .transition()
          .duration(200)
          .style('transform', 'translateY(-5px)')
      })

      input.on('blur', function() {
        if (this.value === '') {
          d3.select(this).style('border-color', '#e0e0e0')
          label.style('color', '#666').style('transform', 'translateY(0px)')
        } else {
          d3.select(this).style('border-color', '#4caf50')
        }
      })

      // Animate entrance
      setTimeout(() => {
        label
          .transition()
          .duration(400)
          .delay(i * 100)
          .style('opacity', 1)

        input
          .transition()
          .duration(400)
          .delay(i * 100)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')
      }, 200)
    })

    // Submit button
    const button = form
      .append('button')
      .style('width', '100%')
      .style('padding', '15px')
      .style('background', '#667eea')
      .style('color', 'white')
      .style('border', 'none')
      .style('border-radius', '8px')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .text('Submit')

    button
      .transition()
      .duration(400)
      .delay(600)
      .style('opacity', 1)

    button.on('click', function() {
      d3.select(this)
        .text('Sending...')
        .style('background', '#4caf50')
        .transition()
        .duration(1000)
        .on('end', function() {
          d3.select(this).text('✓ Sent!')
        })
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative' }}></div>
    </div>
  )
}
