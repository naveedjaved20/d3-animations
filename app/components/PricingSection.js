'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PricingSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const plans = [
      {
        name: 'Starter',
        price: 29,
        features: ['5 Projects', '10GB Storage', 'Email Support'],
        color: '#667eea',
        popular: false,
      },
      {
        name: 'Professional',
        price: 79,
        features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
        color: '#764ba2',
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 199,
        features: ['Everything in Pro', 'Custom Solutions', 'Dedicated Manager', '24/7 Support'],
        color: '#f093fb',
        popular: false,
      },
    ]

    plans.forEach((plan, i) => {
      const x = i * 320
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', x + 'px')
        .style('top', '0px')
        .style('width', '300px')
        .style('height', '450px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', plan.popular ? '0 15px 40px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.1)')
        .style('padding', '30px')
        .style('border', plan.popular ? `3px solid ${plan.color}` : 'none')
        .style('opacity', 0)
        .style('transform', 'translateY(30px)')
        .style('transition', 'all 0.5s ease')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .style('transform', 'translateY(-10px)')
            .style('box-shadow', '0 20px 50px rgba(0,0,0,0.3)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('transform', 'translateY(0px)')
            .style('box-shadow', plan.popular ? '0 15px 40px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.1)')
        })

      // Popular badge
      if (plan.popular) {
        card
          .append('div')
          .style('position', 'absolute')
          .style('top', '-15px')
          .style('left', '50%')
          .style('transform', 'translateX(-50%)')
          .style('background', plan.color)
          .style('color', 'white')
          .style('padding', '5px 20px')
          .style('border-radius', '20px')
          .style('font-size', '12px')
          .style('font-weight', 'bold')
          .text('POPULAR')
      }

      // Plan name
      card
        .append('div')
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('text-align', 'center')
        .style('margin-bottom', '20px')
        .text(plan.name)

      // Price
      const priceDiv = card
        .append('div')
        .style('text-align', 'center')
        .style('margin-bottom', '30px')

      priceDiv
        .append('span')
        .style('font-size', '14px')
        .style('color', '#666')
        .text('$')

      priceDiv
        .append('span')
        .style('font-size', '48px')
        .style('font-weight', 'bold')
        .style('color', plan.color)
        .text('0')

      // Animate price
      setTimeout(() => {
        priceDiv.select('span:last-child')
          .transition()
          .duration(1000)
          .tween('text', function() {
            const interpolate = d3.interpolate(0, plan.price)
            return function(t) {
              this.textContent = Math.round(interpolate(t))
            }
          })
      }, 500 + i * 200)

      priceDiv
        .append('span')
        .style('font-size', '14px')
        .style('color', '#666')
        .text('/month')

      // Features
      const featuresDiv = card.append('div').style('margin-bottom', '30px')

      plan.features.forEach((feature, j) => {
        const featureDiv = featuresDiv
          .append('div')
          .style('display', 'flex')
          .style('align-items', 'center')
          .style('margin-bottom', '15px')
          .style('opacity', 0)

        featureDiv
          .append('span')
          .style('color', plan.color)
          .style('margin-right', '10px')
          .style('font-size', '18px')
          .text('✓')

        featureDiv
          .append('span')
          .style('font-size', '14px')
          .style('color', '#666')
          .text(feature)

        featureDiv
          .transition()
          .duration(400)
          .delay(800 + i * 200 + j * 100)
          .style('opacity', 1)
      })

      // CTA Button
      const button = card
        .append('div')
        .style('background', plan.color)
        .style('color', 'white')
        .style('text-align', 'center')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('font-weight', 'bold')
        .style('cursor', 'pointer')
        .style('opacity', 0)
        .text('Get Started')
        .on('mouseenter', function() {
          d3.select(this).style('opacity', 0.9)
        })
        .on('mouseleave', function() {
          d3.select(this).style('opacity', 1)
        })

      button
        .transition()
        .duration(400)
        .delay(1200 + i * 200)
        .style('opacity', 1)

      // Animate card entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')
      }, i * 200)
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
      <div ref={containerRef} style={{ position: 'relative', width: '1000px', height: '500px' }}></div>
    </div>
  )
}
