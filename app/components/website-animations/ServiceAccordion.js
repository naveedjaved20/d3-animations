'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ServiceAccordion() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const services = [
      { title: 'Web Development', desc: 'Custom web applications built with modern technologies' },
      { title: 'Mobile Apps', desc: 'Native and cross-platform mobile solutions' },
      { title: 'Cloud Services', desc: 'Scalable cloud infrastructure and deployment' },
      { title: 'Consulting', desc: 'Expert technology consulting and strategy' },
    ]

    services.forEach((service, i) => {
      const serviceItem = container
        .append('div')
        .style('width', '800px')
        .style('margin-bottom', '15px')
        .style('background', 'white')
        .style('border-radius', '10px')
        .style('overflow', 'hidden')
        .style('box-shadow', '0 5px 15px rgba(0,0,0,0.1)')
        .style('opacity', 0)
        .style('transform', 'translateX(-30px)')

      const header = serviceItem
        .append('div')
        .style('padding', '20px 30px')
        .style('display', 'flex')
        .style('justify-content', 'space-between')
        .style('align-items', 'center')
        .style('cursor', 'pointer')
        .style('background', i === 0 ? '#f5f5f5' : 'white')

      header
        .append('div')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .text(service.title)

      const icon = header
        .append('div')
        .style('font-size', '20px')
        .style('color', '#667eea')
        .text(i === 0 ? '−' : '+')

      const content = serviceItem
        .append('div')
        .style('padding', '0 30px')
        .style('max-height', i === 0 ? '100px' : '0')
        .style('overflow', 'hidden')
        .style('transition', 'max-height 0.3s ease, padding 0.3s ease')

      content
        .append('div')
        .style('padding', '20px 0')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('line-height', '1.6')
        .text(service.desc)

      // Toggle on click
      header.on('click', function() {
        const isOpen = content.style('max-height') !== '0px'
        const newHeight = isOpen ? '0' : '100px'
        const newPadding = isOpen ? '0 30px' : '20px 30px'

        content
          .transition()
          .duration(300)
          .style('max-height', newHeight)
          .style('padding', newPadding)

        icon.text(isOpen ? '+' : '−')
        header.style('background', isOpen ? 'white' : '#f5f5f5')
      })

      // Animate entrance
      setTimeout(() => {
        serviceItem
          .transition()
          .duration(600)
          .delay(i * 100)
          .style('opacity', 1)
          .style('transform', 'translateX(0px)')
      }, 100)
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
      <div ref={containerRef} style={{ position: 'relative', width: '800px' }}></div>
    </div>
  )
}
