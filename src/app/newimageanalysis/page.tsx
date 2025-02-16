// 'use client';
// import { useState, useRef } from 'react';
// import { useAnalysis } from '@/context/AnalysisContext';
// // Import useEffect to handle local storage updates
// import { motion } from 'framer-motion';
// import { FileText, Upload, Scan, AlertCircle } from 'lucide-react';
// import Tesseract from 'tesseract.js';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// export default function Dashboard() {
//   const { extractedText, analysisResult, setExtractedText, setAnalysisResult } = useAnalysis();

//   const [language, setLanguage] = useState<'english' | 'hindi'>('english');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   // const [extractedText, setExtractedText] = useState<string>('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   // const [analysisResult, setAnalysisResult] = useState<string>('');
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
//   const getAnalysisPrompt = (content: string) => `
//     add specific pros and cons of the policy, give reasons why its good and why its not, and dont add ** and * and stuff,do proper formatting
//   give the answer in few short pointers as if youre a policy analyzer explaining something to an old person, dont use words like grandpa or anything, and then rate it out of 100, if the policy is above 85, state it as a clean policy.
//     Analyze this document and identify:
//     1. Hidden Clauses and Terms:
//        - Terms that may be disadvantageous to the customer
//        - Unusual or non-standard conditions
//        - Potentially unfair terms

//     2. Financial Obligations:
//        - All fees, charges, and payments
//        - Variable or conditional costs
//        - Penalty clauses

//     3. Important Dates and Deadlines:
//        - Renewal dates and conditions
//        - Required notice periods
//        - Time-sensitive requirements

//     4. Risk Assessment:
//        - Rate issues (1-5 scale)
//        - Provide recommendations
//        - Suggest modifications

//     Document content:
//     ${content}
//   `;

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



// 'use client';
// import { useState, useRef } from 'react';
// import { useAnalysis } from '@/context/AnalysisContext';
// import { motion } from 'framer-motion';
// import { FileText, Upload, Scan, AlertCircle } from 'lucide-react';
// import { PDFDocument } from 'pdf-lib';
// import OpenAI from 'openai';

// export default function Dashboard() {
//   const { extractedText, analysisResult, setExtractedText, setAnalysisResult } = useAnalysis();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const apiKey = "k-proj-42uovQbCtg1I-hT0vKjrITw2dA03ISFrtJ-SOYlaX6PDCsMtsTloat3bX07_vTHPghoULqIn2yT3BlbkFJN-kx-f4no-UaG3nPslG6c-e2lgRHgi3AlhctzBHWgBY_vVKI65XpMIBTVcYDHzFc5sWXQffT4A"!;
//   // const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
//   const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

//   // Handle PDF Upload
//   const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       await processPdf(file);
//     }
//   };

//   // Extract text from PDF
//   // const processPdf = async (file: File) => {
//   //   setIsProcessing(true);
//   //   setAnalysisResult('');
//   //   try {
//   //     const reader = new FileReader();
//   //     reader.readAsArrayBuffer(file);
//   //     reader.onloadend = async () => {
//   //       const pdfDoc = await PDFDocument.load(reader.result as ArrayBuffer);
//   //       let text = '';
//   //       for (let i = 0; i < pdfDoc.getPageCount(); i++) {
//   //         text += await pdfDoc.getPageText(i);
//   //       }
//   //       setExtractedText(text);
//   //     };
//   //   } catch (error) {
//   //     console.error('Error processing PDF:', error);
//   //   } finally {
//   //     setIsProcessing(false);
//   //   }
//   // };

//   const processPdf = async (file: File) => {
//     setIsProcessing(true);
//     setAnalysisResult('');
  
//     try {
//       const reader = new FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onloadend = async () => {
//         const pdfData = new Uint8Array(reader.result as ArrayBuffer);
//         const pdf = await getDocument({ data: pdfData }).promise;
        
//         let text = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           const pageText = content.items.map((item: any) => item.str).join(' ');
//           text += pageText + '\n';
//         }
        
