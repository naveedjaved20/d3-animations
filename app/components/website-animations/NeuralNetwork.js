'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function NeuralNetwork() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 600

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('Interactive Neural Network')

    const layers = [8, 12, 10, 6] // Nodes per layer
    const nodes = []
    const links = []

    // Create nodes
    layers.forEach((count, layerIndex) => {
      const layerWidth = width / (layers.length + 1)
      const x = layerWidth * (layerIndex + 1)
      const spacing = height / (count + 1)

      for (let i = 0; i < count; i++) {
        nodes.push({
          id: nodes.length,
          layer: layerIndex,
          x,
          y: spacing * (i + 1),
          vx: 0,
          vy: 0,
          activation: Math.random(),
        })
      }
    })

    // Create links
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayerNodes = nodes.filter(n => n.layer === i)
      const nextLayerNodes = nodes.filter(n => n.layer === i + 1)

      currentLayerNodes.forEach(source => {
        nextLayerNodes.forEach(target => {
          links.push({
            source: source.id,
            target: target.id,
            weight: Math.random(),
          })
        })
      })
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('x', d3.forceX(d => d.x).strength(0.8))
      .force('y', d3.forceY(d => d.y).strength(0.8))

    const color = d3.scaleSequential(d3.interpolateViridis).domain([0, 1])

    // Draw links with animated pulses
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => color(d.weight))
      .attr('stroke-width', d => Math.abs(d.weight) * 3)
      .attr('stroke-opacity', 0.3)

    // Draw nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 12)
      .attr('fill', d => color(d.activation))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('click', function(event, d) {
        // Propagate activation
        d.activation = 1
        d3.select(this).attr('fill', color(1))

        // Animate pulse
        const pulse = svg
          .append('circle')
          .attr('cx', d.x)
          .attr('cy', d.y)
          .attr('r', 12)
          .attr('fill', 'none')
          .attr('stroke', color(1))
          .attr('stroke-width', 3)
          .attr('opacity', 1)

        pulse
          .transition()
          .duration(1000)
          .attr('r', 100)
          .attr('opacity', 0)
          .remove()

        // Propagate to connected nodes
        links
          .filter(l => l.source.id === d.id || l.target.id === d.id)
          .forEach(l => {
            const target = l.source.id === d.id ? l.target : l.source
            target.activation = Math.min(1, target.activation + 0.3)
            node.filter(n => n.id === target.id).attr('fill', color(target.activation))
          })
      })

    // Animate activations
    function animateActivations() {
      nodes.forEach(n => {
        n.activation = Math.max(0, n.activation - 0.01)
        node.filter(d => d.id === n.id).attr('fill', color(n.activation))
      })
      requestAnimationFrame(animateActivations)
    }

    animateActivations()

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node.attr('cx', d => d.x).attr('cy', d => d.y)
    })

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
