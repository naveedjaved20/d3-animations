'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ImageGallery() {
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
      .text('Interactive Image Gallery')

    const images = [
      { id: 1, color: '#667eea', title: 'Project 1' },
      { id: 2, color: '#764ba2', title: 'Project 2' },
      { id: 3, color: '#f093fb', title: 'Project 3' },
      { id: 4, color: '#4facfe', title: 'Project 4' },
      { id: 5, color: '#00f2fe', title: 'Project 5' },
      { id: 6, color: '#f5576c', title: 'Project 6' },
    ]

    const gallery = container
      .append('div')
      .style('display', 'grid')
      .style('grid-template-columns', 'repeat(3, 1fr)')
      .style('gap', '20px')
      .style('width', '900px')

    images.forEach((image, i) => {
      const imageCard = gallery
        .append('div')
        .style('position', 'relative')
        .style('height', '200px')
        .style('background', `linear-gradient(135deg, ${image.color} 0%, ${image.color}dd 100%)`)
        .style('border-radius', '15px')
        .style('overflow', 'hidden')
        .style('cursor', 'pointer')
        .style('opacity', 0)
        .style('transform', 'scale(0.8)')
        .on('click', function() {
          // Lightbox effect
          const lightbox = container
            .append('div')
            .style('position', 'fixed')
            .style('top', '0')
            .style('left', '0')
            .style('width', '100%')
            .style('height', '100%')
            .style('background', 'rgba(0,0,0,0.9)')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('justify-content', 'center')
            .style('z-index', '1000')
            .style('opacity', 0)
            .on('click', function() {
              d3.select(this).remove()
            })

          const lightboxImage = lightbox
            .append('div')
            .style('width', '80%')
            .style('height', '80%')
            .style('background', `linear-gradient(135deg, ${image.color} 0%, ${image.color}dd 100%)`)
            .style('border-radius', '15px')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('justify-content', 'center')
            .style('color', 'white')
            .style('font-size', '32px')
            .style('font-weight', 'bold')
            .text(image.title)

          lightbox
            .transition()
            .duration(300)
            .style('opacity', 1)
        })

      // Image placeholder
      imageCard
        .append('div')
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('font-size', '60px')
        .text('🖼️')

      // Overlay on hover
      const overlay = imageCard
        .append('div')
        .style('position', 'absolute')
        .style('top', '0')
        .style('left', '0')
        .style('right', '0')
        .style('bottom', '0')
        .style('background', 'rgba(0,0,0,0.7)')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('opacity', 0)
        .style('transition', 'opacity 0.3s')

      overlay
        .append('div')
        .style('color', 'white')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .text('Click to View')

      imageCard.on('mouseenter', function() {
        overlay.style('opacity', 1)
      })

      imageCard.on('mouseleave', function() {
        overlay.style('opacity', 0)
      })

      // Animate entrance
      setTimeout(() => {
        imageCard
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