//         setExtractedText(text);
//       };
//     } catch (error) {
//       console.error('Error processing PDF:', error);
//       setExtractedText('Error extracting text from PDF.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Generate Analysis Prompt
//   const getAnalysisPrompt = (content: string) => `
//     Extract the following details from this health insurance policy and return in JSON format:
//     {
//       "policy_name": "",
//       "insurer_name": "",
//       "hidden_clauses": [],
//       "benefits": [],
//       "pros": [],
//       "cons": [],
//       "important_dates": {},
//       "claim_deadlines": {}
//     }
//     Document content:
//     ${content}
//   `;

//   // Analyze Extracted Text using OpenAI
//   const analyzeText = async () => {
//     if (!extractedText.trim()) {
//       alert('Please upload a document first.');
//       return;
//     }

//     setIsAnalyzing(true);
//     setAnalysisResult('');

//     try {
//       const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [{ role: 'system', content: getAnalysisPrompt(extractedText) }],
//         temperature: 0.3
//       });
//       const jsonResponse = JSON.parse(response.choices[0].message.content);
//       localStorage.setItem('analysisResult', JSON.stringify(jsonResponse));
//       setAnalysisResult(jsonResponse);
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setAnalysisResult('Error analyzing the document. Please try again.');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
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
//               <span className="text-purple-700 text-xl">Upload PDF for Analysis</span>
//             </div>

//             <div className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
//               <input type="file" ref={fileInputRef} onChange={handlePdfUpload} accept="application/pdf" className="hidden" />
//               {isProcessing ? (
//                 <div className="flex flex-col items-center">
//                   <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
//                   <p className="text-xl text-purple-600">Processing document...</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <Upload className="w-12 h-12 text-purple-600 mb-4" />
//                   <p className="text-xl text-purple-600">Click to upload your PDF</p>
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
//                 <h3 className="text-xl font-semibold text-purple-700">Analysis Result (JSON)</h3>
//                 <pre className="text-lg whitespace-pre-wrap">{JSON.stringify(analysisResult, null, 2)}</pre>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


// 'use client';
// import { useState, useRef } from 'react';
// import { useAnalysis } from '@/context/AnalysisContext';
// import { motion } from 'framer-motion';
// import { FileText, Upload, Scan } from 'lucide-react';
// import { getDocument } from 'pdfjs-dist'; // Import getDocument from pdfjs-dist
// import OpenAI from 'openai';

// export default function Dashboard() {
//   const { extractedText, analysisResult, setExtractedText, setAnalysisResult } = useAnalysis();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const apiKey = "k-proj-42uovQbCtg1I-hT0vKjrITw2dA03ISFrtJ-SOYlaX6PDCsMtsTloat3bX07_vTHPghoULqIn2yT3BlbkFJN-kx-f4no-UaG3nPslG6c-e2lgRHgi3AlhctzBHWgBY_vVKI65XpMIBTVcYDHzFc5sWXQffT4A"!;
//   const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

//   // Handle PDF Upload
//   const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       await processPdf(file);
//     }
//   };

//   // Extract text from PDF
//   const processPdf = async (file: File) => {
//     setIsProcessing(true);
//     setAnalysisResult('');

//     try {
//       const reader = new FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onloadend = async () => {
//         const pdfData = new Uint8Array(reader.result as ArrayBuffer);
//         const pdf = await getDocument({ data: pdfData }).promise; // Use getDocument from pdfjs-dist

//         let text = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           const pageText = content.items.map((item: any) => item.str).join(' ');
//           text += pageText + '\n';
//         }

//         setExtractedText(text);
//       };
//     } catch (error) {
//       console.error('Error processing PDF:', error);
//       setExtractedText('Error extracting text from PDF.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Generate Analysis Prompt
//   const getAnalysisPrompt = (content: string) => `
//     Extract the following details from this health insurance policy and return in JSON format:
//     {
//       "policy_name": "",
//       "insurer_name": "",
//       "hidden_clauses": [],
//       "benefits": [],
//       "pros": [],
//       "cons": [],
//       "important_dates": {},
//       "claim_deadlines": {}
//     }
//     Document content:
//     ${content}
//   `;

