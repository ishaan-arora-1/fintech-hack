// 'use client';
// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { FileText, Upload, Scan, AlertCircle } from 'lucide-react';
// import Tesseract from 'tesseract.js';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// export default function Dashboard() {
//   const [language, setLanguage] = useState<'english' | 'hindi'>('english');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [extractedText, setExtractedText] = useState<string>('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<string>('');
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Initialize Google AI
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//   // Handle file selection
//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       await processImage(file);
//     }
//   };

//   // Process the image
//   const processImage = async (file: File) => {
//     setError(null);
//     setIsProcessing(true);
//     setAnalysisResult('');
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedImage(imageUrl);

//     try {
//       const result = await Tesseract.recognize(imageUrl, 'eng');
//       setExtractedText(result.data.text);
//     } catch (error) {
//       console.error('Error processing image:', error);
//       setError('Error processing image. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Analysis prompt template
//   // const getAnalysisPrompt = (content: string) => `
//   //   add specific pros and cons of the policy, give reasons why its good and why its not, and dont add ** and * and stuff,do proper formatting
//   // give the answer in few short pointers as if youre a policy analyzer explaining something to an old person, dont use words like grandpa or anything, and then rate it out of 100, if the policy is above 85, state it as a clean policy.
//   //   Analyze this document and identify:
//   //   1. Hidden Clauses and Terms:
//   //      - Terms that may be disadvantageous to the customer
//   //      - Unusual or non-standard conditions
//   //      - Potentially unfair terms

//   //   2. Financial Obligations:
//   //      - All fees, charges, and payments
//   //      - Variable or conditional costs
//   //      - Penalty clauses

//   //   3. Important Dates and Deadlines:
//   //      - Renewal dates and conditions
//   //      - Required notice periods
//   //      - Time-sensitive requirements

//   //   4. Risk Assessment:
//   //      - Rate issues (1-5 scale)
//   //      - Provide recommendations
//   //      - Suggest modifications

//   //   Document content:
//   //   ${content}
//   // `;
//   const getAnalysisPrompt = (content: string) => `
//   Analyze this insurance policy document and generate a detailed JSON response with the following structure:

//   {
//     "policy_name": "Name of the policy",
//     "insurer_name": "Name of the insurance provider",
//     "hidden_clauses": [
//       {
//         "clause": "Name or description of the clause",
//         "impact": "How this clause affects the policyholder",
//         "risk_level": "Low/Medium/High"
//       }
//     ],
//     "financial_obligations": {
//       "premiums": "Details about premium payments",
//       "variable_costs": "Any variable or conditional costs",
//       "penalties": "Penalty clauses or hidden fees"
//     },
//     "important_dates": {
//       "policy_period": {
//         "start_date": "Policy start date",
//         "end_date": "Policy end date"
//       },
//       "renewal": {
//         "renewal_date": "Policy renewal date",
//         "conditions": "Conditions for renewal"
//       },
//       "claim_deadlines": {
//         "pre_hospitalization": "Number of days before hospitalization",
//         "post_hospitalization": "Number of days after hospitalization"
//       }
//     },
//     "risk_assessment": {
//       "rating": "Rating out of 100",
//       "issues": [
//         {
//           "issue": "Description of the issue",
//           "severity": "Low/Medium/High"
//         }
//       ],
//       "recommendations": [
//         "Specific recommendations for the policyholder"
//       ],
//       "modifications": [
//         "Suggested modifications to improve the policy"
//       ]
//     },
//     "pros": [
//       "List of advantages of the policy"
//     ],
//     "cons": [
//       "List of disadvantages of the policy"
//     ],
//     "futuristic_prediction": {
//       "assumptions": [
//         "Assumptions made for the prediction (e.g., average claims per year, inflation rate)"
//       ],
//       "total_claims_earned": {
//         "amount": "Total claims earned by the policyholder over a period",
//         "period": "Time period for the prediction (e.g., 5 years)"
//       },
//       "total_payments_made": {
//         "amount": "Total premium payments made by the policyholder over the same period",
//         "period": "Time period for the prediction (e.g., 5 years)"
//       },
//       "net_benefit": {
//         "amount": "Net benefit (claims earned - payments made)",
//         "period": "Time period for the prediction (e.g., 5 years)"
//       }
//     }
//   }

//   Additional Instructions:
//   1. Use simple, clear language that is easy to understand.
//   2. Avoid using symbols like ** or * for formatting.
//   3. Provide specific examples for hidden clauses, financial obligations, and risk assessments.
//   4. For the futuristic prediction, assume the policy is bought today and calculate:
//      - Total claims earned over 5 years based on average claim frequency and amount.
//      - Total premium payments made over 5 years.
//      - Net benefit (claims earned - payments made).
//   5. If the policy scores above 85/100, label it as a "Clean Policy."
//   6. Explain pros and cons in a way that is helpful for decision-making.

