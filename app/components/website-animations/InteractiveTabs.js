'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function InteractiveTabs() {
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
      .text('Interactive Tab Navigation')

    const tabs = ['Overview', 'Features', 'Pricing', 'Support']
    const tabContents = [
      'Overview content: Learn about our services and expertise.',
      'Features content: Discover all the amazing features we offer.',
      'Pricing content: Find the perfect plan for your needs.',
      'Support content: Get help and support whenever you need it.',
    ]
    let activeTabIndex = 0

    const tabContainer = container
      .append('div')
      .style('width', '800px')
      .style('background', 'white')
      .style('border-radius', '15px')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
      .style('overflow', 'hidden')
      .style('opacity', 0)

    // Tab headers container
    const tabHeadersContainer = tabContainer
      .append('div')
      .style('position', 'relative')
      .style('display', 'flex')
      .style('background', '#f5f5f5')
      .style('border-bottom', '2px solid #e0e0e0')

    const underline = tabHeadersContainer
      .append('div')
      .style('position', 'absolute')
      .style('height', '3px')
      .style('background', '#667eea')
      .style('bottom', '0')
      .style('width', '0')
      .style('transition', 'all 0.3s ease')

    tabs.forEach((tab, i) => {
      const tabButton = tabHeadersContainer
        .append('div')
        .style('flex', '1')
        .style('padding', '20px')
        .style('text-align', 'center')
        .style('font-weight', '600')
        .style('color', i === 0 ? '#667eea' : '#666')
        .style('cursor', 'pointer')
        .style('position', 'relative')
        .text(tab)
        .style('opacity', 0)
        .style('transform', 'translateY(-10px)')

      tabButton
        .transition()
        .duration(400)
        .delay(i * 100)
        .style('opacity', 1)
        .style('transform', 'translateY(0px)')

      tabButton.on('click', function() {
        activeTabIndex = i
        const rect = this.getBoundingClientRect()
        const containerRect = tabContainer.node().getBoundingClientRect()
        const left = rect.left - containerRect.left

        underline
          .style('left', left + 'px')
          .style('width', rect.width + 'px')

        tabHeadersContainer.selectAll('div').style('color', '#666')
        d3.select(this).style('color', '#667eea')

        // Update content
        contentDiv
          .transition()
          .duration(300)
          .style('opacity', 0)
          .on('end', function() {
            d3.select(this).text(tabContents[i])
            d3.select(this)
              .transition()
              .duration(300)
              .style('opacity', 1)
          })
      })

      if (i === 0) {
        setTimeout(() => {
          const rect = tabButton.node().getBoundingClientRect()
          const containerRect = tabContainer.node().getBoundingClientRect()
          const left = rect.left - containerRect.left
          underline.style('left', left + 'px').style('width', rect.width + 'px')
        }, 500)
      }
    })

    // Content area
    const contentDiv = tabContainer
      .append('div')
      .style('padding', '40px')
      .style('min-height', '200px')
      .style('font-size', '16px')
      .style('color', '#333')
      .style('line-height', '1.8')
      .text(tabContents[0])
      .style('opacity', 0)

    contentDiv
      .transition()
      .duration(600)
      .delay(600)
      .style('opacity', 1)

    tabContainer
      .transition()
      .duration(600)
      .style('opacity', 1)
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