//   // Analyze Extracted Text using OpenAI
//   const analyzeText = async () => {
//     if (!extractedText.trim()) {
//       alert('Please upload a document first.');
//       return;
//     }

//     setIsAnalyzing(true);
//     setAnalysisResult('');

//     try {
//       const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [{ role: 'system', content: getAnalysisPrompt(extractedText) }],
//         temperature: 0.3,
//       });

//       // Ensure response content is not null
//       const content = response.choices[0].message.content;
//       if (!content) {
//         throw new Error('No content returned from OpenAI');
//       }

//       const jsonResponse = JSON.parse(content); // Safe to parse now
//       localStorage.setItem('analysisResult', JSON.stringify(jsonResponse));
//       setAnalysisResult(jsonResponse);
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setAnalysisResult('Error analyzing the document. Please try again.');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
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
//               <span className="text-purple-700 text-xl">Upload PDF for Analysis</span>
//             </div>

//             <div
//               className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handlePdfUpload}
//                 accept="application/pdf"
//                 className="hidden"
//               />
//               {isProcessing ? (
//                 <div className="flex flex-col items-center">
//                   <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
//                   <p className="text-xl text-purple-600">Processing document...</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <Upload className="w-12 h-12 text-purple-600 mb-4" />
//                   <p className="text-xl text-purple-600">Click to upload your PDF</p>
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
//                 <h3 className="text-xl font-semibold text-purple-700">Analysis Result (JSON)</h3>
//                 <pre className="text-lg whitespace-pre-wrap">
//                   {JSON.stringify(analysisResult, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }




// 'use client';
// import { useState, useRef } from 'react';
// import { useAnalysis } from '@/context/AnalysisContext';
// import { motion } from 'framer-motion';
// import { FileText, Upload, Scan, AlertCircle } from 'lucide-react';
// import OpenAI from 'openai';

// export default function Dashboard() {
//   const { analysisResult, setAnalysisResult } = useAnalysis();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
//   const assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID!; // Replace with your Assistant ID
//   const openai = new OpenAI({ apiKey });

//   // Handle PDF Upload
//   const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       await analyzePdf(file);
//     }
//   };

//   // Upload and Analyze PDF with OpenAI Assistants API
//   const analyzePdf = async (file: File) => {
//     setIsProcessing(true);
//     setAnalysisResult('');

//     try {
//       // Step 1: Upload the file to OpenAI
//       const fileUploadResponse = await openai.files.create({
//         file,
//         purpose: 'assistants',
//       });

//       const fileId = fileUploadResponse.id;

//       // Step 2: Create a thread for the Assistant
//       const thread = await openai.beta.threads.create();

//       // Step 3: Submit the file for analysis using the Assistant
//       const run = await openai.beta.threads.runs.create(thread.id, {
//         assistant_id: assistantId, // Ensure this is your valid Assistant ID
//         instructions: `Extract the following details from the PDF and return in JSON format:
//         {
//           "policy_name": "",
//           "insurer_name": "",
//           "hidden_clauses": [],
//           "benefits": [],
//           "pros": [],
//           "cons": [],
//           "important_dates": {},
//           "claim_deadlines": {}
//         }`,
//         file_ids: [fileId], // Correct way to attach the uploaded file
//       });

//       // Step 4: Poll for the analysis result
//       let runStatus;
//       do {
//         runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
//         await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s before retrying
//       } while (runStatus.status !== 'completed');

//       // Step 5: Retrieve the message from OpenAI
//       const messages = await openai.beta.threads.messages.list(thread.id);
//       const lastMessage = messages.data[0].content[0].text.value;

