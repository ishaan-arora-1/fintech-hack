"use client";
import { useState } from 'react';
import { XCircleIcon, PlusCircleIcon, DocumentAddIcon, ArrowRightIcon, ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Link from 'next/link';

export default function EstatePlanning() {
  const [assets, setAssets] = useState([
    { type: 'Property', description: 'Main residence, 123 Main St', value: 450000 },
    { type: 'Cash', description: 'Savings account #4321', value: 75000 },
    { type: 'Stocks', description: 'Investment portfolio', value: 125000 }
  ]);

  const [newAsset, setNewAsset] = useState({
    type: 'Property',
    description: '',
    value: ''
  });

  const [beneficiaries, setBeneficiaries] = useState([]); // State for beneficiaries
  const [newBeneficiary, setNewBeneficiary] = useState(''); // State for new beneficiary input
  const [allocations, setAllocations] = useState([]); // State for asset allocations
  const [estatePlan, setEstatePlan] = useState(null); // State for storing the estate plan
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step

  const assetTypes = ['Property', 'Cash', 'Stocks', 'Valuables', 'Vehicles', 'Business', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset(prev => ({
      ...prev,
      [name]: name === 'value' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const addAsset = () => {
    if (newAsset.description && newAsset.value) {
      setAssets([...assets, { ...newAsset }]);
      setNewAsset({ type: 'Property', description: '', value: '' });
    }
  };

  const removeAsset = (index) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  // Function to add a beneficiary
  const addBeneficiary = () => {
    if (newBeneficiary.trim()) {
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      setNewBeneficiary('');
    }
  };

  // Function to remove a beneficiary
  const removeBeneficiary = (index) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
  };

  // Function to generate estate plan
  const generateEstatePlan = async () => {
    setIsLoading(true); // Show loading state
  
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Please check your .env file.");
      }
  
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
      const prompt = `You are an estate planning expert. Based on the following assets and beneficiaries, create a detailed plan for splitting the estate. Ensure the plan is fair, tax-efficient, and legally compliant.
  
  Assets:
  ${assets.map((asset, index) => `${index + 1}. ${asset.type}: ${asset.description} (Value: ${asset.value})`).join('\n')}
  
  Beneficiaries:
  ${beneficiaries.join(', ')}
  
  Total Estate Value: ${totalValue}
  
  Instructions:
  1. Provide a breakdown of how each asset should be allocated to beneficiaries.
  2. Include recommendations for minimizing taxes and legal complications.
  3. Suggest any necessary legal documents (e.g., will, trust).
  4. Return the output in JSON format.
  
  Output Format:
  {
    "plan": {
      "allocations": [
        {
          "asset": "{Asset Type}",
          "description": "{Asset Description}",
          "value": {Asset Value},
          "beneficiary": "{Beneficiary Name}",
          "percentage": {Percentage Allocated}
        }
      ],
      "recommendations": [
        {
          "title": "{Title}",
          "description": "{Description}"
        }
      ],
      "legalDocuments": [
        {
          "document": "{Document Name}",
          "description": "{Document Purpose}"
        }
      ]
    }
  }`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
  
      // Clean the response by removing Markdown code block syntax
      const cleanedResponse = text.replace(/```json/g, '').replace(/```/g, '').trim();
  
      // Parse the cleaned response into JSON
      try {
        const parsedData = JSON.parse(cleanedResponse);
        setEstatePlan(parsedData.plan); // Set the estate plan data
        console.log("Estate Plan Generated:", parsedData.plan); // Log the result for debugging
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        alert("Failed to parse the response. Please try again.");
      }
    } catch (error) {
      console.error("Error generating estate plan:", error);
      alert("An error occurred while generating the estate plan. Please check your API key and try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // Function to navigate to the next step
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to navigate to the previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to confirm the estate plan
  const confirmEstatePlan = () => {
    alert('Estate plan confirmed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="mt-4 absolute top-4 z-20 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
      {/* Header */}
      <header className="bg-gray-800 text-white py-5 px-6">
        <h1 className="text-2xl ml-16 font-bold">Estate Planning Assistant</h1>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === 1 ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  <span className={`font-medium ${
                    currentStep === 1 ? 'text-white' : 'text-gray-500'
                  }`}>1</span>
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  currentStep === 1 ? 'text-gray-800' : 'text-gray-500'
                }`}>Assets</span>
              </div>
              <div className="w-32 h-1 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === 2 ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  <span className={`font-medium ${
                    currentStep === 2 ? 'text-white' : 'text-gray-500'
                  }`}>2</span>
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  currentStep === 2 ? 'text-gray-800' : 'text-gray-500'
                }`}>Beneficiaries</span>
              </div>
              <div className="w-32 h-1 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === 3 ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  <span className={`font-medium ${
                    currentStep === 3 ? 'text-white' : 'text-gray-500'
                  }`}>3</span>
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  currentStep === 3 ? 'text-gray-800' : 'text-gray-500'
                }`}>Allocations</span>
              </div>
              <div className="w-32 h-1 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === 4 ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  <span className={`font-medium ${
                    currentStep === 4 ? 'text-white' : 'text-gray-500'
                  }`}>4</span>
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  currentStep === 4 ? 'text-gray-800' : 'text-gray-500'
                }`}>Review</span>
              </div>
            </div>
          </div>

          {/* Step 1: Assets */}
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Assets</h2>
              <p className="text-gray-600 mb-6">Add all your properties, accounts, and valuable items below.</p>

              {/* Asset Form */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
                    <select
                      name="type"
                      value={newAsset.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {assetTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={newAsset.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Main residence, 123 Main St"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="value"
                        value={newAsset.value}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attach Document (Optional)</label>
                    <div className="flex">
                      <button className="flex items-center text-gray-500 border border-gray-300 rounded-md py-2 px-3 hover:bg-gray-50">
                        <DocumentAddIcon className="h-5 w-5 mr-2" />
                        <span>Upload deed/title...</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={addAsset}
                    disabled={!newAsset.description || !newAsset.value}
                    className={`flex items-center justify-center rounded-full py-2 px-4 ${
                      newAsset.description && newAsset.value
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Assets List */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Added Assets</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Value</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assets.map((asset, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{asset.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{asset.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(asset.value)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => removeAsset(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircleIcon className="h-6 w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Assets Summary Box */}
              <div className="mt-8 flex justify-end">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full md:w-1/3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-medium">Total Estimated Value:</span>
                    <span className="text-xl font-bold text-gray-800">{formatCurrency(totalValue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Number of Assets:</span>
                    <span className="text-xl font-bold text-gray-800">{assets.length}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-12 flex justify-between">
                <button
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                  className="flex items-center py-2 px-4 border-2 border-gray-300 rounded-full text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  <span>Back</span>
                </button>

                <button
                  onClick={goToNextStep}
                  className="flex items-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  <span>Next: Beneficiaries</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </>
          )}

          {/* Step 2: Beneficiaries */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Beneficiaries</h2>
              <p className="text-gray-600 mb-6">Add the beneficiaries who will inherit your assets.</p>

              {/* Beneficiaries Form */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={newBeneficiary}
                    onChange={(e) => setNewBeneficiary(e.target.value)}
                    placeholder="Enter beneficiary name"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addBeneficiary}
                    disabled={!newBeneficiary.trim()}
                    className={`flex items-center justify-center rounded-full py-2 px-4 ${
                      newBeneficiary.trim()
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Beneficiaries List */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Added Beneficiaries</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {beneficiaries.map((beneficiary, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-700">{beneficiary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => removeBeneficiary(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircleIcon className="h-6 w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-12 flex justify-between">
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center py-2 px-4 border-2 border-gray-300 rounded-full text-gray-500 hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  <span>Back</span>
                </button>

                <button
                  onClick={goToNextStep}
                  className="flex items-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  <span>Next: Allocations</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Allocations */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Allocations</h2>
              <p className="text-gray-600 mb-6">Assign assets to beneficiaries.</p>

              {/* Allocations Form */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <p className="text-gray-600">Allocations form will go here.</p>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-12 flex justify-between">
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center py-2 px-4 border-2 border-gray-300 rounded-full text-gray-500 hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  <span>Back</span>
                </button>

                <button
                  onClick={goToNextStep}
                  className="flex items-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  <span>Next: Review</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Review</h2>
              <p className="text-gray-600 mb-6">Review your estate plan before finalizing.</p>

              {/* Review Form */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <p className="text-gray-600">Review form will go here.</p>
              </div>

              {/* Confirm Button */}
              <div className="mt-12 flex justify-end">
                <button
                  onClick={confirmEstatePlan}
                  className="flex items-center py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-full"
                >
                  <span>Confirm Estate Plan</span>
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-12 flex justify-between">
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center py-2 px-4 border-2 border-gray-300 rounded-full text-gray-500 hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  <span>Back</span>
                </button>

                <button
                  onClick={generateEstatePlan}
                  className="flex items-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  <span>Generate Estate Plan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>All information is securely encrypted and stored. Your privacy is our priority.</p>
          <a href="#" className="text-blue-500 hover:text-blue-700 mt-2 md:mt-0">Need help? Contact support</a>
        </div>
      </footer>
      {estatePlan && (
  <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Estate Plan</h3>

    {/* Allocations */}
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">Asset Allocations</h4>
      <ul className="space-y-2">
        {estatePlan.allocations.map((allocation, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              <span className="font-medium">{allocation.asset}</span> ({allocation.description}) -{" "}
              <span className="font-medium">{allocation.percentage}%</span> to{" "}
              <span className="font-medium">{allocation.beneficiary}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>

    {/* Recommendations */}
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">Recommendations</h4>
      <ul className="space-y-2">
        {estatePlan.recommendations.map((recommendation, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              <span className="font-medium">{recommendation.title}:</span> {recommendation.description}
            </p>
          </li>
        ))}
      </ul>
    </div>

    {/* Legal Documents */}
    <div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">Legal Documents</h4>
      <ul className="space-y-2">
        {estatePlan.legalDocuments.map((document, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              <span className="font-medium">{document.document}:</span> {document.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
    </div>
  );
}