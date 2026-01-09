'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function FAQSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const faqs = [
      {
        question: 'What services do you offer?',
        answer: 'We offer comprehensive web development, mobile app development, cloud solutions, and consulting services.',
      },
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on scope, but typically range from 4-12 weeks for most projects.',
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we offer maintenance and support packages to ensure your project continues to perform optimally.',
      },
      {
        question: 'What technologies do you work with?',
        answer: 'We work with modern technologies including React, Node.js, Python, AWS, and many others.',
      },
    ]

    faqs.forEach((faq, i) => {
      const faqItem = container
        .append('div')
        .style('width', '800px')
        .style('margin-bottom', '15px')
        .style('background', 'white')
        .style('border-radius', '10px')
        .style('overflow', 'hidden')
        .style('box-shadow', '0 5px 15px rgba(0,0,0,0.1)')
        .style('opacity', 0)
        .style('transform', 'translateX(-30px)')

      const header = faqItem
        .append('div')
        .style('padding', '20px 30px')
        .style('display', 'flex')
        .style('justify-content', 'space-between')
        .style('align-items', 'center')
        .style('cursor', 'pointer')
        .style('background', 'white')

      header
        .append('div')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .style('color', '#333')
        .text(faq.question)

      const icon = header
        .append('div')
        .style('font-size', '20px')
        .style('color', '#667eea')
        .style('font-weight', 'bold')
        .text('+')

      const content = faqItem
        .append('div')
        .style('padding', '0 30px')
        .style('max-height', '0')
        .style('overflow', 'hidden')
        .style('transition', 'max-height 0.3s ease, padding 0.3s ease')

      content
        .append('div')
        .style('padding', '20px 0')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('line-height', '1.8')
        .text(faq.answer)

      // Toggle on click
      header.on('click', function() {
        const isOpen = content.style('max-height') !== '0px'
        const newHeight = isOpen ? '0' : '200px'
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
        faqItem
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
