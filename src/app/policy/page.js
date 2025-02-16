"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight, Check } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Link from 'next/link';
// import { useInsurance } from '@/context/InsuranceContext';
// const { selectedPolicy, setSelectedPolicy } = useInsurance();


const InsuranceForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    healthStatus: '',
    preferredCoverageType: '',
    currentInsuranceCoverage: '',
    budgetRange: '',
    location: '',
    familyDependents: '',
    retirementStatus: '',
    medicalHistory: '',
    lifestyleFactors: '',
    longTermCarePreferences: '',
    coverageDuration: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Gemini API
  const apiKey = "AIzaSyCOeTt3KsDjrnv4kq-YkcnjXmJLRCzZ0VM";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('insuranceFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(updatedFormData);
    localStorage.setItem('insuranceFormData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Generate a prompt for Gemini based on user inputs
      const prompt = `
        Based on the following user inputs, generate personalized insurance policy recommendations:
        - Age: ${formData.age}
        - Health Status: ${formData.healthStatus}
        - Preferred Coverage Type: ${formData.preferredCoverageType}
        - Current Insurance Coverage: ${formData.currentInsuranceCoverage}
        - Budget Range: ${formData.budgetRange}
        - Location: ${formData.location}
        - Family Dependents: ${formData.familyDependents}
        - Retirement Status: ${formData.retirementStatus}
        - Medical History: ${formData.medicalHistory}
        - Lifestyle Factors: ${formData.lifestyleFactors}
        - Long-Term Care Preferences: ${formData.longTermCarePreferences}
        - Coverage Duration: ${formData.coverageDuration}

        dont give policies which are higher than the ${formData.budgetRange}
        dont give policies whose coverage duration + ${formData.age} is more than 80 years

        select a policy based on these inputs strictly, it should be an acutal policy in india.

        Provide the recommendations in the following JSON format:
        [
          {
            "name": "Policy Name",
            "company" : "name:,
            "investment" : "money input of investor",
            "noyears" : "no. of years"
            "return":"returns from policy",
            "input1" :" how policy will give benefits for that  eg. heart disease",
            "input2" :" how policy will give benefits for that",
            "input3" :" how policy will give benefits for that",
          },
          ...
        ]

        below r the kinds of policies i want you to give
          LIC Jeevan Anand (LIC) - 20 years - ₹5,000/year - ₹1.1 lakh on maturity - Guaranteed returns + life cover - Low liquidity.

HDFC Life Click 2 Protect (HDFC Life) - 30 years - ₹10,000/year - ₹1 crore death benefit - Affordable, high coverage - No maturity benefit.

Max Bupa Health Companion (Max Bupa) - 1 year - ₹10,000/month - ₹5-10 lakh health cover - Cashless hospitalization - Co-payment clause.

ICICI Pru iProtect Smart (ICICI Prudential) - 25 years - ₹12,000/year - ₹30 lakh death benefit - Affordable, customizable - No returns on survival.

SBI Life Saral Pension (SBI Life) - 15 years - ₹1 lakh/year - Guaranteed pension post-retirement - Tax benefits - Long lock-in period.

Tata AIG Travel Guard (Tata AIG) - 7 days - ₹1,000/trip - Trip cancellation + medical cover - Affordable - Excludes pre-existing conditions.

Bajaj Allianz Motor Insurance (Bajaj Allianz) - 1 year - ₹7,000/year - Own damage + third-party liability - Comprehensive - High deductibles.

Kotak Term Critical Illness (Kotak Mahindra) - 20 years - ₹15,000/year - Lump sum on diagnosis - Covers major illnesses - Long waiting period.

New India Assurance Personal Accident (New India Assurance) - 1 year - ₹1,500/year - Disability or death benefit - Affordable - Limited coverage.

Aditya Birla Sun Life Vision Money Back (Aditya Birla) - 20 years - ₹50,000/year - Periodic payouts + life cover - Regular returns - Low death benefit.
`;

      // Call Gemini API to generate recommendations
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the response into JSON
      const recommendations = JSON.parse(text);
      setRecommendations(recommendations);
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

//   const handlePolicySelect = (policy) => {
//     setSelectedPolicy(policy);
//     localStorage.setItem('selectedPolicy', JSON.stringify(policy));
//     setStep(3);
//   };
const handlePolicySelect = (policy) => {
    setSelectedPolicy(policy);
    localStorage.setItem('selectedPolicy', JSON.stringify(policy)); // Optional: Save to localStorage
    setStep(3);
  };

  // Rest of the code remains the same...
  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {['Details', 'Recommendations', 'Purchase'].map((label, index) => (
          <div 
            key={label}
            className={`flex flex-col items-center w-1/3 ${
              step > index + 1 ? 'text-purple-600' : 
              step === index + 1 ? 'text-purple-500' : 
              'text-gray-400'
            }`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center mb-2
              ${step > index + 1 ? 'bg-purple-600 text-white' :
                step === index + 1 ? 'bg-purple-500 text-white' :
                'bg-gray-200'
              }
            `}>
              {step > index + 1 ? <Check size={20} /> : index + 1}
            </div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Age */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Age
            <div className="relative">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your age"
              />
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Please enter your current age
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Health Status */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Health Status
            <div className="relative">
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select your health status</option>
                <option value="healthy">Healthy</option>
                <option value="diabetic">Diabetic</option>
                <option value="heartCondition">Heart Condition</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select your current health condition
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Preferred Coverage Type */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Preferred Coverage Type
            <div className="relative">
              <select
                name="preferredCoverageType"
                value={formData.preferredCoverageType}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select preferred coverage type</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="basic">Basic</option>
                <option value="criticalIllness">Critical Illness</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select the type of coverage you prefer
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Current Insurance Coverage */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Current Insurance Coverage
            <div className="relative">
              <select
                name="currentInsuranceCoverage"
                value={formData.currentInsuranceCoverage}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select current insurance coverage</option>
                <option value="none">None</option>
                <option value="basic">Basic</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select your current insurance coverage
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Budget/Premium Range */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Budget/Premium Range
            <div className="relative">
              <input
                type="text"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your budget range (e.g., $100-$200)"
              />
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Enter your budget range for premiums
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Location
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your location"
              />
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Enter your location for localized plans
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Family Dependents */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Family Dependents
            <div className="relative">
              <input
                type="number"
                name="familyDependents"
                value={formData.familyDependents}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter number of dependents"
              />
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Enter the number of family dependents
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Retirement Status */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Retirement Status
            <div className="relative">
              <select
                name="retirementStatus"
                value={formData.retirementStatus}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select retirement status</option>
                <option value="retired">Retired</option>
                <option value="working">Still Working</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select your retirement status
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Medical History */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Medical History
            <div className="relative">
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your medical history"
              />
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Provide details about your medical history
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Lifestyle Factors */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Lifestyle Factors
            <div className="relative">
              <select
                name="lifestyleFactors"
                value={formData.lifestyleFactors}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select lifestyle factors</option>
                <option value="active">Active</option>
                <option value="sedentary">Sedentary</option>
                <option value="smoker">Smoker</option>
                <option value="nonSmoker">Non-Smoker</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select your lifestyle factors
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Long-Term Care Preferences */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Long-Term Care Preferences
            <div className="relative">
              <select
                name="longTermCarePreferences"
                value={formData.longTermCarePreferences}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select long-term care preferences</option>
                <option value="homeCare">Home Care</option>
                <option value="nursingHome">Nursing Home</option>
                <option value="assistedLiving">Assisted Living</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select your long-term care preferences
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Coverage Duration */}
        <div>
          <label className="block text-lg mb-2 font-medium">
            Coverage Duration
            <div className="relative">
              <select
                name="coverageDuration"
                value={formData.coverageDuration}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select coverage duration</option>
                <option value="1Year">1 Year</option>
                <option value="5Years">5 Years</option>
                <option value="10Years">10 Years</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-400 cursor-help group">
                <Info size={24} />
                <div className="hidden group-hover:block absolute right-0 bg-white p-2 rounded shadow-lg w-48 text-sm">
                  Select the duration of coverage
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full p-6 text-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
        >
          Get Recommendations <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Generating personalized recommendations...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations?.map((policy, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              onClick={() => handlePolicySelect(policy)}
            >
              <CardHeader>
                <CardTitle className="text-xl text-purple-600">{policy.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-purple-600">Company : {policy.company}</div>
                  <div className="text-2xl font-bold text-purple-600">Policy : {policy.investment}</div>
                  <div className="text-2xl font-bold text-purple-600">Return : {policy.return}</div>
                  <div>
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {policy.input1}
                    </ul>
                    <ul className="list-disc pl-5 space-y-1">
                      {policy.input2}
                    </ul>
                    <ul className="list-disc pl-5 space-y-1">
                      {policy.input3}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Eligibility:</h4>
                    <p className="text-gray-600">{policy.eligibility}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
  
  const renderPurchase = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-600">
          {selectedPolicy.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-3xl font-bold text-purple-600">
          {selectedPolicy.premium}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Payment Options</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="w-5 h-5 text-purple-600" />
              <span>Monthly Payment</span>
            </label>
            <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="w-5 h-5 text-purple-600" />
              <span>Annual Payment (Save 10%)</span>
            </label>
          </div>
        </div>
        <Button 
          className="w-full p-6 text-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
        >
          Complete Purchase
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
        <div className="mt-4 fixed top-5 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-8 text-center">
          Find Your Perfect Insurance Plan
        </h1>
        
        {renderProgressBar()}
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && renderForm()}
          {step === 2 && renderRecommendations()}
          {step === 3 && renderPurchase()}
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;