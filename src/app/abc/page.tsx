"use client";

import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CalendarDays, MessageCircle, FileText, Download, Bot, Upload, Scan, AlertCircle } from 'lucide-react';
import Tesseract from 'tesseract.js';

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

  // Core states for text analysis
  const [textInput, setTextInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // States for image analysis
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Initialize Google AI
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Analysis prompt template
  const getAnalysisPrompt = (content) => `
    give the answer in few short pointers as if youre a policy analyzer explaining something to an old person, and then rate it out of 100, if the policy is above 85, state it as a clean policy.

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

  // Handle file drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processImage(file);
    }
  };

  // Handle file selection
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processImage(file);
    }
  };

  // Process the image using Tesseract
  const processImage = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    try {
      const result = await Tesseract.recognize(imageUrl, 'eng');
      setExtractedText(result.data.text);
      // After extracting text, analyze it with Gemini
      if (result.data.text) {
        const aiResult = await model.generateContent(getAnalysisPrompt(result.data.text));
        const response = await aiResult.response;
        setAnalysisResult(response.text());
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setError("Error processing image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    setSelectedImage(null);
    setExtractedText('');
    setError(null);
    setAnalysisResult('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
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
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Image Analysis</h3>
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer transition-colors ${
                dragActive 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-purple-300 hover:border-purple-500'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                  <p className="text-xl text-purple-600">Scanning document...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-xl text-red-500 mb-4">{error}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : selectedImage ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded policy"
                    className="max-h-48 object-contain mb-4"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-purple-600 mb-4" />
                  <p className="text-xl text-purple-600">Drop your policy image here or click to upload</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Extracted Text Display */}
        {extractedText && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Extracted Text</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">
                {extractedText}
              </pre>
            </div>
          </div>
        )}

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