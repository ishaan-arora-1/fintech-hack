'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AnalysisContextType {
  extractedText: string;
  analysisResult: string;
  setExtractedText: (text: string) => void;
  setAnalysisResult: (result: string) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [extractedText, setExtractedText] = useState<string>(() => {
    return localStorage.getItem('extractedText') || '';
  });

  const [analysisResult, setAnalysisResult] = useState<string>(() => {
    return localStorage.getItem('analysisResult') || '';
  });

  // Store data in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('extractedText', extractedText);
  }, [extractedText]);

  useEffect(() => {
    localStorage.setItem('analysisResult', analysisResult);
  }, [analysisResult]);

  return (
    <AnalysisContext.Provider value={{ extractedText, analysisResult, setExtractedText, setAnalysisResult }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
