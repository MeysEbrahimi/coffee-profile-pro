
import React, { useState } from 'react';
import WelcomePage from '../components/WelcomePage';
import ProfilingPage from '../components/ProfilingPage';
import RecommendationPage from '../components/RecommendationPage';

export type CustomerProfile = {
  experience: string;
  brewingTools: string[];
  flavors: string[];
  acidity: string;
  body: string;
  budget: string;
};

export type CoffeeRecommendation = {
  type: string;
  roastLevel: string;
  brewingMethod: string;
  grindSize: string;
  flavorProfile: string[];
  characteristics: {
    acidity: string;
    body: string;
  };
  reason: string;
  score: number;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'profiling' | 'recommendation'>('welcome');
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);

  const handleStartProfiling = () => {
    setCurrentStep('profiling');
  };

  const handleProfileComplete = (profile: CustomerProfile) => {
    setCustomerProfile(profile);
    setCurrentStep('recommendation');
  };

  const handleStartNew = () => {
    setCustomerProfile(null);
    setCurrentStep('welcome');
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {currentStep === 'welcome' && (
        <WelcomePage onStartProfiling={handleStartProfiling} />
      )}
      
      {currentStep === 'profiling' && (
        <ProfilingPage onProfileComplete={handleProfileComplete} />
      )}
      
      {currentStep === 'recommendation' && customerProfile && (
        <RecommendationPage 
          profile={customerProfile} 
          onStartNew={handleStartNew}
        />
      )}
    </div>
  );
};

export default Index;