//   Document content:
//   ${content}
// `;

//   // Analyze extracted text using Gemini
//   const analyzeText = async () => {
//     if (!extractedText.trim()) {
//       alert('Please scan a document first.');
//       return;
//     }

//     setIsAnalyzing(true);
//     setAnalysisResult('');

//     try {
//       const result = await model.generateContent(getAnalysisPrompt(extractedText));
//       const response = await result.response;
//       setAnalysisResult(response.text());
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setAnalysisResult('Error analyzing the document. Please try again.');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
//       <button
//         onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
//         className="fixed top-4 right-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white text-lg z-50"
//       >
//         {language === 'english' ? 'हिंदी' : 'English'}
//       </button>

//       <main className="container mx-auto p-8 max-w-7xl">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-8xl font-bold text-purple-600 text-center mb-12"
//         >
//           Sukh Secure
//         </motion.h1>

//         <section className="bg-purple-50 p-8 rounded-2xl shadow-lg border border-purple-200">
//           <h2 className="text-3xl font-semibold mb-6 text-purple-700">Policy Scanner</h2>
//           <div className="relative bg-white p-6 rounded-lg">
//             <div className="flex items-center mb-4">
//               <FileText className="w-8 h-8 text-purple-600 mr-2" />
//               <span className="text-purple-700 text-xl">Document Analysis</span>
//             </div>

//             <div className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
//               <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
//               {isProcessing ? (
//                 <div className="flex flex-col items-center">
//                   <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
//                   <p className="text-xl text-purple-600">Scanning document...</p>
//                 </div>
//               ) : selectedImage ? (
//                 <div className="flex flex-col items-center">
//                   <img src={selectedImage} alt="Uploaded policy" className="max-h-48 object-contain mb-4" />
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <Upload className="w-12 h-12 text-purple-600 mb-4" />
//                   <p className="text-xl text-purple-600">Drop your policy image here or click to upload</p>
//                 </div>
//               )}
//             </div>

//             {extractedText && (
//               <div className="mt-6">
//                 <h3 className="text-xl font-semibold mb-4 text-purple-700">Extracted Text</h3>
//                 <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
//                   <p className="text-lg whitespace-pre-wrap">{extractedText}</p>
//                 </div>
//                 <button
//                   onClick={analyzeText}
//                   className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                 >
//                   Analyze Text
//                 </button>
//               </div>
//             )}

//             {isAnalyzing && <p className="mt-4 text-purple-600">Analyzing document...</p>}
//             {analysisResult && (
//               <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
//                 <h3 className="text-xl font-semibold text-purple-700">Analysis Result</h3>
//                 <p className="text-lg whitespace-pre-wrap">{analysisResult}</p>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



"use client"
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Scan, ChevronDown, ChevronUp } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Link from 'next/link';

