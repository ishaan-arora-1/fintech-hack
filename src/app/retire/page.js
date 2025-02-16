"use client"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowRight, Download, Clock, DollarSign, Briefcase, Target, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Link from 'next/link';

const RetirementPlanner = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [roadmapData, setRoadmapData] = useState(null); // Add this state
    const [formData, setFormData] = useState({
        currentAge: '',
        retirementAge: '',
        currentIncome: '',
        yearsEarning: '',
        currentSavings: '',
        totalAssets: '',
        totalLiabilities: '',
        desiredMonthlyIncome: '',
        inflationRate: '3',
        riskAppetite: 'medium'
    });

    const generateRetirementRoadmap = async () => {
        setIsLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
        try {
            const prompt = `Based on the following retirement planning data, create a detailed retirement roadmap and recommendations:
          
    Current Age: ${formData.currentAge}
    Desired Retirement Age: ${formData.retirementAge}
    Current Annual Income: $${formData.currentIncome}
    Years Working: ${formData.yearsEarning}
    Current Savings: $${formData.currentSavings}
    Total Assets: $${formData.totalAssets}
    Total Liabilities: $${formData.totalLiabilities}
    Desired Monthly Retirement Income: $${formData.desiredMonthlyIncome}
    Expected Inflation Rate: ${formData.inflationRate}%
    Risk Appetite: ${formData.riskAppetite}
    
    You are a retirement planning expert. Based on the user inputs, generate a personalized retirement roadmap with actionable steps and milestones. Return the output in JSON format.
    
    Output Format:
    {
      "roadmap": {
        "milestones": [
          {
            "age": {X},
            "action": "{Action}"
          },
          {
            "age": {Y},
            "action": "{Action}"
          }
        ],
        "recommendations": [
          {
            "title": "{Title}",
            "description": "{Description}"
          },
          {
            "title": "{Title}",
            "description": "{Description}"
          }
        ],
        "visualizations": {
          "projectedSavings": [
            {
              "age": {X},
              "savings": {Amount},
              "required": {Amount}
            }
          ]
        }
      }
    }
    
    Instructions:
    1. Provide key milestones with actionable steps for each age.
    2. Include recommendations for savings, investments, and debt management.
    3. Generate a projected savings vs required savings visualization.
    4. Keep the roadmap concise, actionable, and easy to understand.`;
    
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
    
            // Clean the response by removing Markdown code block syntax
            const cleanedResponse = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
            // Parse the cleaned response into JSON
            try {
                const parsedData = JSON.parse(cleanedResponse);
                setRoadmapData(parsedData.roadmap); // Set the roadmap data
                setAnalysisResult(text);
                setShowRoadmap(true);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                setAnalysisResult('Error parsing the roadmap data. Please try again.');
            }
        } catch (error) {
            console.error('Error generating retirement roadmap:', error);
            setAnalysisResult('Error generating the roadmap. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        generateRetirementRoadmap();
    };

    // Sample data for visualizations
    const projectedSavings = Array.from({ length: 30 }, (_, i) => ({
        age: formData.currentAge ? Number(formData.currentAge) + i : 30 + i,
        savings: Math.pow(1.08, i) * (formData.currentSavings ? Number(formData.currentSavings) : 100000),
        required: Math.pow(1.05, i) * 100000
    }));

    return (
        <div className="min-h-screen relative bg-white">
            <div className="mt-4 absolute top-4 z-20 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
            {/* Header */}
            <header className="fixed top-0 w-full bg-white shadow-sm z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-indigo-600">RetirePlan</h1>
                            <p className="hidden md:block text-gray-600">Plan Your Retirement with Confidence</p>
                        </div>

                        <nav className="hidden md:flex items-center space-x-6">
                            <a href="#input" className="text-gray-600 hover:text-indigo-600">Input Details</a>
                            <a href="#roadmap" className="text-gray-600 hover:text-indigo-600">Your Roadmap</a>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Get Started
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-indigo-50 to-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your Retirement, Your Way
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Answer a few questions, and we'll create a personalized roadmap for your golden years
                    </p>
                    <a
                        href="#input"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </section>

            {/* Multi-step Form */}
            <section id="input" className="py-16">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <div className="flex justify-between mb-8">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`flex flex-col items-center ${currentStep >= step ? 'text-indigo-600' : 'text-gray-400'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                    ${currentStep >= step ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>
                                        {step}
                                    </div>
                                    <span className="text-xs mt-2">Step {step}</span>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Current Age</label>
                                        <input
                                            type="number"
                                            value={formData.currentAge}
                                            onChange={(e) => setFormData({ ...formData, currentAge: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
                                        <input
                                            type="number"
                                            value={formData.retirementAge}
                                            onChange={(e) => setFormData({ ...formData, retirementAge: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold mb-4">Earnings and Savings</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Current Annual Income</label>
                                        <input
                                            type="number"
                                            value={formData.currentIncome}
                                            onChange={(e) => setFormData({ ...formData, currentIncome: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Years Since Earning</label>
                                        <input
                                            type="number"
                                            value={formData.yearsEarning}
                                            onChange={(e) => setFormData({ ...formData, yearsEarning: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Current Savings</label>
                                        <input
                                            type="number"
                                            value={formData.currentSavings}
                                            onChange={(e) => setFormData({ ...formData, currentSavings: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold mb-4">Assets and Liabilities</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Total Assets</label>
                                        <input
                                            type="number"
                                            value={formData.totalAssets}
                                            onChange={(e) => setFormData({ ...formData, totalAssets: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Total Liabilities</label>
                                        <input
                                            type="number"
                                            value={formData.totalLiabilities}
                                            onChange={(e) => setFormData({ ...formData, totalLiabilities: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold mb-4">Retirement Goals</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Desired Monthly Income Post-Retirement</label>
                                        <input
                                            type="number"
                                            value={formData.desiredMonthlyIncome}
                                            onChange={(e) => setFormData({ ...formData, desiredMonthlyIncome: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Expected Inflation Rate (%)</label>
                                        <select
                                            value={formData.inflationRate}
                                            onChange={(e) => setFormData({ ...formData, inflationRate: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="2">2%</option>
                                            <option value="3">3%</option>
                                            <option value="4">4%</option>
                                            <option value="5">5%</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Risk Appetite</label>
                                        <select
                                            value={formData.riskAppetite}
                                            onChange={(e) => setFormData({ ...formData, riskAppetite: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                                    >
                                        Generate My Retirement Roadmap
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Loading State */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
                        <p className="text-lg text-gray-700">Creating your personalized retirement roadmap...</p>
                    </div>
                </div>
            )}

            {/* Retirement Roadmap */}
            {showRoadmap && (
                <section id="roadmap" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">Your Retirement Roadmap</h3>
                                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                    <Download className="h-5 w-5 mr-2" />
                                    Download PDF
                                </button>
                            </div>

                            {/* Render roadmapData if available */}
                            {roadmapData && (
                                <>
                                    <div className="mb-8">
                                        <h4 className="text-lg font-semibold mb-4">Key Milestones</h4>
                                        <div className="space-y-4">
                                            {roadmapData.milestones.map((milestone, index) => (
                                                <div key={index} className="bg-indigo-50 rounded-lg p-4">
                                                    <h5 className="font-semibold">Age {milestone.age}</h5>
                                                    <p>{milestone.action}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="text-lg font-semibold mb-4">Recommendations</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {roadmapData.recommendations.map((rec, index) => (
                                                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                                    <h5 className="font-semibold text-indigo-600 mb-2">{rec.title}</h5>
                                                    <p>{rec.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h4 className="text-lg font-semibold mb-4">Projected Savings vs Required</h4>
                                        <div className="overflow-x-auto">
                                            <LineChart
                                                width={800}
                                                height={400}
                                                data={roadmapData.visualizations.projectedSavings}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="age" label={{ value: 'Age', position: 'bottom' }} />
                                                <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'left' }} />
                                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="savings"
                                                    stroke="#8884d8"
                                                    name="Projected Savings"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="required"
                                                    stroke="#82ca9d"
                                                    name="Required Savings"
                                                />
                                            </LineChart>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
export default RetirementPlanner;