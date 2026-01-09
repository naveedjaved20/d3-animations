'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PartnersSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Title
    container
      .append('div')
      .style('text-align', 'center')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('color', '#333')
      .style('margin-bottom', '40px')
      .text('Our Partners & Clients')

    const partners = [
      'Partner A', 'Partner B', 'Partner C', 'Partner D',
      'Partner E', 'Partner F', 'Partner G', 'Partner H',
    ]

    const grid = container
      .append('div')
      .style('display', 'grid')
      .style('grid-template-columns', 'repeat(4, 1fr)')
      .style('gap', '30px')
      .style('width', '900px')

    partners.forEach((partner, i) => {
      const logo = grid
        .append('div')
        .style('height', '120px')
        .style('background', 'white')
        .style('border-radius', '10px')
        .style('box-shadow', '0 5px 15px rgba(0,0,0,0.1)')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('font-weight', '600')
        .style('color', '#667eea')
        .style('opacity', 0)
        .style('transform', 'scale(0.8)')
        .style('cursor', 'pointer')
        .text(partner)
        .on('mouseenter', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('transform', 'scale(1.1)')
            .style('box-shadow', '0 10px 25px rgba(0,0,0,0.2)')
            .style('background', '#f5f5f5')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('transform', 'scale(1)')
            .style('box-shadow', '0 5px 15px rgba(0,0,0,0.1)')
            .style('background', 'white')
        })

      // Animate entrance
      setTimeout(() => {
        logo
          .transition()
          .duration(600)
          .delay(i * 100)
          .style('opacity', 1)
          .style('transform', 'scale(1)')
      }, 100)
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
      <div ref={containerRef} style={{ position: 'relative', width: '900px' }}></div>
    </div>
  )
}
