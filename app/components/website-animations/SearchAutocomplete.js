'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SearchAutocomplete() {
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
      .text('Interactive Search with Autocomplete')

    const searchContainer = container
      .append('div')
      .style('width', '600px')
      .style('position', 'relative')
      .style('opacity', 0)

    searchContainer
      .transition()
      .duration(600)
      .style('opacity', 1)

    const suggestions = [
      'Web Development',
      'Mobile App Development',
      'Cloud Solutions',
      'UI/UX Design',
      'Digital Marketing',
      'Data Analytics',
      'E-commerce Solutions',
      'Consulting Services',
    ]

    const searchInput = searchContainer
      .append('input')
      .attr('type', 'text')
      .attr('placeholder', 'Search services...')
      .style('width', '100%')
      .style('padding', '15px 50px 15px 20px')
      .style('border', '2px solid #e0e0e0')
      .style('border-radius', '30px')
      .style('font-size', '16px')
      .style('outline', 'none')
      .style('opacity', 0)
      .style('transform', 'translateY(10px)')

    searchInput
      .transition()
      .duration(400)
      .delay(200)
      .style('opacity', 1)
      .style('transform', 'translateY(0px)')

    // Search icon
    searchContainer
      .append('div')
      .style('position', 'absolute')
      .style('right', '20px')
      .style('top', '50%')
      .style('transform', 'translateY(-50%)')
      .style('font-size', '20px')
      .style('color', '#667eea')
      .text('🔍')

    // Autocomplete dropdown
    const dropdown = searchContainer
      .append('div')
      .style('position', 'absolute')
      .style('top', '100%')
      .style('left', '0')
      .style('right', '0')
      .style('background', 'white')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
      .style('margin-top', '10px')
      .style('max-height', '300px')
      .style('overflow-y', 'auto')
      .style('display', 'none')

    searchInput.on('input', function() {
      const value = this.value.toLowerCase()
      dropdown.selectAll('.suggestion').remove()

      if (value.length > 0) {
        const filtered = suggestions.filter(s => s.toLowerCase().includes(value))

        if (filtered.length > 0) {
          dropdown.style('display', 'block')

          filtered.forEach((suggestion, i) => {
            const item = dropdown
              .append('div')
              .attr('class', 'suggestion')
              .style('padding', '15px 20px')
              .style('cursor', 'pointer')
              .style('border-bottom', '1px solid #f0f0f0')
              .style('opacity', 0)
              .style('transform', 'translateX(-10px)')
              .text(suggestion)

            item
              .transition()
              .duration(300)
              .delay(i * 50)
              .style('opacity', 1)
              .style('transform', 'translateX(0px)')

            item.on('mouseenter', function() {
              d3.select(this).style('background', '#f5f5f5')
            })

            item.on('mouseleave', function() {
              d3.select(this).style('background', 'white')
            })

            item.on('click', function() {
              searchInput.property('value', suggestion)
              dropdown.style('display', 'none')
            })
          })
        } else {
          dropdown.style('display', 'none')
        }
      } else {
        dropdown.style('display', 'none')
      }
    })

    searchInput.on('focus', function() {
      d3.select(this).style('border-color', '#667eea')
    })

    searchInput.on('blur', function() {
      setTimeout(() => {
        d3.select(this).style('border-color', '#e0e0e0')
        dropdown.style('display', 'none')
      }, 200)
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div ref={containerRef} style={{ position: 'relative' }}></div>
    </div>
  )
}
