'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function CookieConsent() {
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
      .text('Cookie Consent Banner')

    const banner = container
      .append('div')
      .style('position', 'fixed')
      .style('bottom', '-200px')
      .style('left', '50%')
      .style('transform', 'translateX(-50%)')
      .style('width', '800px')
      .style('background', 'white')
      .style('border-radius', '15px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.3)')
      .style('padding', '30px')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '20px')
      .style('z-index', '1000')

    // Cookie icon
    banner
      .append('div')
      .style('font-size', '50px')
      .text('🍪')

    // Content
    const content = banner.append('div').style('flex', '1')

    content
      .append('div')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('color', '#333')
      .style('margin-bottom', '10px')
      .text('We use cookies')

    content
      .append('div')
      .style('font-size', '14px')
      .style('color', '#666')
      .style('line-height', '1.6')
      .text('We use cookies to enhance your browsing experience and analyze our traffic.')

    // Buttons
    const buttons = banner.append('div').style('display', 'flex').style('gap', '10px')

    const acceptButton = buttons
      .append('button')
      .style('padding', '12px 30px')
      .style('background', '#667eea')
      .style('color', 'white')
      .style('border', 'none')
      .style('border-radius', '25px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .text('Accept')
      .on('click', function() {
        banner
          .transition()
          .duration(500)
          .style('bottom', '-200px')
          .on('end', function() {
            d3.select(this).remove()
          })
      })

    const declineButton = buttons
      .append('button')
      .style('padding', '12px 30px')
      .style('background', 'transparent')
      .style('color', '#667eea')
      .style('border', '2px solid #667eea')
      .style('border-radius', '25px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .text('Decline')
      .on('click', function() {
        banner
          .transition()
          .duration(500)
          .style('bottom', '-200px')
          .on('end', function() {
            d3.select(this).remove()
          })
      })

    // Animate in
    setTimeout(() => {
      banner
        .transition()
        .duration(600)
        .style('bottom', '20px')
    }, 500)
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