export default function Dashboard() {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null); // Store parsed JSON
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Google AI
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Handle file selection
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processImage(file);
    }
  };

  // Process the image
  const processImage = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    setAnalysisResult(null);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    try {
      const result = await Tesseract.recognize(imageUrl, 'eng');
      setExtractedText(result.data.text);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Analysis prompt template
  const getAnalysisPrompt = (content: string) => `
  Analyze this insurance policy document and generate a detailed JSON response with the following structure. 
  Return ONLY the JSON object, without any additional text or formatting.

  {
    "policy_name": "Name of the policy",
    "insurer_name": "Name of the insurance provider",
    "hidden_clauses": [
      {
        "clause": "Name or description of the clause",
        "impact": "How this clause affects the policyholder",
        "risk_level": "Low/Medium/High"
      }
    ],
    "financial_obligations": {
      "premiums": "Details about premium payments",
      "variable_costs": "Any variable or conditional costs",
      "penalties": "Penalty clauses or hidden fees"
    },
    "important_dates": {
      "policy_period": {
        "start_date": "Policy start date",
        "end_date": "Policy end date"
      },
      "renewal": {
        "renewal_date": "Policy renewal date",
        "conditions": "Conditions for renewal"
      },
      "claim_deadlines": {
        "pre_hospitalization": "Number of days before hospitalization",
        "post_hospitalization": "Number of days after hospitalization"
      }
    },
    "risk_assessment": {
      "rating": "Rating out of 100",
      "issues": [
        {
          "issue": "Description of the issue",
          "severity": "Low/Medium/High"
        }
      ],
      "recommendations": [
        "Specific recommendations for the policyholder"
      ],
      "modifications": [
        "Suggested modifications to improve the policy"
      ]
    },
    "pros": [
      "List of advantages of the policy"
    ],
    "cons": [
      "List of disadvantages of the policy"
    ],
    "futuristic_prediction": {
      "assumptions": [
        "Assumptions made for the prediction (e.g., average claims per year, inflation rate)"
      ],
      "total_claims_earned": {
        "amount": "Total claims earned by the policyholder over a period",
        "period": "Time period for the prediction (e.g., 5 years)"
      },
      "total_payments_made": {
        "amount": "Total premium payments made by the policyholder over the same period",
        "period": "Time period for the prediction (e.g., 5 years)"
      },
      "net_benefit": {
        "amount": "Net benefit (claims earned - payments made)",
        "period": "Time period for the prediction (e.g., 5 years)"
      }
    }
  }

  Document content:
  ${content}
`;

  // Analyze extracted text using Gemini
  // Analyze extracted text using Gemini
const analyzeText = async () => {
  if (!extractedText.trim()) {
    alert('Please scan a document first.');
    return;
  }

  setIsAnalyzing(true);
  setAnalysisResult(null);

  try {
    const result = await model.generateContent(getAnalysisPrompt(extractedText));
    const response = await result.response;

    // Extract JSON from the response
    const responseText = response.text();

    // Remove any non-JSON content (e.g., markdown or extra text)
    const jsonStartIndex = responseText.indexOf('{');
    const jsonEndIndex = responseText.lastIndexOf('}') + 1;
    const jsonString = responseText.slice(jsonStartIndex, jsonEndIndex);

    // Parse the JSON string
    const jsonResponse = JSON.parse(jsonString);
    setAnalysisResult(jsonResponse);
  } catch (error) {
    console.error('Analysis error:', error);
    setAnalysisResult('Error analyzing the document. Please try again.');
  } finally {
    setIsAnalyzing(false);
  }
};

  // Toggle section visibility
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Render JSON data in a structured way
  const renderAnalysisResult = () => {
    if (!analysisResult) return null;

    return (
      <div className="mt-6 bg-purple-50 p-6 rounded-lg border border-purple-200 relative">
        <h3 className="text-2xl font-bold text-purple-700 mb-6">Analysis Result</h3>

        {/* Policy Name and Insurer */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-purple-700">Policy Details</h4>
          <p className="text-lg">
            <span className="font-medium">Policy Name:</span> {analysisResult.policy_name}
          </p>
          <p className="text-lg">
            <span className="font-medium">Insurer:</span> {analysisResult.insurer_name}
          </p>
        </div>

        {/* Hidden Clauses */}
        <div className="mb-6">
          <h4
            className="text-xl font-semibold text-purple-700 cursor-pointer flex items-center"
            onClick={() => toggleSection('hidden_clauses')}
          >
            Hidden Clauses
            {expandedSections['hidden_clauses'] ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </h4>
          {expandedSections['hidden_clauses'] && (
            <div className="mt-4 space-y-4">
              {analysisResult.hidden_clauses.map((clause: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-medium">{clause.clause}</p>
                  <p className="text-gray-600">{clause.impact}</p>
                  <p className="text-sm text-purple-600">Risk Level: {clause.risk_level}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Financial Obligations */}
        <div className="mb-6">
          <h4
            className="text-xl font-semibold text-purple-700 cursor-pointer flex items-center"
            onClick={() => toggleSection('financial_obligations')}
          >
            Financial Obligations
            {expandedSections['financial_obligations'] ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </h4>
          {expandedSections['financial_obligations'] && (
            <div className="mt-4 space-y-4">
              <p className="text-lg">
                <span className="font-medium">Premiums:</span> {analysisResult.financial_obligations.premiums}
              </p>
              <p className="text-lg">
                <span className="font-medium">Variable Costs:</span> {analysisResult.financial_obligations.variable_costs}
              </p>
              <p className="text-lg">
                <span className="font-medium">Penalties:</span> {analysisResult.financial_obligations.penalties}
              </p>
            </div>
          )}
        </div>

        {/* Important Dates */}
        <div className="mb-6">
          <h4
            className="text-xl font-semibold text-purple-700 cursor-pointer flex items-center"
            onClick={() => toggleSection('important_dates')}
          >
            Important Dates
            {expandedSections['important_dates'] ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </h4>
          {expandedSections['important_dates'] && (
            <div className="mt-4 space-y-4">
              <p className="text-lg">
                <span className="font-medium">Policy Period:</span> {analysisResult.important_dates.policy_period.start_date} to{' '}
                {analysisResult.important_dates.policy_period.end_date}
              </p>
              <p className="text-lg">
                <span className="font-medium">Renewal Date:</span> {analysisResult.important_dates.renewal.renewal_date}
              </p>
              <p className="text-lg">
                <span className="font-medium">Claim Deadlines:</span> Pre-Hospitalization: {analysisResult.important_dates.claim_deadlines.pre_hospitalization} days, Post-Hospitalization: {analysisResult.important_dates.claim_deadlines.post_hospitalization} days
              </p>
            </div>
          )}
        </div>

        {/* Risk Assessment */}
        <div className="mb-6">
          <h4
            className="text-xl font-semibold text-purple-700 cursor-pointer flex items-center"
            onClick={() => toggleSection('risk_assessment')}
          >
            Risk Assessment
            {expandedSections['risk_assessment'] ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </h4>
          {expandedSections['risk_assessment'] && (
            <div className="mt-4 space-y-4">
              <p className="text-lg">
                <span className="font-medium">Rating:</span> {analysisResult.risk_assessment.rating}/100
              </p>
              <div className="space-y-2">
                <p className="font-medium">Issues:</p>
                {analysisResult.risk_assessment.issues.map((issue: any, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600">{issue.issue}</p>
                    <p className="text-sm text-purple-600">Severity: {issue.severity}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-medium">Recommendations:</p>
                {analysisResult.risk_assessment.recommendations.map((rec: string, index: number) => (
                  <p key={index} className="text-gray-600">- {rec}</p>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-medium">Modifications:</p>
                {analysisResult.risk_assessment.modifications.map((mod: string, index: number) => (
                  <p key={index} className="text-gray-600">- {mod}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pros and Cons */}
        <div className="mb-6">
          <h4
            className="text-xl font-semibold text-purple-700 cursor-pointer flex items-center"
            onClick={() => toggleSection('pros_cons')}
          >
            Pros and Cons
            {expandedSections['pros_cons'] ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </h4>
          {expandedSections['pros_cons'] && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-purple-700">Pros</h5>
                <ul className="list-disc list-inside">
                  {analysisResult.pros.map((pro: string, index: number) => (
                    <li key={index} className="text-gray-600">{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-purple-700">Cons</h5>
                <ul className="list-disc list-inside">
                  {analysisResult.cons.map((con: string, index: number) => (
                    <li key={index} className="text-gray-600">{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Futuristic Prediction */}
        <div className="mb-6">
          <h4
            className="text-xl font-semibold text-purple-700 cursor-pointer flex items-center"
            onClick={() => toggleSection('futuristic_prediction')}
          >
            Futuristic Prediction
            {expandedSections['futuristic_prediction'] ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </h4>
          {expandedSections['futuristic_prediction'] && (
            <div className="mt-4 space-y-4">
              <p className="text-lg">
                <span className="font-medium">Total Claims Earned:</span> {analysisResult.futuristic_prediction.total_claims_earned.amount} over {analysisResult.futuristic_prediction.total_claims_earned.period}
              </p>
              <p className="text-lg">
                <span className="font-medium">Total Payments Made:</span> {analysisResult.futuristic_prediction.total_payments_made.amount} over {analysisResult.futuristic_prediction.total_payments_made.period}
              </p>
              <p className="text-lg">
                <span className="font-medium">Net Benefit:</span> {analysisResult.futuristic_prediction.net_benefit.amount} over {analysisResult.futuristic_prediction.net_benefit.period}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="mt-4 absolute top-5 left-5">
      <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        ←
      </Link>
    </div>
      <button
        onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
        className="fixed top-4 right-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white text-lg z-50"
      >
        {language === 'english' ? 'हिंदी' : 'English'}
      </button>

      <main className="container mx-auto p-8 max-w-7xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-bold text-purple-600 text-center mb-12"
        >
          Sukh Secure
        </motion.h1>

        <section className="bg-purple-50 p-8 rounded-2xl shadow-lg border border-purple-200">
          <h2 className="text-3xl font-semibold mb-6 text-purple-700">Policy Scanner</h2>
          <div className="relative bg-white p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-purple-600 mr-2" />
              <span className="text-purple-700 text-xl">Document Analysis</span>
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                  <p className="text-xl text-purple-600">Scanning document...</p>
                </div>
              ) : selectedImage ? (
                <div className="flex flex-col items-center">
                  <img src={selectedImage} alt="Uploaded policy" className="max-h-48 object-contain mb-4" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-purple-600 mb-4" />
                  <p className="text-xl text-purple-600">Drop your policy image here or click to upload</p>
                </div>
              )}
            </div>

            {extractedText && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Extracted Text</h3>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-lg whitespace-pre-wrap">{extractedText}</p>
                </div>
                <button
                  onClick={analyzeText}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Analyze Text
                </button>
              </div>
            )}

            {isAnalyzing && <p className="mt-4 text-purple-600">Analyzing document...</p>}
            {analysisResult && renderAnalysisResult()}
          </div>
        </section>
      </main>
    </div>
  );
}
