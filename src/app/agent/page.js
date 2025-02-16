// "use client"
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
// import { Bell, FileText, AlertCircle, Phone, Activity, Calendar, Shield, MessageSquare } from 'lucide-react';
// import { useAnalysis } from '@/context/AnalysisContext';

// const InsuranceAIDashboard = () => {
//   const [fontSize, setFontSize] = useState('normal');
//   const { extractedText, analysisResult } = useAnalysis();

//   // Simulated policy data
//   const policyData = {
//     name: "John Smith",
//     policyNumber: "POL-2025-789",
//     type: "Health Insurance",
//     status: "Active",
//     nextPayment: "March 15, 2025",
//     lastClaim: "January 10, 2025"
//   };

//   // Simulated alerts
//   const alerts = [
//     {
//       type: "warning",
//       title: "Premium Due Soon",
//       description: "Your next premium payment of $245 is due in 7 days."
//     },
//     {
//       type: "info",
//       title: "Policy Update",
//       description: "New preventive care benefits added to your plan starting next month."
//     }
//   ];

//   // Text size classes based on preference
//   const textSizes = {
//     normal: {
//       heading: "text-2xl",
//       subheading: "text-xl",
//       body: "text-base"
//     },
//     large: {
//       heading: "text-3xl",
//       subheading: "text-2xl",
//       body: "text-lg"
//     }
//   };

//   const currentSize = textSizes[fontSize];

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       {/* Header with accessibility controls */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className={`${currentSize.heading} font-bold`}>Your Insurance Assistant</h1>
//         <button
//           onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           {fontSize === 'normal' ? 'Increase Text Size' : 'Decrease Text Size'}
//         </button>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <Phone className="h-8 w-8 text-blue-600 mb-2" />
//             <span className={currentSize.body}>Emergency Support</span>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <FileText className="h-8 w-8 text-green-600 mb-2" />
//             <span className={currentSize.body}>File New Claim</span>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <Activity className="h-8 w-8 text-purple-600 mb-2" />
//             <span className={currentSize.body}>View Benefits</span>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <MessageSquare className="h-8 w-8 text-orange-600 mb-2" />
//             <span className={currentSize.body}>Chat with AI</span>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Policy Overview */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle className={currentSize.subheading}>Policy Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Policy Holder:</span>
//                 <span className={currentSize.body}>{policyData.name}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Policy Number:</span>
//                 <span className={currentSize.body}>{policyData.policyNumber}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Type:</span>
//                 <span className={currentSize.body}>{policyData.type}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Status:</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
//                   {policyData.status}
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Alerts and Notifications */}
//         <Card>
//           <CardHeader>
//             <CardTitle className={currentSize.subheading}>
//               <div className="flex items-center">
//                 <Bell className="mr-2 h-6 w-6" />
//                 Important Updates
//               </div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {alerts.map((alert, index) => (
//                 <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertTitle className={currentSize.body}>{alert.title}</AlertTitle>
//                   <AlertDescription className={currentSize.body}>
//                     {alert.description}
//                   </AlertDescription>
//                 </Alert>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Activity Timeline */}
//       <Card>
//         <CardHeader>
//           <CardTitle className={currentSize.subheading}>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <Calendar className="h-6 w-6 text-blue-600" />
//               <div>
//                 <p className={`${currentSize.body} font-medium`}>Premium Payment Due</p>
//                 <p className={`${currentSize.body} text-gray-600`}>Next payment: {policyData.nextPayment}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Shield className="h-6 w-6 text-green-600" />
//               <div>
//                 <p className={`${currentSize.body} font-medium`}>Last Claim Processed</p>
//                 <p className={`${currentSize.body} text-gray-600`}>Date: {policyData.lastClaim}</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default InsuranceAIDashboard;




// "use client"
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
// import { Bell, FileText, AlertCircle, Phone, Activity, Calendar, Shield, MessageSquare } from 'lucide-react';
// import { useAnalysis } from '@/context/AnalysisContext';

