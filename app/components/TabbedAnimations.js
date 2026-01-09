"use client";

import { useState } from "react";
import HumanDesignChart from "./HumanDesignChart";
import BarChart from "./BarChart";
import NetworkGraph from "./NetworkGraph";
import ParticleAnimation from "./ParticleAnimation";
import StatisticsDashboard from "./StatisticsDashboard";
import Timeline from "./Timeline";
import PieChart from "./PieChart";
import FlowChart from "./FlowChart";
import HeroSection1 from "./HeroSection1";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";
import CardAnimation1 from "./CardAnimation1";
import CardAnimation2 from "./CardAnimation2";
import CardAnimation3 from "./CardAnimation3";
import CardAnimation4 from "./CardAnimation4";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import ProjectsGallery from "./ProjectsGallery";
import PricingSection from "./PricingSection";
import TreeDiagram from "./TreeDiagram";
import ChordDiagram from "./ChordDiagram";
import SunburstChart from "./SunburstChart";
import SankeyDiagram from "./SankeyDiagram";
import RadarChart from "./RadarChart";
import Heatmap from "./Heatmap";
import BubbleChart from "./BubbleChart";
import Treemap from "./Treemap";
import GaugeChart from "./GaugeChart";
import AnimatedLineChart from "./AnimatedLineChart";
import VoronoiDiagram from "./VoronoiDiagram";
import Streamgraph from "./Streamgraph";
import BarRaceChart from "./BarRaceChart";
import InteractiveScatter from "./InteractiveScatter";
import DonutChart from "./DonutChart";
import InteractiveNetwork from "./InteractiveNetwork";
import MorphingBlob from "./MorphingBlob";
import AnimatedGradientMesh from "./AnimatedGradientMesh";
import ConstellationEffect from "./ConstellationEffect";
import AnimatedWaves from "./AnimatedWaves";
import MagneticParticles from "./MagneticParticles";
import FlightPaths from "./FlightPaths";

const tabs = [
  { id: "human-design", label: "Human Design", component: HumanDesignChart },
  { id: "bar-chart", label: "Bar Chart", component: BarChart },
  { id: "network", label: "Network Graph", component: NetworkGraph },
  { id: "particles", label: "Particles", component: ParticleAnimation },
  { id: "statistics", label: "Statistics", component: StatisticsDashboard },
  { id: "timeline", label: "Timeline", component: Timeline },
  { id: "pie-chart", label: "Pie Chart", component: PieChart },
  { id: "flowchart", label: "Flow Chart", component: FlowChart },
  { id: "hero-1", label: "Hero Section 1", component: HeroSection1 },
  { id: "hero-2", label: "Hero Section 2", component: HeroSection2 },
  { id: "hero-3", label: "Hero Section 3", component: HeroSection3 },
  { id: "card-1", label: "Card Style 1", component: CardAnimation1 },
  { id: "card-2", label: "Card Style 2", component: CardAnimation2 },
  { id: "card-3", label: "Card Style 3", component: CardAnimation3 },
  { id: "card-4", label: "Card Style 4", component: CardAnimation4 },
  { id: "about", label: "About Section", component: AboutSection },
  { id: "services", label: "Services", component: ServicesSection },
  { id: "testimonials", label: "Testimonials", component: TestimonialsSection },
  { id: "skills", label: "Skills", component: SkillsSection },
  { id: "contact", label: "Contact", component: ContactSection },
  { id: "projects", label: "Projects", component: ProjectsGallery },
  { id: "pricing", label: "Pricing", component: PricingSection },
  { id: "tree", label: "Tree Diagram", component: TreeDiagram },
  { id: "chord", label: "Chord Diagram", component: ChordDiagram },
  { id: "sunburst", label: "Sunburst", component: SunburstChart },
  { id: "sankey", label: "Sankey", component: SankeyDiagram },
  { id: "radar", label: "Radar Chart", component: RadarChart },
  { id: "heatmap", label: "Heatmap", component: Heatmap },
  { id: "bubble", label: "Bubble Chart", component: BubbleChart },
  { id: "treemap", label: "Treemap", component: Treemap },
  { id: "gauge", label: "Gauge Chart", component: GaugeChart },
  { id: "animated-line", label: "Animated Line", component: AnimatedLineChart },
  { id: "voronoi", label: "Voronoi", component: VoronoiDiagram },
  { id: "streamgraph", label: "Streamgraph", component: Streamgraph },
  { id: "bar-race", label: "Bar Race", component: BarRaceChart },
  {
    id: "interactive-scatter",
    label: "Interactive Scatter",
    component: InteractiveScatter,
  },
  { id: "donut", label: "Donut Chart", component: DonutChart },
  { id: "interactive-network", label: "Interactive Network", component: InteractiveNetwork },
  { id: "morphing-blob", label: "Morphing Blob", component: MorphingBlob },
  { id: "gradient-mesh", label: "Gradient Mesh", component: AnimatedGradientMesh },
  { id: "constellation", label: "Constellation", component: ConstellationEffect },
  { id: "animated-waves", label: "Animated Waves", component: AnimatedWaves },
  { id: "magnetic-particles", label: "Magnetic Particles", component: MagneticParticles },
  { id: "flight-paths", label: "Flight Paths", component: FlightPaths },
];

export default function TabbedAnimations() {
  const [activeTab, setActiveTab] = useState("human-design");

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || HumanDesignChart;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "2rem",
          fontSize: "2.5rem",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Portfolio Animations Gallery
      </h1>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2rem",
          justifyContent: "center",
          padding: "1rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              background:
                activeTab === tab.id
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.2)",
              color: activeTab === tab.id ? "#333" : "white",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: activeTab === tab.id ? "600" : "400",
              transition: "all 0.3s ease",
              boxShadow:
                activeTab === tab.id ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "2rem",
          minHeight: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActiveComponent />
      </div>
    </div>
  );
}
