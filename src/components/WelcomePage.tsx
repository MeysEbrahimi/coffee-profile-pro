
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, Leaf, Star } from 'lucide-react';

interface WelcomePageProps {
  onStartProfiling: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartProfiling }) => {
  return (
    <div className="min-h-screen coffee-gradient flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(63, 39, 24, 0.4), rgba(101, 67, 33, 0.6)), url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center">
          {/* Coffee Steam Animation */}
          <div className="mb-8">
            <Coffee className="w-16 h-16 text-yellow-200 coffee-steam" />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            راهنمای شخصی
            <br />
            <span className="text-yellow-200">قهوه شما</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl leading-relaxed">
            با چند سوال ساده، بهترین قهوه متناسب با سلیقه و نیازهای شما را پیدا کنید
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center text-white">
              <Star className="w-5 h-5 text-yellow-200 ml-2" />
              <span>پیشنهاد شخصی‌سازی شده</span>
            </div>
            <div className="flex items-center text-white">
              <Leaf className="w-5 h-5 text-green-200 ml-2" />
              <span>کیفیت باالا</span>
            </div>
            <div className="flex items-center text-white">
              <Coffee className="w-5 h-5 text-yellow-200 ml-2" />
              <span>مشاوره تخصصی</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={onStartProfiling}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            شروع پروفایل‌سازی
          </Button>
          
          <p className="text-gray-200 mt-4 text-sm">
            فقط ۲ دقیقه وقت می‌برد
          </p>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <svg className="w-full h-20 text-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0,120 L1440,120 L1440,0 C1440,0 1140,60 720,60 C300,60 0,0 0,0 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default WelcomePage;