//       // Step 6: Save JSON response to localStorage
//       const jsonResponse = JSON.parse(lastMessage);
//       localStorage.setItem('analysisResult', JSON.stringify(jsonResponse));
//       setAnalysisResult(jsonResponse);
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setAnalysisResult('Error analyzing the document. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
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
//               <span className="text-purple-700 text-xl">Upload PDF for Analysis</span>
//             </div>

//             <div className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
//               <input type="file" ref={fileInputRef} onChange={handlePdfUpload} accept="application/pdf" className="hidden" />
//               {isProcessing ? (
//                 <div className="flex flex-col items-center">
//                   <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
//                   <p className="text-xl text-purple-600">Processing document...</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <Upload className="w-12 h-12 text-purple-600 mb-4" />
//                   <p className="text-xl text-purple-600">Click to upload your PDF</p>
//                 </div>
//               )}
//             </div>

//             {isAnalyzing && <p className="mt-4 text-purple-600">Analyzing document...</p>}
//             {analysisResult && (
//               <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
//                 <h3 className="text-xl font-semibold text-purple-700">Analysis Result (JSON)</h3>
//                 <pre className="text-lg whitespace-pre-wrap">{JSON.stringify(analysisResult, null, 2)}</pre>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



// 'use client';
// import { useState, useRef } from 'react';
// import { useAnalysis } from '@/context/AnalysisContext';
// import { motion } from 'framer-motion';
// import { FileText, Upload, Scan } from 'lucide-react';
// import { getDocument } from 'pdfjs-dist'; // Import getDocument from pdfjs-dist
// import OpenAI from 'openai';

// export default function Dashboard() {
//   const { extractedText, analysisResult, setExtractedText, setAnalysisResult } = useAnalysis();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const apiKey = "k-proj-42uovQbCtg1I-hT0vKjrITw2dA03ISFrtJ-SOYlaX6PDCsMtsTloat3bX07_vTHPghoULqIn2yT3BlbkFJN-kx-f4no-UaG3nPslG6c-e2lgRHgi3AlhctzBHWgBY_vVKI65XpMIBTVcYDHzFc5sWXQffT4A"!;
//   const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

//   // Handle PDF Upload
//   const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       await processPdf(file);
//     }
//   };

//   // Extract text from PDF
//   const processPdf = async (file: File) => {
//     setIsProcessing(true);
//     setAnalysisResult('');

//     try {
//       const reader = new FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onloadend = async () => {
//         const pdfData = new Uint8Array(reader.result as ArrayBuffer);
//         const pdf = await getDocument({ data: pdfData }).promise; // Use getDocument from pdfjs-dist

//         let text = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           const pageText = content.items.map((item: any) => item.str).join(' ');
//           text += pageText + '\n';
//         }

//         setExtractedText(text);
//       };
//     } catch (error) {
//       console.error('Error processing PDF:', error);
//       setExtractedText('Error extracting text from PDF.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Generate Analysis Prompt
//   const getAnalysisPrompt = (content: string) => `
//     Extract the following details from this health insurance policy and return in JSON format:
//     {
//       "policy_name": "",
//       "insurer_name": "",
//       "hidden_clauses": [],
//       "benefits": [],
//       "pros": [],
//       "cons": [],
//       "important_dates": {},
//       "claim_deadlines": {}
//     }
//     Document content:
//     ${content}
//   `;

//   // Analyze Extracted Text using OpenAI
//   const analyzeText = async () => {
//     if (!extractedText.trim()) {
//       alert('Please upload a document first.');
//       return;
//     }

//     setIsAnalyzing(true);
//     setAnalysisResult('');

//     try {
//       const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [{ role: 'system', content: getAnalysisPrompt(extractedText) }],
//         temperature: 0.3,
//       });

//       // Ensure response content is not null
//       const content = response.choices[0].message.content;
//       if (!content) {
//         throw new Error('No content returned from OpenAI');
//       }

//       const jsonResponse = JSON.parse(content); // Safe to parse now
//       localStorage.setItem('analysisResult', JSON.stringify(jsonResponse));
//       setAnalysisResult(jsonResponse);
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setAnalysisResult('Error analyzing the document. Please try again.');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
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
//               <span className="text-purple-700 text-xl">Upload PDF for Analysis</span>
//             </div>

//             <div
//               className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handlePdfUpload}
//                 accept="application/pdf"
//                 className="hidden"
//               />
//               {isProcessing ? (
//                 <div className="flex flex-col items-center">
//                   <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
//                   <p className="text-xl text-purple-600">Processing document...</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <Upload className="w-12 h-12 text-purple-600 mb-4" />
//                   <p className="text-xl text-purple-600">Click to upload your PDF</p>
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
//                 <h3 className="text-xl font-semibold text-purple-700">Analysis Result (JSON)</h3>
//                 <pre className="text-lg whitespace-pre-wrap">
//                   {JSON.stringify(analysisResult, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }







'use client';
import { useState, useRef } from 'react';
import { useAnalysis } from '@/context/AnalysisContext';
import { motion } from 'framer-motion';
import { FileText, Upload, Scan } from 'lucide-react';
import OpenAI from 'openai';

export default function Dashboard() {
  const { extractedText, analysisResult, setExtractedText, setAnalysisResult } = useAnalysis();
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiKey = "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"!;
  const assistantId = "asst_Hf4S657kkNGwMPboOMORiVgU"
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });



