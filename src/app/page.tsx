"use client"
import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  PiggyBank, 
  AlertTriangle, 
  CreditCard,
  Mic,
  Camera,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  

  // Auto-rotate features
  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section with Background Gradient */}
      <header className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative">
          <nav className="flex justify-between items-center mb-16">
            <h1 className="text-3xl font-bold">Sukh Secure</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <Camera className="mr-2 h-4 w-4" />
                Login with Face ID
              </Button>
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <Mic className="mr-2 h-4 w-4" />
                Voice Commands
              </Button>
            </div>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">Empowering Your Golden Years with Ease and Security</h2>
              <p className="text-xl mb-8 text-purple-100">Your trusted AI companion for insurance, retirement, and financial planning</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href='/signup'><Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg">
                  Get Started with Sukh Secure
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button></Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-lg">
                  Learn More About How We Help Seniors
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Happy senior couple using Sukh Secure"
                className="rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -left-6">
                <Button size="lg" className="rounded-full w-16 h-16 bg-purple-600 hover:bg-purple-500 p-0">
                  <Mic className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Quick Actions</h3>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: "Manage Policies", icon: FileText, color: "bg-blue-500" },
                { title: "Retirement Planning", icon: PiggyBank, color: "bg-green-500" },
                { title: "Claims Assistance", icon: Shield, color: "bg-orange-500" },
              ].map((item, index) => (
                <Button
                  key={index}
                  size="lg"
                  className={`${item.color} text-white hover:opacity-90 p-8 h-auto flex-col transform transition-all duration-300 ${
                    activeFeature === index ? 'scale-105 shadow-lg' : 'scale-100'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <item.icon className="h-8 w-8 mb-2" />
                  <span className="text-lg">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section with Animation */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Features</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Designed with seniors in mind, powered by advanced AI</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Personalized Insurance Suggestions",
                description: "AI-powered recommendations tailored to your specific needs and lifestyle",
                color: "bg-blue-50 hover:bg-blue-100"
              },
              {
                icon: FileText,
                title: "Easy Claims Processing",
                description: "Submit and track claims with simple voice commands or just a few clicks",
                color: "bg-green-50 hover:bg-green-100"
              },
              {
                icon: PiggyBank,
                title: "Retirement & Estate Planning",
                description: "Secure your financial future with smart, personalized planning tools",
                color: "bg-yellow-50 hover:bg-yellow-100"
              },
              {
                icon: AlertTriangle,
                title: "Fraud Detection & Protection",
                description: "Advanced AI monitoring to keep your accounts safe and secure",
                color: "bg-red-50 hover:bg-red-100"
              },
              {
                icon: CreditCard,
                title: "Voice-driven Payments",
                description: "Make secure payments using voice commands and facial recognition",
                color: "bg-purple-50 hover:bg-purple-100"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`transform hover:scale-105 transition-all duration-300 ${feature.color}`}
              >
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-purple-900 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Images */}
      {/*  */}

      {/* Trust Badges Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[1, 2, 3, 4].map((badge) => (
              <img 
                key={badge}
                src={`/api/placeholder/120/60`}
                alt={`Trust badge ${badge}`}
                className="h-12 opacity-50 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Gradient */}
      <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Partnerships</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Security Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-800 text-center">
            <p>&copy; 2025 Sukh Secure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;