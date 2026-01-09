'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function HumanDesignChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 1050
    const centerX = width / 2
    const centerY = height / 2

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Define the 9 centers with their positions and properties
    const centers = [
      { id: 'head', name: 'Head', x: centerX, y: 80, color: '#FF6B6B', radius: 50, defined: true },
      { id: 'ajna', name: 'Ajna', x: centerX, y: 160, color: '#4ECDC4', radius: 50, defined: true },
      { id: 'throat', name: 'Throat', x: centerX, y: 280, color: '#45B7D1', radius: 50, defined: true },
      { id: 'g', name: 'G', x: centerX, y: 400, color: '#FFA07A', radius: 50, defined: true },
      { id: 'heart', name: 'Heart', x: centerX, y: 520, color: '#FF6B9D', radius: 50, defined: true },
      { id: 'solar', name: 'Solar Plexus', x: centerX, y: 640, color: '#FFD93D', radius: 50, defined: true },
      { id: 'sacral', name: 'Sacral', x: centerX, y: 760, color: '#6BCF7F', radius: 50, defined: true },
      { id: 'root', name: 'Root', x: centerX, y: 900, color: '#A8E6CF', radius: 50, defined: true },
      { id: 'spleen', name: 'Spleen', x: centerX - 120, y: 580, color: '#95E1D3', radius: 50, defined: true },
    ]

    // Define gates for each center (simplified - showing key gates)
    const gates = [
      // Head center gates
      { id: 61, center: 'head', angle: 0, name: 'Gate 61' },
      { id: 63, center: 'head', angle: 60, name: 'Gate 63' },
      { id: 64, center: 'head', angle: 120, name: 'Gate 64' },
      
      // Ajna center gates
      { id: 47, center: 'ajna', angle: 0, name: 'Gate 47' },
      { id: 24, center: 'ajna', angle: 60, name: 'Gate 24' },
      { id: 4, center: 'ajna', angle: 120, name: 'Gate 4' },
      
      // Throat center gates
      { id: 62, center: 'throat', angle: 0, name: 'Gate 62' },
      { id: 23, center: 'throat', angle: 60, name: 'Gate 23' },
      { id: 56, center: 'throat', angle: 120, name: 'Gate 56' },
      { id: 35, center: 'throat', angle: 180, name: 'Gate 35' },
      { id: 12, center: 'throat', angle: 240, name: 'Gate 12' },
      { id: 33, center: 'throat', angle: 300, name: 'Gate 33' },
      
      // G center gates
      { id: 1, center: 'g', angle: 0, name: 'Gate 1' },
      { id: 7, center: 'g', angle: 60, name: 'Gate 7' },
      { id: 13, center: 'g', angle: 120, name: 'Gate 13' },
      { id: 25, center: 'g', angle: 180, name: 'Gate 25' },
      { id: 2, center: 'g', angle: 240, name: 'Gate 2' },
      { id: 10, center: 'g', angle: 300, name: 'Gate 10' },
      
      // Heart center gates
      { id: 21, center: 'heart', angle: 0, name: 'Gate 21' },
      { id: 26, center: 'heart', angle: 60, name: 'Gate 26' },
      { id: 51, center: 'heart', angle: 120, name: 'Gate 51' },
      { id: 40, center: 'heart', angle: 180, name: 'Gate 40' },
      
      // Solar Plexus gates
      { id: 6, center: 'solar', angle: 0, name: 'Gate 6' },
      { id: 22, center: 'solar', angle: 60, name: 'Gate 22' },
      { id: 36, center: 'solar', angle: 120, name: 'Gate 36' },
      { id: 37, center: 'solar', angle: 180, name: 'Gate 37' },
      { id: 30, center: 'solar', angle: 240, name: 'Gate 30' },
      { id: 55, center: 'solar', angle: 300, name: 'Gate 55' },
      
      // Sacral gates
      { id: 5, center: 'sacral', angle: 0, name: 'Gate 5' },
      { id: 14, center: 'sacral', angle: 60, name: 'Gate 14' },
      { id: 29, center: 'sacral', angle: 120, name: 'Gate 29' },
      { id: 34, center: 'sacral', angle: 180, name: 'Gate 34' },
      { id: 59, center: 'sacral', angle: 240, name: 'Gate 59' },
      { id: 9, center: 'sacral', angle: 300, name: 'Gate 9' },
      
      // Root gates
      { id: 19, center: 'root', angle: 0, name: 'Gate 19' },
      { id: 39, center: 'root', angle: 60, name: 'Gate 39' },
      { id: 41, center: 'root', angle: 120, name: 'Gate 41' },
      { id: 58, center: 'root', angle: 180, name: 'Gate 58' },
      { id: 38, center: 'root', angle: 240, name: 'Gate 38' },
      { id: 54, center: 'root', angle: 300, name: 'Gate 54' },
      
      // Spleen gates
      { id: 48, center: 'spleen', angle: 0, name: 'Gate 48' },
      { id: 57, center: 'spleen', angle: 60, name: 'Gate 57' },
      { id: 18, center: 'spleen', angle: 120, name: 'Gate 18' },
      { id: 28, center: 'spleen', angle: 180, name: 'Gate 28' },
      { id: 32, center: 'spleen', angle: 240, name: 'Gate 32' },
      { id: 50, center: 'spleen', angle: 300, name: 'Gate 50' },
    ]

    // Draw human body silhouette (behind everything)
    const bodyGroup = svg.append('g').attr('class', 'human-body')
    
    // Create a more accurate human body silhouette using SVG paths
    // Head - more oval and natural
    bodyGroup
      .append('ellipse')
      .attr('cx', centerX)
      .attr('cy', 60)
      .attr('rx', 42)
      .attr('ry', 48)
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Neck - narrower and more natural
    const neckPath = d3.path()
    neckPath.moveTo(centerX - 22, 108)
    neckPath.quadraticCurveTo(centerX - 18, 125, centerX - 25, 140)
    neckPath.lineTo(centerX - 25, 150)
    neckPath.quadraticCurveTo(centerX - 20, 155, centerX, 155)
    neckPath.quadraticCurveTo(centerX + 20, 155, centerX + 25, 150)
    neckPath.lineTo(centerX + 25, 140)
    neckPath.quadraticCurveTo(centerX + 18, 125, centerX + 22, 108)
    neckPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', neckPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Torso - more natural proportions with shoulders, waist, and hips
    const torsoPath = d3.path()
    // Start from left shoulder
    torsoPath.moveTo(centerX - 28, 155)
    // Left shoulder curve
    torsoPath.quadraticCurveTo(centerX - 50, 160, centerX - 65, 180)
    // Left side of chest
    torsoPath.quadraticCurveTo(centerX - 70, 220, centerX - 68, 280)
    // Left side of waist
    torsoPath.quadraticCurveTo(centerX - 65, 340, centerX - 60, 400)
    // Left side of lower torso
    torsoPath.quadraticCurveTo(centerX - 58, 480, centerX - 55, 560)
    // Left hip
    torsoPath.quadraticCurveTo(centerX - 50, 640, centerX - 45, 700)
    // Left side of pelvis
    torsoPath.quadraticCurveTo(centerX - 40, 740, centerX - 30, 760)
    // Bottom of pelvis
    torsoPath.quadraticCurveTo(centerX - 15, 770, centerX, 775)
    // Right side of pelvis
    torsoPath.quadraticCurveTo(centerX + 15, 770, centerX + 30, 760)
    // Right hip
    torsoPath.quadraticCurveTo(centerX + 40, 740, centerX + 45, 700)
    // Right side of lower torso
    torsoPath.quadraticCurveTo(centerX + 50, 640, centerX + 55, 560)
    // Right side of waist
    torsoPath.quadraticCurveTo(centerX + 58, 480, centerX + 60, 400)
    // Right side of chest
    torsoPath.quadraticCurveTo(centerX + 65, 340, centerX + 68, 280)
    // Right side of upper chest
    torsoPath.quadraticCurveTo(centerX + 70, 220, centerX + 65, 180)
    // Right shoulder curve
    torsoPath.quadraticCurveTo(centerX + 50, 160, centerX + 28, 155)
    torsoPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', torsoPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Right upper arm
    const rightUpperArmPath = d3.path()
    rightUpperArmPath.moveTo(centerX + 65, 180)
    rightUpperArmPath.quadraticCurveTo(centerX + 85, 200, centerX + 100, 250)
    rightUpperArmPath.quadraticCurveTo(centerX + 105, 300, centerX + 100, 350)
    rightUpperArmPath.quadraticCurveTo(centerX + 95, 380, centerX + 85, 400)
    rightUpperArmPath.quadraticCurveTo(centerX + 75, 410, centerX + 65, 400)
    rightUpperArmPath.quadraticCurveTo(centerX + 55, 390, centerX + 60, 350)
    rightUpperArmPath.quadraticCurveTo(centerX + 65, 300, centerX + 70, 250)
    rightUpperArmPath.quadraticCurveTo(centerX + 60, 200, centerX + 65, 180)
    rightUpperArmPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', rightUpperArmPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Right forearm
    const rightForearmPath = d3.path()
    rightForearmPath.moveTo(centerX + 85, 400)
    rightForearmPath.quadraticCurveTo(centerX + 95, 420, centerX + 105, 460)
    rightForearmPath.quadraticCurveTo(centerX + 110, 500, centerX + 108, 540)
    rightForearmPath.quadraticCurveTo(centerX + 105, 560, centerX + 100, 570)
    rightForearmPath.quadraticCurveTo(centerX + 90, 575, centerX + 80, 570)
    rightForearmPath.quadraticCurveTo(centerX + 75, 565, centerX + 78, 540)
    rightForearmPath.quadraticCurveTo(centerX + 80, 500, centerX + 75, 460)
    rightForearmPath.quadraticCurveTo(centerX + 70, 420, centerX + 85, 400)
    rightForearmPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', rightForearmPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Left upper arm
    const leftUpperArmPath = d3.path()
    leftUpperArmPath.moveTo(centerX - 65, 180)
    leftUpperArmPath.quadraticCurveTo(centerX - 60, 200, centerX - 70, 250)
    leftUpperArmPath.quadraticCurveTo(centerX - 65, 300, centerX - 100, 350)
    leftUpperArmPath.quadraticCurveTo(centerX - 95, 380, centerX - 85, 400)
    leftUpperArmPath.quadraticCurveTo(centerX - 75, 410, centerX - 65, 400)
    leftUpperArmPath.quadraticCurveTo(centerX - 55, 390, centerX - 60, 350)
    leftUpperArmPath.quadraticCurveTo(centerX - 55, 300, centerX - 50, 250)
    leftUpperArmPath.quadraticCurveTo(centerX - 85, 200, centerX - 65, 180)
    leftUpperArmPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', leftUpperArmPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Left forearm
    const leftForearmPath = d3.path()
    leftForearmPath.moveTo(centerX - 85, 400)
    leftForearmPath.quadraticCurveTo(centerX - 70, 420, centerX - 75, 460)
    leftForearmPath.quadraticCurveTo(centerX - 80, 500, centerX - 108, 540)
    leftForearmPath.quadraticCurveTo(centerX - 105, 560, centerX - 100, 570)
    leftForearmPath.quadraticCurveTo(centerX - 90, 575, centerX - 80, 570)
    leftForearmPath.quadraticCurveTo(centerX - 75, 565, centerX - 78, 540)
    leftForearmPath.quadraticCurveTo(centerX - 76, 500, centerX - 105, 460)
    leftForearmPath.quadraticCurveTo(centerX - 95, 420, centerX - 85, 400)
    leftForearmPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', leftForearmPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Right thigh
    const rightThighPath = d3.path()
    rightThighPath.moveTo(centerX + 30, 760)
    rightThighPath.quadraticCurveTo(centerX + 35, 780, centerX + 38, 820)
    rightThighPath.quadraticCurveTo(centerX + 40, 860, centerX + 38, 900)
    rightThighPath.quadraticCurveTo(centerX + 35, 920, centerX + 30, 930)
    rightThighPath.quadraticCurveTo(centerX + 25, 935, centerX + 20, 930)
    rightThighPath.quadraticCurveTo(centerX + 18, 920, centerX + 20, 900)
    rightThighPath.quadraticCurveTo(centerX + 22, 860, centerX + 25, 820)
    rightThighPath.quadraticCurveTo(centerX + 28, 780, centerX + 30, 760)
    rightThighPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', rightThighPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Right calf
    const rightCalfPath = d3.path()
    rightCalfPath.moveTo(centerX + 30, 930)
    rightCalfPath.quadraticCurveTo(centerX + 32, 950, centerX + 35, 980)
    rightCalfPath.quadraticCurveTo(centerX + 38, 1000, centerX + 36, 1015)
    rightCalfPath.quadraticCurveTo(centerX + 33, 1020, centerX + 28, 1018)
    rightCalfPath.quadraticCurveTo(centerX + 25, 1015, centerX + 27, 1000)
    rightCalfPath.quadraticCurveTo(centerX + 28, 980, centerX + 25, 950)
    rightCalfPath.quadraticCurveTo(centerX + 28, 935, centerX + 30, 930)
    rightCalfPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', rightCalfPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Left thigh
    const leftThighPath = d3.path()
    leftThighPath.moveTo(centerX - 30, 760)
    leftThighPath.quadraticCurveTo(centerX - 28, 780, centerX - 25, 820)
    leftThighPath.quadraticCurveTo(centerX - 22, 860, centerX - 20, 900)
    leftThighPath.quadraticCurveTo(centerX - 18, 920, centerX - 20, 930)
    leftThighPath.quadraticCurveTo(centerX - 25, 935, centerX - 30, 930)
    leftThighPath.quadraticCurveTo(centerX - 35, 920, centerX - 38, 900)
    leftThighPath.quadraticCurveTo(centerX - 40, 860, centerX - 38, 820)
    leftThighPath.quadraticCurveTo(centerX - 35, 780, centerX - 30, 760)
    leftThighPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', leftThighPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Left calf
    const leftCalfPath = d3.path()
    leftCalfPath.moveTo(centerX - 30, 930)
    leftCalfPath.quadraticCurveTo(centerX - 28, 935, centerX - 25, 950)
    leftCalfPath.quadraticCurveTo(centerX - 28, 980, centerX - 27, 1000)
    leftCalfPath.quadraticCurveTo(centerX - 25, 1015, centerX - 28, 1018)
    leftCalfPath.quadraticCurveTo(centerX - 33, 1020, centerX - 36, 1015)
    leftCalfPath.quadraticCurveTo(centerX - 38, 1000, centerX - 35, 980)
    leftCalfPath.quadraticCurveTo(centerX - 32, 950, centerX - 30, 930)
    leftCalfPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', leftCalfPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Right foot
    const rightFootPath = d3.path()
    rightFootPath.moveTo(centerX + 28, 1018)
    rightFootPath.quadraticCurveTo(centerX + 30, 1025, centerX + 38, 1030)
    rightFootPath.quadraticCurveTo(centerX + 45, 1032, centerX + 50, 1028)
    rightFootPath.quadraticCurveTo(centerX + 48, 1025, centerX + 42, 1022)
    rightFootPath.quadraticCurveTo(centerX + 35, 1020, centerX + 28, 1018)
    rightFootPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', rightFootPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)
    
    // Left foot
    const leftFootPath = d3.path()
    leftFootPath.moveTo(centerX - 28, 1018)
    leftFootPath.quadraticCurveTo(centerX - 35, 1020, centerX - 42, 1022)
    leftFootPath.quadraticCurveTo(centerX - 48, 1025, centerX - 50, 1028)
    leftFootPath.quadraticCurveTo(centerX - 45, 1032, centerX - 38, 1030)
    leftFootPath.quadraticCurveTo(centerX - 30, 1025, centerX - 28, 1018)
    leftFootPath.closePath()
    
    bodyGroup
      .append('path')
      .attr('d', leftFootPath.toString())
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2.5)
      .attr('opacity', 0.75)

    // Draw connections between centers
    const connections = [
      { from: 'head', to: 'ajna' },
      { from: 'ajna', to: 'throat' },
      { from: 'throat', to: 'g' },
      { from: 'g', to: 'heart' },
      { from: 'heart', to: 'solar' },
      { from: 'solar', to: 'sacral' },
      { from: 'sacral', to: 'root' },
      { from: 'spleen', to: 'heart' },
      { from: 'spleen', to: 'solar' },
    ]

    // Draw connections
    connections.forEach(conn => {
      const fromCenter = centers.find(c => c.id === conn.from)
      const toCenter = centers.find(c => c.id === conn.to)
      if (fromCenter && toCenter) {
        svg
          .append('line')
          .attr('x1', fromCenter.x)
          .attr('y1', fromCenter.y)
          .attr('x2', toCenter.x)
          .attr('y2', toCenter.y)
          .attr('stroke', '#ddd')
          .attr('stroke-width', 2)
          .attr('opacity', 0.3)
      }
    })

    // Draw centers
    centers.forEach(center => {
      const centerGroup = svg.append('g').attr('class', `center-${center.id}`)

      // Center circle
      centerGroup
        .append('circle')
        .attr('cx', center.x)
        .attr('cy', center.y)
        .attr('r', center.radius)
        .attr('fill', center.color)
        .attr('opacity', center.defined ? 0.7 : 0.3)
        .attr('stroke', center.defined ? '#333' : '#999')
        .attr('stroke-width', center.defined ? 3 : 2)
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          d3.select(this).attr('opacity', 0.9).attr('r', center.radius + 5)
        })
        .on('mouseout', function() {
          d3.select(this).attr('opacity', center.defined ? 0.7 : 0.3).attr('r', center.radius)
        })

      // Center label
      centerGroup
        .append('text')
        .attr('x', center.x)
        .attr('y', center.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(center.name)

      // Draw gates for this center
      const centerGates = gates.filter(g => g.center === center.id)
      const gateRadius = center.radius + 30

      centerGates.forEach(gate => {
        const angleRad = (gate.angle * Math.PI) / 180
        const gateX = center.x + gateRadius * Math.cos(angleRad)
        const gateY = center.y + gateRadius * Math.sin(angleRad)

        // Gate circle
        const gateGroup = svg.append('g').attr('class', `gate-${gate.id}`)

        gateGroup
          .append('circle')
          .attr('cx', gateX)
          .attr('cy', gateY)
          .attr('r', 15)
          .attr('fill', '#fff')
          .attr('stroke', center.color)
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')
          .on('mouseover', function() {
            d3.select(this).attr('r', 18).attr('stroke-width', 3)
            tooltip.style('opacity', 1)
          })
          .on('mousemove', function(event) {
            tooltip
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 10) + 'px')
              .html(`<strong>${gate.name}</strong><br/>Center: ${center.name}`)
          })
          .on('mouseout', function() {
            d3.select(this).attr('r', 15).attr('stroke-width', 2)
            tooltip.style('opacity', 0)
          })

        // Gate number
        gateGroup
          .append('text')
          .attr('x', gateX)
          .attr('y', gateY)
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .attr('font-size', '10px')
          .attr('font-weight', 'bold')
          .attr('fill', '#333')
          .text(gate.id)

        // Line from center to gate
        svg
          .append('line')
          .attr('x1', center.x)
          .attr('y1', center.y)
          .attr('x2', gateX)
          .attr('y2', gateY)
          .attr('stroke', center.color)
          .attr('stroke-width', 1)
          .attr('opacity', 0.4)
      })
    })

    // Create tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '8px 12px')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000)

    // Cleanup function
    return () => {
      tooltip.remove()
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