// Handle PDF Upload
const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    await processPdf(file);
  }
};

// Extract text from PDF
const processPdf = async (file: File) => {
  setIsProcessing(true);
  setAnalysisResult('');

  try {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const pdfData = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await getDocument({ data: pdfData }).promise;

      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(' ');
        text += pageText + '\n';
      }

      setExtractedText(text);
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    setExtractedText('Error extracting text from PDF.');
  } finally {
    setIsProcessing(false);
  }
};

// Generate Analysis Prompt
const getAnalysisPrompt = (content: string) => `
  Extract the following details from this health insurance policy and return in JSON format:
  {
    "policy_name": "",
    "insurer_name": "",
    "hidden_clauses": [],
    "benefits": [],
    "pros": [],
    "cons": [],
    "important_dates": {},
    "claim_deadlines": {}
  }
  Document content:
  ${content}
`;

// Analyze Extracted Text using OpenAI
const analyzeText = async () => {
  if (!extractedText.trim()) {
    alert('Please upload a document first.');
    return;
  }

  setIsAnalyzing(true);
  setAnalysisResult('');

  try {
    // Add a delay to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: getAnalysisPrompt(extractedText) }],
      temperature: 0.3,
    });

    // Ensure response content is not null
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }

    const jsonResponse = JSON.parse(content);
    localStorage.setItem('analysisResult', JSON.stringify(jsonResponse));
    setAnalysisResult(jsonResponse);
  } catch (error: any) {
    console.error('Analysis error:', error);

    if (error.status === 429) {
      // Handle rate limit error
      setAnalysisResult('You are sending too many requests. Please wait and try again.');
    } else if (error.message.includes('quota')) {
      // Handle quota exceeded error
      setAnalysisResult('You have exceeded your API quota. Please check your billing details.');
    } else {
      // Handle other errors
      setAnalysisResult('Error analyzing the document. Please try again.');
    }
  } finally {
    setIsAnalyzing(false);
  }
};

return (
  <div className="min-h-screen bg-white text-gray-800 font-sans">
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
            <span className="text-purple-700 text-xl">Upload PDF for Analysis</span>
          </div>

          <div
            className="border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePdfUpload}
              accept="application/pdf"
              className="hidden"
            />
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <Scan className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                <p className="text-xl text-purple-600">Processing document...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-purple-600 mb-4" />
                <p className="text-xl text-purple-600">Click to upload your PDF</p>
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
          {analysisResult && (
            <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700">Analysis Result (JSON)</h3>
              <pre className="text-lg whitespace-pre-wrap">
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
    </main>
  </div>
);
}