// const InsuranceAIDashboard = () => {
//   const [fontSize, setFontSize] = useState('normal');
//   const { extractedText, analysisResult } = useAnalysis();

//   // Simulated policy data
//   const policyData = {
//     name: "John Smith",
//     policyNumber: "POL-2025-789",
//     type: "Health Insurance",
//     status: "Active",
//     nextPayment: "March 15, 2025",
//     lastClaim: "January 10, 2025"
//   };

//   // Simulated alerts
//   const alerts = [
//     {
//       type: "warning",
//       title: "Premium Due Soon",
//       description: "Your next premium payment of $245 is due in 7 days."
//     },
//     {
//       type: "info",
//       title: "Policy Update",
//       description: "New preventive care benefits added to your plan starting next month."
//     }
//   ];

//   // Text size classes based on preference
//   const textSizes = {
//     normal: {
//       heading: "text-2xl",
//       subheading: "text-xl",
//       body: "text-base"
//     },
//     large: {
//       heading: "text-3xl",
//       subheading: "text-2xl",
//       body: "text-lg"
//     }
//   };

//   const currentSize = textSizes[fontSize];

//   // Parse analysisResult to extract key insights
//   const getPolicyInsights = () => {
//     if (!analysisResult) return null;

//     const insights = {
//       hiddenClauses: [],
//       financialObligations: [],
//       importantDates: [],
//       riskAssessment: {},
//       prosCons: {}
//     };

//     // Extract hidden clauses
//     const hiddenClausesMatch = analysisResult.match(/\*\*1\. Hidden Clauses and Terms:\*\*([\s\S]*?)\*\*2\./);
//     if (hiddenClausesMatch) {
//       insights.hiddenClauses = hiddenClausesMatch[1].split('*').filter(line => line.trim()).map(line => line.trim());
//     }

//     // Extract financial obligations
//     const financialObligationsMatch = analysisResult.match(/\*\*2\. Financial Obligations:\*\*([\s\S]*?)\*\*3\./);
//     if (financialObligationsMatch) {
//       insights.financialObligations = financialObligationsMatch[1].split('*').filter(line => line.trim()).map(line => line.trim());
//     }

//     // Extract important dates
//     const importantDatesMatch = analysisResult.match(/\*\*3\. Important Dates and Deadlines:\*\*([\s\S]*?)\*\*4\./);
//     if (importantDatesMatch) {
//       insights.importantDates = importantDatesMatch[1].split('*').filter(line => line.trim()).map(line => line.trim());
//     }

//     // Extract risk assessment
//     const riskAssessmentMatch = analysisResult.match(/\*\*4\. Risk Assessment:\*\*([\s\S]*?)\*\*Pros and Cons:\*\*/);
//     if (riskAssessmentMatch) {
//       insights.riskAssessment = {
//         rating: riskAssessmentMatch[1].match(/I would rate the risk a (\d\/\d)/)?.[1],
//         recommendation: riskAssessmentMatch[1].match(/Recommendation: (.*)/)?.[1],
//         modification: riskAssessmentMatch[1].match(/Modification: (.*)/)?.[1]
//       };
//     }

//     // Extract pros and cons
//     const prosConsMatch = analysisResult.match(/\*\*Pros and Cons:\*\*([\s\S]*?)\*\*Overall Rating:\*\*/);
//     if (prosConsMatch) {
//       insights.prosCons = {
//         pros: prosConsMatch[1].match(/\*\*Why it's good:\*\*([\s\S]*?)\*\*Why it's not good:\*\*/)?.[1].trim(),
//         cons: prosConsMatch[1].match(/\*\*Why it's not good:\*\*([\s\S]*?)\*\*Overall Rating:\*\*/)?.[1].trim()
//       };
//     }

//     return insights;
//   };

