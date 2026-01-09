'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ToastNotification() {
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
      .text('Toast Notifications - Click Button')

    const button = container
      .append('button')
      .style('padding', '15px 40px')
      .style('background', '#667eea')
      .style('color', 'white')
      .style('border', 'none')
      .style('border-radius', '30px')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .style('margin-bottom', '30px')
      .text('Show Notification')
      .style('opacity', 0)

    button
      .transition()
      .duration(600)
      .style('opacity', 1)

    let notificationCount = 0

    function showNotification(type) {
      notificationCount++
      const types = {
        success: { icon: '✓', color: '#4caf50', message: 'Operation completed successfully!' },
        error: { icon: '✗', color: '#f44336', message: 'An error occurred. Please try again.' },
        info: { icon: 'ℹ', color: '#2196F3', message: 'Here is some important information.' },
        warning: { icon: '⚠', color: '#FF9800', message: 'Please review this warning.' },
      }

      const notification = types[type] || types.success
      const top = 20 + (notificationCount - 1) * 80

      const toast = container
        .append('div')
        .style('position', 'fixed')
        .style('top', top + 'px')
        .style('right', '-400px')
        .style('width', '350px')
        .style('background', 'white')
        .style('border-radius', '10px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        .style('padding', '20px')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('gap', '15px')
        .style('z-index', '1000')
        .style('border-left', `4px solid ${notification.color}`)

      toast
        .append('div')
        .style('width', '40px')
        .style('height', '40px')
        .style('border-radius', '50%')
        .style('background', notification.color)
        .style('color', 'white')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .text(notification.icon)

      toast
        .append('div')
        .style('flex', '1')
        .style('font-size', '14px')
        .style('color', '#333')
        .text(notification.message)

      // Close button
      toast
        .append('div')
        .style('cursor', 'pointer')
        .style('font-size', '20px')
        .style('color', '#999')
        .text('×')
        .on('click', function() {
          toast
            .transition()
            .duration(300)
            .style('right', '-400px')
            .remove()
        })

      // Animate in
      toast
        .transition()
        .duration(400)
        .style('right', '20px')
        .on('end', function() {
          // Auto dismiss after 3 seconds
          setTimeout(() => {
            toast
              .transition()
              .duration(300)
              .style('right', '-400px')
              .style('opacity', 0)
              .remove()
          }, 3000)
        })
    }

    button.on('click', function() {
      const types = ['success', 'error', 'info', 'warning']
      const type = types[Math.floor(Math.random() * types.length)]
      showNotification(type)
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
