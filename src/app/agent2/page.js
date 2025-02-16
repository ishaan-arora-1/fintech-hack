"use client"
// export default InsuranceAIDashboard;
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, FileText, AlertCircle, Phone, Activity, Calendar, Shield, 
  MessageSquare, ArrowRight, Wallet, HeartPulse, Plane, X, Info,
  Download, Calculator, History, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const POLICY = {
  name: "Jeevan Anand (LIC)",
  duration: "20 years",
  premium: "₹5,000/year",
  benefit: "₹1.1 lakh on maturity",
  features: "Guaranteed returns + life cover",
  drawback: "Low liquidity",
  type: "Life Insurance",
  icon: Shield,
  startDate: "2020-01-01",
  totalPremiumPaid: "₹25,000",
  currentValue: "₹28,500",
  bonusAccumulated: "₹3,500",
  nextPremiumDate: "2025-03-15",
  hiddenClauses: [
    "Policy becomes void if premium payment is delayed by more than 90 days",
    "Medical claims require minimum 24-hour hospitalization",
    "Pre-existing conditions covered only after 4 years",
    "Maximum claim amount reduces by 10% after age 70"
  ]
};

// Sample data for the financial chart
const financialData = [
  { month: 'Jan', premiums: 5000, value: 5100 },
  { month: 'Feb', premiums: 10000, value: 10300 },
  { month: 'Mar', premiums: 15000, value: 15600 },
  { month: 'Apr', premiums: 20000, value: 21000 },
  { month: 'May', premiums: 25000, value: 28500 }
];

// Sample claim history
const claimHistory = [
  {
    id: 1,
    type: "Medical Expenses",
    date: "2025-01-15",
    amount: "₹15,000",
    status: "approved",
    description: "Hospital admission for fever"
  },
  {
    id: 2,
    type: "Critical Illness",
    date: "2024-11-20",
    amount: "₹50,000",
    status: "pending",
    description: "Diabetes treatment"
  },
  {
    id: 3,
    type: "Accident Coverage",
    date: "2024-09-05",
    amount: "₹25,000",
    status: "rejected",
    description: "Minor injury treatment"
  }
];

const InsuranceAIDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimStep, setClaimStep] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [showHiddenClauses, setShowHiddenClauses] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    claims: true,
    payments: true,
    updates: true
  });
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', message: 'Hello! How can I help you today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Premium Calculator State
  const [calculatorInputs, setCalculatorInputs] = useState({
    age: '',
    coverage: '',
    term: ''
  });

  // Function to handle notification preferences
  const toggleNotificationPreference = (type) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Function to add a new notification
  const addNotification = (notification) => {
    if (notificationPreferences[notification.category]) {
      setNotifications(prev => [...prev, { ...notification, id: Date.now() }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    }
  };

  // Chat functionality
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, { sender: 'user', message: newMessage }]);
      setNewMessage('');
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          message: "I'll help you with that query. Please allow me a moment to check the details." 
        }]);
      }, 1000);
    }
  };

  // Premium Calculator
  const calculatePremium = () => {
    const { age, coverage, term } = calculatorInputs;
    const basePremium = (coverage * term) / (100 - age);
    return Math.round(basePremium * 100) / 100;
  };

  // Policy Health Check Component
  const PolicyHealthCheck = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Policy Health Check</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium">Premium Payment Status</h4>
              <p className="text-sm text-gray-600">All premiums paid on time</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <h4 className="font-medium">Coverage Review</h4>
              <p className="text-sm text-gray-600">Consider increasing coverage</p>
            </div>
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium">Market Analysis</h4>
              <p className="text-sm text-gray-600">Your returns are above market average</p>
            </div>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 relative">
        <div className="mt-4 fixed top-5 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
      {/* Floating Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg bg-white border-l-4 ${
              notification.type === 'warning' ? 'border-yellow-500' :
              notification.type === 'success' ? 'border-green-500' :
              'border-blue-500'
            } animate-slideIn`}
          >
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </div>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-6 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Policy Summary Card */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-80">Total Premium Paid</p>
                  <p className="text-2xl font-bold">{POLICY.totalPremiumPaid}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Current Value</p>
                  <p className="text-2xl font-bold">{POLICY.currentValue}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Net Value</p>
                  <p className="text-2xl font-bold">₹3,500</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <PolicyHealthCheck />
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center">
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-base">File Claim</span>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center">
                <Download className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-base">Download Documents</span>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center">
                <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-base">Chat Support</span>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center">
                <Phone className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-base">Emergency Contact</span>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Claim History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimHistory.map((claim) => (
                  <div key={claim.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full ${
                      claim.status === 'approved' ? 'bg-green-100' :
                      claim.status === 'pending' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      {claim.status === 'approved' ? <CheckCircle className="h-6 w-6 text-green-500" /> :
                       claim.status === 'pending' ? <Clock className="h-6 w-6 text-yellow-500" /> :
                       <XCircle className="h-6 w-6 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{claim.type}</h4>
                      <p className="text-sm text-gray-600">{claim.description}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-500">{claim.date}</span>
                        <span className="text-sm font-medium">{claim.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <LineChart
                  width={800}
                  height={400}
                  data={financialData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="premiums" stroke="#8884d8" name="Total Premiums" />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Policy Value" />
                </LineChart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculator Tab */}
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Premium Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    value={calculatorInputs.age}
                    onChange={(e) => setCalculatorInputs({ ...calculatorInputs, age: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Coverage Amount</label>
                  <input
                    type="number"
                    value={calculatorInputs.coverage}
                    onChange={(e) => setCalculatorInputs({ ...calculatorInputs, coverage: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter coverage amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Term (Years)</label>
                  <input
                    type="number"
                    value={calculatorInputs.term}
                    onChange={(e) => setCalculatorInputs({ ...calculatorInputs, term: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter term length"
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => alert(`Calculated Premium: ₹${calculatePremium()}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Calculate Premium
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notification Preferences</span>
                  <button
                    onClick={() => toggleNotificationPreference('claims')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Toggle Claims
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Contact</span>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Chat with Support
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceAIDashboard;