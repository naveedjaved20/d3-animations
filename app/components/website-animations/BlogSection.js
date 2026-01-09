'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function BlogSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const posts = [
      { title: 'The Future of Web Development', date: 'Jan 15, 2024', category: 'Technology', color: '#667eea' },
      { title: 'AI Integration in Business', date: 'Jan 10, 2024', category: 'AI', color: '#764ba2' },
      { title: 'Cloud Migration Best Practices', date: 'Jan 5, 2024', category: 'Cloud', color: '#f093fb' },
    ]

    posts.forEach((post, i) => {
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', i * 320 + 'px')
        .style('top', '0px')
        .style('width', '300px')
        .style('height', '350px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        .style('overflow', 'hidden')
        .style('opacity', 0)
        .style('transform', 'translateY(30px)')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'translateY(-10px)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.2)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'translateY(0px)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        })

      // Image placeholder
      card
        .append('div')
        .style('width', '100%')
        .style('height', '150px')
        .style('background', `linear-gradient(135deg, ${post.color} 0%, ${post.color}dd 100%)`)
        .style('opacity', 0)
        .transition()
        .duration(600)
        .delay(i * 150)
        .style('opacity', 1)

      // Content
      const content = card
        .append('div')
        .style('padding', '25px')

      // Category badge
      content
        .append('div')
        .style('display', 'inline-block')
        .style('background', post.color)
        .style('color', 'white')
        .style('padding', '5px 15px')
        .style('border-radius', '20px')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('margin-bottom', '15px')
        .text(post.category)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(600 + i * 150)
        .style('opacity', 1)

      // Title
      content
        .append('div')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('margin-bottom', '10px')
        .style('line-height', '1.4')
        .text(post.title)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(700 + i * 150)
        .style('opacity', 1)

      // Date
      content
        .append('div')
        .style('font-size', '14px')
        .style('color', '#999')
        .text(post.date)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(800 + i * 150)
        .style('opacity', 1)

      // Read more
      content
        .append('div')
        .style('margin-top', '15px')
        .style('font-size', '14px')
        .style('color', post.color)
        .style('font-weight', '600')
        .text('Read More →')
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(900 + i * 150)
        .style('opacity', 1)

      // Animate card entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .delay(i * 150)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')
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
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '1000px', height: '400px' }}></div>
    </div>
  )
}
