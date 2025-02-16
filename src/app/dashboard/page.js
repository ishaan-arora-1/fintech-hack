import React from 'react';
import { 
  Upload, 
  Search, 
  Shield, 
  MessageCircle, 
  Calculator, 
  FileText, 
  Settings, 
  Bell, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Navigation */}
      <div className='w-screen flex justify-center'>
        <div className='text-8xl font-bold my-8 shadow-xl shadow-purple-600 rounded-lg'>SukhSecure</div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Scan Clauses */}
          <Link href="/textanalysis">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Shield className="w-7 h-7 text-purple-600" />
                <span>Find Hidden Clauses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                <Upload className="w-10 h-10 mx-auto text-purple-400 mb-3" />
                <p className="text-base text-gray-600">Click to Reveal the Truths of the Terms and Conditions
                </p>
              </div>
              <div className="mt-6">
                <div className="w-full bg-purple-100 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Buy Preferred Policies */}
          <Link href="/policy">
          <Card className="md:col-span-2 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Buy Preferred Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Health Insurance', 'Life Insurance', 'Home Insurance', 'Auto Insurance'].map((policy) => (
                  <div key={policy} className="p-6 border rounded-lg hover:border-purple-400 transition-colors">
                    <h3 className="text-lg font-semibold mb-3">{policy}</h3>
                    <p className="text-base text-gray-600 mb-5">Comprehensive coverage tailored to your needs</p>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-base">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Policy Marketplace */}
          <Link href="/marketplace">
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Policy Marketplace</CardTitle>
              <div className="flex items-center space-x-6 mt-5">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search policies..."
                    className="w-full pl-12 pr-4 py-3 text-base border rounded-lg focus:outline-none focus:border-purple-400"
                  />
                </div>
                <select className="border rounded-lg px-6 py-3 text-base focus:outline-none focus:border-purple-400">
                  <option>All Categories</option>
                  <option>Health</option>
                  <option>Life</option>
                  <option>Property</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="p-6 border rounded-lg hover:border-purple-400 transition-colors">
                    <h3 className="text-lg font-semibold mb-3">Premium Policy {item}</h3>
                    <p className="text-base text-gray-600 mb-5">Starting from $99/month</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-medium text-base">Learn More</span>
                      <ChevronRight className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </Link>
          <Link href="agent2">
          {/* AI Agent */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <MessageCircle className="w-7 h-7 text-purple-600" />
                <span>AI Policy Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-base">Your health insurance renewal is due in 15 days</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-base">New policy recommendations available</p>
                </div>
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-base">
                  Chat with AI
                </button>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Retirement Planning */}
          <Link href = "/retire">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Calculator className="w-7 h-7 text-purple-600" />
                <span>Retirement Planning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="bg-purple-50 rounded-lg p-5">
                  <h4 className="text-lg font-medium mb-3">Progress to Goal</h4>
                  <div className="w-full bg-purple-100 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full w-2/3"></div>
                  </div>
                  <p className="text-base text-gray-600 mt-3">You're 67% towards your goal</p>
                </div>
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-base">
                  Update Plan
                </button>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Will Division */}
          <Link href="/assets">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <FileText className="w-7 h-7 text-purple-600" />
                <span>Will Division AI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <span className="text-base font-medium">Document Status</span>
                  <span className="text-base text-purple-600">In Progress</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full w-1/3"></div>
                </div>
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-base">
                  Continue Setup
                </button>
              </div>
            </CardContent>
          </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;