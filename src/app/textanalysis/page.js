"use client";
import Link from 'next/link';

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const quotes = [
    { text: "68% of insurance policies contain hidden renewal clauses", source: "Financial Times" },
    { text: "1 in 3 users unknowingly accept automatic subscription renewals", source: "Consumer Reports" },
    { text: "82% of service agreements have buried termination fees", source: "Tech Policy Institute" },
  ];

  const features = [
    "Real-time Scanning",
    "AI Clause Detection",
    "Legal Jargon Translator",
    "Auto-Renewal Alerts",
    "Fee Calculators",
    "Compliance Checks",
  ];

  // Core states
  const [textInput, setTextInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize Google AI
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Analysis prompt template
  const getAnalysisPrompt = (content) => `
  add specific pros and cons of the policy, give reasons why its good and why its not, and dont add ** and * and stuff,do proper formatting
  give the answer in few short pointers as if youre a policy analyzer explaining something to an old person, dont use words like grandpa or anything, and then rate it out of 100, if the policy is above 85, state it as a clean policy.

    Analyze this document and identify:
    1. Hidden Clauses and Terms:
       - Terms that may be disadvantageous to the customer
       - Unusual or non-standard conditions
       - Potentially unfair terms

    2. Financial Obligations:
       - All fees, charges, and payments
       - Variable or conditional costs
       - Penalty clauses

    3. Important Dates and Deadlines:
       - Renewal dates and conditions
       - Required notice periods
       - Time-sensitive requirements

    4. Risk Assessment:
       - Rate issues (1-5 scale)
       - Provide recommendations
       - Suggest modifications

    Document content:
    ${content}
  `;

  // Text analysis function
  const analyzeText = async () => {
    if (!textInput.trim()) {
      alert("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult("");

    try {
      const result = await model.generateContent(getAnalysisPrompt(textInput));
      const response = await result.response;
      setAnalysisResult(response.text());
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult("Error analyzing the document. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Image analysis function
  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    setAnalysisResult("");

    try {
      const imageContent = imageData.split(',')[1];
      const result = await model.generateContent(getAnalysisPrompt(imageContent));
      const response = await result.response;
      setAnalysisResult(response.text());
    } catch (error) {
      console.error('Image analysis error:', error);
      setAnalysisResult("Error analyzing the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload a valid image file (PNG, JPG, etc.)");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      alert("File is too large. Please upload an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.onerror = () => alert('Error reading the image file. Please try again.');
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-purple-50 relative">
      <div className="mt-4 absolute top-5 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
      {/* Header */}
      <header className="bg-purple-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">PolicyScan Pro</h1>
          <p className="text-xl">Uncover hidden clauses in your contracts</p>
        </div>
      </header>

      {/* Quotes Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-800">
              <p className="text-gray-700 mb-4">"{quote.text}"</p>
              <p className="text-purple-600 font-medium">– {quote.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analysis Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text Analysis */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Text Analysis</h3>
            <textarea
              placeholder="Paste your document text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-48 p-4 border-2 border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-4"
            />
            <button
              onClick={analyzeText}
              disabled={isAnalyzing}
              className="w-full bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900 transition-colors duration-200"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Text"}
            </button>
          </div>

          {/* Image Upload */}
          <Link href="/imageanalysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Image Analysis</h3>
            
            <button
              className="w-full bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900 transition-colors duration-200"
            >
              Upload
            </button>
          </div>
          </div>
          </Link>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Analysis Results</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">
                {analysisResult}
              </pre>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-purple-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-white text-2xl font-bold mb-6">Key Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-xl">
                <div className="text-purple-800 font-bold">✨ {feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}