//   const policyInsights = getPolicyInsights();

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       {/* Header with accessibility controls */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className={`${currentSize.heading} font-bold`}>Your Insurance Assistant</h1>
//         <button
//           onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           {fontSize === 'normal' ? 'Increase Text Size' : 'Decrease Text Size'}
//         </button>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <Phone className="h-8 w-8 text-blue-600 mb-2" />
//             <span className={currentSize.body}>Emergency Support</span>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <FileText className="h-8 w-8 text-green-600 mb-2" />
//             <span className={currentSize.body}>File New Claim</span>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <Activity className="h-8 w-8 text-purple-600 mb-2" />
//             <span className={currentSize.body}>View Benefits</span>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//           <CardContent className="p-6 flex flex-col items-center">
//             <MessageSquare className="h-8 w-8 text-orange-600 mb-2" />
//             <span className={currentSize.body}>Chat with AI</span>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Policy Overview */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle className={currentSize.subheading}>Policy Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Policy Holder:</span>
//                 <span className={currentSize.body}>{policyData.name}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Policy Number:</span>
//                 <span className={currentSize.body}>{policyData.policyNumber}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Type:</span>
//                 <span className={currentSize.body}>{policyData.type}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className={`${currentSize.body} font-medium`}>Status:</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
//                   {policyData.status}
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Alerts and Notifications */}
//         <Card>
//           <CardHeader>
//             <CardTitle className={currentSize.subheading}>
//               <div className="flex items-center">
//                 <Bell className="mr-2 h-6 w-6" />
//                 Important Updates
//               </div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {alerts.map((alert, index) => (
//                 <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertTitle className={currentSize.body}>{alert.title}</AlertTitle>
//                   <AlertDescription className={currentSize.body}>
//                     {alert.description}
//                   </AlertDescription>
//                 </Alert>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Policy Insights */}
//       {policyInsights && (
//         <Card>
//           <CardHeader>
//             <CardTitle className={currentSize.subheading}>Policy Insights</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {/* Hidden Clauses */}
//               {policyInsights.hiddenClauses.length > 0 && (
//                 <div>
//                   <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Hidden Clauses and Terms</h3>
//                   <ul className="list-disc list-inside space-y-2">
//                     {policyInsights.hiddenClauses.map((clause, index) => (
//                       <li key={index} className={currentSize.body}>{clause}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Financial Obligations */}
//               {policyInsights.financialObligations.length > 0 && (
//                 <div>
//                   <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Financial Obligations</h3>
//                   <ul className="list-disc list-inside space-y-2">
//                     {policyInsights.financialObligations.map((obligation, index) => (
//                       <li key={index} className={currentSize.body}>{obligation}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Important Dates */}
//               {policyInsights.importantDates.length > 0 && (
//                 <div>
//                   <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Important Dates and Deadlines</h3>
//                   <ul className="list-disc list-inside space-y-2">
//                     {policyInsights.importantDates.map((date, index) => (
//                       <li key={index} className={currentSize.body}>{date}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Risk Assessment */}
//               {policyInsights.riskAssessment.rating && (
//                 <div>
//                   <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Risk Assessment</h3>
//                   <p className={currentSize.body}>Rating: {policyInsights.riskAssessment.rating}</p>
//                   <p className={currentSize.body}>Recommendation: {policyInsights.riskAssessment.recommendation}</p>
//                   <p className={currentSize.body}>Modification: {policyInsights.riskAssessment.modification}</p>
//                 </div>
//               )}

//               {/* Pros and Cons */}
//               {policyInsights.prosCons.pros && (
//                 <div>
//                   <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Pros and Cons</h3>
//                   <div className="space-y-2">
//                     <p className={currentSize.body}><strong>Pros:</strong> {policyInsights.prosCons.pros}</p>
//                     <p className={currentSize.body}><strong>Cons:</strong> {policyInsights.prosCons.cons}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Activity Timeline */}
//       <Card>
//         <CardHeader>
//           <CardTitle className={currentSize.subheading}>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <Calendar className="h-6 w-6 text-blue-600" />
//               <div>
//                 <p className={`${currentSize.body} font-medium`}>Premium Payment Due</p>
//                 <p className={`${currentSize.body} text-gray-600`}>Next payment: {policyData.nextPayment}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Shield className="h-6 w-6 text-green-600" />
//               <div>
//                 <p className={`${currentSize.body} font-medium`}>Last Claim Processed</p>
//                 <p className={`${currentSize.body} text-gray-600`}>Date: {policyData.lastClaim}</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default InsuranceAIDashboard;




