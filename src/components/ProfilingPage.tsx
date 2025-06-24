
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CustomerProfile } from '../pages/Index';
import { ArrowRight, ArrowLeft, Coffee, CheckCircle } from 'lucide-react';

interface ProfilingPageProps {
  onProfileComplete: (profile: CustomerProfile) => void;
}

const ProfilingPage: React.FC<ProfilingPageProps> = ({ onProfileComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<CustomerProfile>({
    experience: '',
    brewingTools: [],
    flavors: [],
    acidity: '',
    body: '',
    budget: ''
  });

  const questions = [
    {
      id: 'experience',
      title: 'سطح تجربه شما در قهوه چطور است؟',
      type: 'radio',
      options: [
        { value: 'beginner', label: 'تازه‌کار - به تازگی علاقه‌مند شده‌ام' },
        { value: 'intermediate', label: 'متوسط - چند سال است قهوه می‌نوشم' },
        { value: 'advanced', label: 'پیشرفته - در مورد قهوه اطلاعات زیادی دارم' },
        { value: 'expert', label: 'متخصص - در صنعت قهوه فعالیت می‌کنم' }
      ]
    },
    {
      id: 'brewingTools',
      title: 'کدام ابزارهای دم‌آوری را دارید؟',
      type: 'checkbox',
      options: [
        'اسپرسو ساز', 'فرنچ پرس', 'V60', 'کمکس',
        'ایروپرس', 'موکاپات', 'کولد برو', 'سایفون'
      ]
    },
    {
      id: 'flavors',
      title: 'کدام طعم‌ها را ترجیح می‌دهید؟',
      type: 'checkbox',
      options: [
        'میوه‌ای', 'شکلاتی', 'آجیلی', 'گلی',
        'ادویه‌ای', 'کارامل', 'وانیل', 'سیتروسی'
      ]
    },
    {
      id: 'acidity',
      title: 'چه میزان اسیدیته ترجیح می‌دهید؟',
      type: 'radio',
      options: [
        { value: 'low', label: 'کم - طعم ملایم و نرم' },
        { value: 'medium', label: 'متوسط - تعادل مناسب' },
        { value: 'high', label: 'زیاد - طعم زنده و شاداب' }
      ]
    },
    {
      id: 'body',
      title: 'چه میزان غلظت (بادی) ترجیح می‌دهید؟',
      type: 'radio',
      options: [
        { value: 'light', label: 'سبک - نوشیدنی ملایم و صاف' },
        { value: 'medium', label: 'متوسط - حس متعادل در دهان' },
        { value: 'full', label: 'غلیظ - حس پرقدرت و کرمی' }
      ]
    },
    {
      id: 'budget',
      title: 'بودجه شما برای خرید قهوه چقدر است؟',
      type: 'radio',
      options: [
        { value: 'low', label: 'اقتصادی - زیر ۱۰۰ هزار تومان' },
        { value: 'medium', label: 'متوسط - ۱۰۰ تا ۲۰۰ هزار تومان' },
        { value: 'high', label: 'بالا - بیش از ۲۰۰ هزار تومان' }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onProfileComplete(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setProfile(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    setProfile(prev => {
      const currentArray = prev[questionId as keyof CustomerProfile] as string[];
      if (checked) {
        return { ...prev, [questionId]: [...currentArray, option] };
      } else {
        return { ...prev, [questionId]: currentArray.filter(item => item !== option) };
      }
    });
  };

  const isCurrentStepValid = () => {
    const question = questions[currentStep];
    const value = profile[question.id as keyof CustomerProfile];
    
    if (question.type === 'radio') {
      return value !== '';
    } else {
      return Array.isArray(value) && value.length > 0;
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen soft-gradient py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Coffee className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-700 mb-2">پروفایل‌سازی قهوه</h1>
          <p className="text-slate-600">مرحله {currentStep + 1} از {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-slate-400 to-slate-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentQuestion.type === 'radio' ? (
              <RadioGroup
                value={profile[currentQuestion.id as keyof CustomerProfile] as string}
                onValueChange={(value) => handleRadioChange(currentQuestion.id, value)}
                className="space-y-4"
              >
                {currentQuestion.options.map((option: any) => (
                  <div key={option.value} className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-lg cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option: string) => (
                  <div key={option} className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <Checkbox
                      id={option}
                      checked={(profile[currentQuestion.id as keyof CustomerProfile] as string[]).includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(currentQuestion.id, option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="text-lg cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>قبلی</span>
          </Button>

          <div className="flex items-center space-x-2 space-x-reverse">
            {isCurrentStepValid() && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <span className="text-sm text-slate-600">
              {currentStep + 1} / {questions.length}
            </span>
          </div>

          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 flex items-center space-x-2 space-x-reverse disabled:opacity-50"
          >
            <span>{currentStep === questions.length - 1 ? 'مشاهده پیشنهاد' : 'بعدی'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilingPage;
