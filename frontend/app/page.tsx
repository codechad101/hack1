'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: "🌳",
      title: "Tree Registration",
      description: "Register trees with GPS location and generate unique QR codes for digital passports"
    },
    {
      icon: "🗺️",
      title: "Interactive Map",
      description: "View all trees and volunteer tasks on a beautiful interactive map dashboard"
    },
    {
      icon: "🤖",
      title: "AI Health Tracking",
      description: "Monitor tree health with AI-powered image analysis and automated alerts"
    },
    {
      icon: "💧",
      title: "Watering Guidance",
      description: "Get personalized watering schedules and best practices for each tree"
    },
    {
      icon: "👨‍🔬",
      title: "Expert Reviews",
      description: "Connect with certified botanists for professional tree care guidance"
    },
    {
      icon: "📊",
      title: "Impact Metrics",
      description: "Track oxygen production, CO₂ absorption, and environmental impact"
    }
  ];

  const stats = [
    { value: "10K+", label: "Trees Tracked" },
    { value: "5K+", label: "Active Volunteers" },
    { value: "250+", label: "Cities" },
    { value: "2M kg", label: "CO₂ Absorbed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              GreenPulse
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact</a>
          </div>
          <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-cyan-600 bg-clip-text text-transparent">
                  Track, Care, Verify
                </span>
                <br />
                <span className="text-gray-900">Every Tree Counts</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of volunteers using AI-powered tools to track tree health,
                coordinate care activities, and measure environmental impact in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shimmer">
                  Start Tracking Trees
                </button>
                <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative animate-float">
              <Image
                src="/hero.png"
                alt="Community caring for trees"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl"
                priority
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="text-3xl font-bold text-emerald-600">98%</div>
                <div className="text-sm text-gray-600">Tree Survival Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="impact" className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-emerald-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to make a real environmental impact</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Community-Powered Tree Care
            </span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            GreenPulse connects volunteers, organizers, and botanists in a unified platform
            to ensure every planted tree receives the care it needs to thrive. Using AI-powered
            health monitoring, automated task creation, and real-time impact tracking, we're
            making urban forestry more effective and measurable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-full px-6 py-3 shadow-md">
              <span className="font-semibold text-emerald-600">🌍 Sustainable Development</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-md">
              <span className="font-semibold text-emerald-600">🤝 Community First</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-md">
              <span className="font-semibold text-emerald-600">🔬 Science-Backed</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Join thousands of volunteers tracking and caring for trees in your community
          </p>
          <button className="bg-white text-emerald-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🌱</span>
            <span className="text-2xl font-bold text-white">GreenPulse</span>
          </div>
          <p className="mb-4">Making every tree count through technology and community</p>
          <div className="text-sm text-gray-500">
            © 2026 GreenPulse. Built for a greener tomorrow.
          </div>
        </div>
      </footer>
    </div>
  );
}