"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, FileText, AlertCircle, Phone, Activity, Calendar, Shield, MessageSquare } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

const InsuranceAIDashboard = () => {
  const [fontSize, setFontSize] = useState("normal");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { extractedText, analysisResult } = useAnalysis();

  // Simulated policy data
  const policyData = {
    name: "John Smith",
    policyNumber: "POL-2025-789",
    type: "Health Insurance",
    status: "Active",
    nextPayment: "March 15, 2025",
    lastClaim: "January 10, 2025",
  };

  // Simulated claims data for chart
  const claimsData = [
    { month: "Jan", claims: 2, amount: 5000 },
    { month: "Feb", claims: 1, amount: 2500 },
    { month: "Mar", claims: 3, amount: 7500 },
    { month: "Apr", claims: 0, amount: 0 },
    { month: "May", claims: 2, amount: 6000 },
  ];

  // Simulated policy health score
  const policyHealthScore = 82; // Out of 100

  // Fetch notifications (simulated)
  useEffect(() => {
    // Replace with real API call
    const fetchNotifications = async () => {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  // Text size classes based on preference
  const textSizes = {
    normal: {
      heading: "text-2xl",
      subheading: "text-xl",
      body: "text-base",
    },
    large: {
      heading: "text-3xl",
      subheading: "text-2xl",
      body: "text-lg",
    },
  };

  const currentSize = textSizes[fontSize];

  // Parse analysisResult to extract key insights
  const getPolicyInsights = () => {
    if (!analysisResult) return null;

    return {
      hiddenClauses: analysisResult.hidden_clauses || [],
      financialObligations: analysisResult.financial_obligations || {},
      importantDates: analysisResult.important_dates || {},
      riskAssessment: analysisResult.risk_assessment || {},
      prosCons: {
        pros: analysisResult.pros || [],
        cons: analysisResult.cons || [],
      },
      futuristicPrediction: analysisResult.futuristic_prediction || {},
    };
  };

  const policyInsights = getPolicyInsights();

  return (
    <div className={`${darkMode ? "dark" : ""} max-w-6xl mx-auto p-4 space-y-6`}>
      {/* Header with accessibility controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`${currentSize.heading} font-bold`}>Your Insurance Assistant</h1>
        <div className="flex gap-4">
          <Button onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")}>
            {fontSize === "normal" ? "Increase Text Size" : "Decrease Text Size"}
          </Button>
          <Toggle pressed={darkMode} onPressedChange={setDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Toggle>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center">
            <Phone className="h-8 w-8 text-blue-600 mb-2" />
            <span className={currentSize.body}>Emergency Support</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center">
            <FileText className="h-8 w-8 text-green-600 mb-2" />
            <span className={currentSize.body}>File New Claim</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center">
            <Activity className="h-8 w-8 text-purple-600 mb-2" />
            <span className={currentSize.body}>View Benefits</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center">
            <MessageSquare className="h-8 w-8 text-orange-600 mb-2" />
            <span className={currentSize.body}>Chat with AI</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Policy Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className={currentSize.subheading}>Policy Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`${currentSize.body} font-medium`}>Policy Holder:</span>
                <span className={currentSize.body}>{policyData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${currentSize.body} font-medium`}>Policy Number:</span>
                <span className={currentSize.body}>{policyData.policyNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${currentSize.body} font-medium`}>Type:</span>
                <span className={currentSize.body}>{policyData.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${currentSize.body} font-medium`}>Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">{policyData.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className={currentSize.subheading}>
              <div className="flex items-center">
                <Bell className="mr-2 h-6 w-6" />
                Important Updates
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((alert, index) => (
                <Alert key={index} variant={alert.type === "warning" ? "destructive" : "default"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className={currentSize.body}>{alert.title}</AlertTitle>
                  <AlertDescription className={currentSize.body}>{alert.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Insights */}
      {policyInsights && (
        <Card>
          <CardHeader>
            <CardTitle className={currentSize.subheading}>Policy Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Hidden Clauses */}
              {policyInsights.hiddenClauses.length > 0 && (
                <div>
                  <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Hidden Clauses and Terms</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {policyInsights.hiddenClauses.map((clause, index) => (
                      <li key={index} className={currentSize.body}>
                        {clause.clause}: {clause.impact} (Risk: {clause.risk_level})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Financial Obligations */}
              <div>
                <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Financial Obligations</h3>
                <p className={currentSize.body}>Premiums: {policyInsights.financialObligations.premiums}</p>
                <p className={currentSize.body}>Variable Costs: {policyInsights.financialObligations.variable_costs}</p>
                <p className={currentSize.body}>Penalties: {policyInsights.financialObligations.penalties}</p>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Important Dates</h3>
                <p className={currentSize.body}>
  Policy Period: {policyInsights.importantDates?.policy_period?.start_date ?? "N/A"} to{" "}
  {policyInsights.importantDates?.policy_period?.end_date ?? "N/A"}
</p>
<p className={currentSize.body}>
  Renewal Date: {policyInsights.importantDates?.renewal?.renewal_date ?? "N/A"}
</p>
<p className={currentSize.body}>
  Claim Deadlines: Pre-Hospitalization:{" "}
  {policyInsights.importantDates?.claim_deadlines?.pre_hospitalization ?? "N/A"} days, Post-Hospitalization:{" "}
  {policyInsights.importantDates?.claim_deadlines?.post_hospitalization ?? "N/A"} days
</p>
              </div>

              {/* Risk Assessment */}
              <div>
                <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Risk Assessment</h3>
                <p className={currentSize.body}>Rating: {policyInsights.riskAssessment.rating}/100</p>
                <p className={currentSize.body}>Recommendations: {policyInsights.riskAssessment.recommendations?.join(", ")}</p>
                <p className={currentSize.body}>Modifications: {policyInsights.riskAssessment.modifications?.join(", ")}</p>
              </div>

              {/* Pros and Cons */}
              <div>
                <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Pros and Cons</h3>
                <div className="space-y-2">
                  <p className={currentSize.body}>
                    <strong>Pros:</strong> {policyInsights.prosCons.pros?.join(", ")}
                  </p>
                  <p className={currentSize.body}>
                    <strong>Cons:</strong> {policyInsights.prosCons.cons?.join(", ")}
                  </p>
                </div>
              </div>

              {/* Futuristic Prediction */}
              <div>
                <h3 className={`${currentSize.subheading} font-semibold mb-2`}>Futuristic Prediction</h3>
                <p className={currentSize.body}>
  Total Claims Earned: {policyInsights.futuristicPrediction?.total_claims_earned?.amount ?? "N/A"} over{" "}
  {policyInsights.futuristicPrediction?.total_claims_earned?.period ?? "N/A"}
</p>
<p className={currentSize.body}>
  Total Payments Made: {policyInsights.futuristicPrediction?.total_payments_made?.amount ?? "N/A"} over{" "}
  {policyInsights.futuristicPrediction?.total_payments_made?.period ?? "N/A"}
</p>
<p className={currentSize.body}>
  Net Benefit: {policyInsights.futuristicPrediction?.net_benefit?.amount ?? "N/A"} over{" "}
  {policyInsights.futuristicPrediction?.net_benefit?.period ?? "N/A"}
</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Claims History Chart */}
      <Card>
        <CardHeader>
          <CardTitle className={currentSize.subheading}>Claims History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={claimsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Policy Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className={currentSize.subheading}>Policy Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-800">{policyHealthScore}</span>
            </div>
            <p className={currentSize.body}>
              Your policy health score is {policyHealthScore}/100. This score is based on your claim history, renewal
              status, and premium payments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceAIDashboard;