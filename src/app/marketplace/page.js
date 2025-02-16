"use client"
import React, { useState } from 'react';
import { Search, Upload, ArrowRight, MessageCircle, Menu, X } from 'lucide-react';
import Link from 'next/link';

const PolicyTransferMarketplace = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  
  const policies = [
    {
      type: "Max Bupa Health Companion",
      remainingTerm: "5 years",
      premium: 10000,
      coverage: 100000,
      reason: "Relocating abroad"
    },
    {
      type: "TATA Health Insurance",
      remainingTerm: "2 years",
      premium: 20000,
      coverage: 120000,
      reason: "Switching to employer coverage"
    }
  ];

  return (
    <div className="relative min-h-screen bg-white">
        <div className="mt-4 fixed top-5 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">PolicyTransfer</h1>
              <p className="hidden md:block text-gray-600"></p>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#list" className="text-gray-600 hover:text-blue-600">List Your Policy</a>
              <a href="#browse" className="text-gray-600 hover:text-blue-600">Browse Policies</a>
              <a href="#how" className="text-gray-600 hover:text-blue-600">How It Works</a>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Login / Sign Up
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <a href="#list" className="text-gray-600">List Your Policy</a>
                <a href="#browse" className="text-gray-600">Browse Policies</a>
                <a href="#how" className="text-gray-600">How It Works</a>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Login / Sign Up
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transfer or Take Over Policies Easily
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Solve early policy exits by finding the right match for your policy
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsListingFormOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              List Your Policy
            </button>
            <a 
              href="#browse"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Browse Policies
            </a>
          </div>
        </div>
      </section>

      {/* Policy Listing Form */}
      {isListingFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">List Your Policy</h3>
              <button onClick={() => setIsListingFormOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Policy Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Life Insurance</option>
                  <option>Health Insurance</option>
                  <option>Auto Insurance</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Original Duration</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remaining Term</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Premium Amount</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Coverage Amount</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason for Transfer</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">Upload Policy Documents</span>
                </div>
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Submit Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Policy Browsing Section */}
      <section id="browse" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Browse Available Policies</h3>
          
          {/* Search Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Policy Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Types</option>
                  <option>Life Insurance</option>
                  <option>Health Insurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remaining Term</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Any Term</option>
                  <option>1-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Premium Range</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Any Amount</option>
                  <option>0-15000</option>
                  <option>15000-35000</option>
                  <option>35000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Coverage Amount</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Any Amount</option>
                  <option>Up to 700000</option>
                  <option>700000-1000000</option>
                  <option>1000000+</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{policy.type}</h4>
                    <p className="text-sm text-gray-600">Remaining: {policy.remainingTerm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-blue-600">{policy.premium}/mo</p>
                    <p className="text-sm text-gray-600">Coverage: {policy.coverage.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{policy.reason}</p>
                <button className="w-full px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "List Your Policy",
                description: "Fill out the form and upload documents",
                icon: Upload
              },
              {
                title: "Find a Match",
                description: "Buyers browse and contact you",
                icon: Search
              },
              {
                title: "Transfer Securely",
                description: "Complete the transfer with our assistance",
                icon: ArrowRight
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">PolicyTransfer</h4>
              <p className="text-gray-400">Transfer Your Policy, Find Your Match</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms and Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PolicyTransferMarketplace;