import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CustomerProfile } from '../pages/Index';
import { ArrowRight, Coffee } from 'lucide-react';

interface ProfilingPageProps {
  onProfileComplete: (profile: CustomerProfile) => void;
}

const ProfilingPage: React.FC<ProfilingPageProps> = ({ onProfileComplete }) => {
  const [profile, setProfile] = useState<CustomerProfile>({
    experience: '',
    brewingTools: [],
    flavors: [],
    acidity: '',
    body: '',
    budget: ''
  });

  const handleSubmit = () => {
    onProfileComplete(profile);
  };

  const handleFlavorChange = (flavor: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({
        ...prev,
        flavors: [...prev.flavors, flavor]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        flavors: prev.flavors.filter(f => f !== flavor)
      }));
    }
  };

  const handleToolChange = (tool: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({
        ...prev,
        brewingTools: [...prev.brewingTools, tool]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        brewingTools: prev.brewingTools.filter(t => t !== tool)
      }));
    }
  };

  const isFormValid = profile.experience && profile.brewingTools.length > 0 && 
                     profile.flavors.length > 0 && profile.acidity && 
                     profile.body && profile.budget;

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-cream to-secondary py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">پروفایل مشتری قهوه</h1>
          <p className="text-gray-600">لطفاً به سوالات زیر پاسخ دهید تا بهترین پیشنهاد را دریافت کنید</p>
        </div>

        <div className="grid gap-6">
          {/* سطح تجربه */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-coffee-bean text-white rounded-t-lg">
              <CardTitle className="text-xl">سطح تجربه شما در قهوه چطور است؟</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={profile.experience}
                onValueChange={(value) => setProfile(prev => ({ ...prev, experience: value }))}
                className="space-y-3"
              >
                {[
                  { value: 'beginner', label: 'تازه‌کار - به تازگی علاقه‌مند شده‌ام' },
                  { value: 'intermediate', label: 'متوسط - چند سال است قهوه می‌نوشم' },
                  { value: 'advanced', label: 'پیشرفته - در مورد قهوه اطلاعات زیادی دارم' },
                  { value: 'expert', label: 'متخصص - در صنعت قهوه فعالیت می‌کنم' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-lg cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* ابزار دم‌آوری */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-coffee-bean text-white rounded-t-lg">
              <CardTitle className="text-xl">کدام ابزارهای دم‌آوری را دارید؟ (می‌توانید چندتا انتخاب کنید)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'اسپرسو ساز',
                  'فرنچ پرس',
                  'V60',
                  'کمکس',
                  'ایروپرس',
                  'موکاپات',
                  'کولد برو',
                  'سایفون'
                ].map((tool) => (
                  <div key={tool} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={tool}
                      checked={profile.brewingTools.includes(tool)}
                      onCheckedChange={(checked) => handleToolChange(tool, checked as boolean)}
                    />
                    <Label htmlFor={tool} className="text-lg cursor-pointer">
                      {tool}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* طعم‌های ترجیحی */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-coffee-bean text-white rounded-t-lg">
              <CardTitle className="text-xl">کدام طعم‌ها را ترجیح می‌دهید؟ (می‌توانید چندتا انتخاب کنید)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'میوه‌ای',
                  'شکلاتی',
                  'آجیلی',
                  'گلی',
                  'ادویه‌ای',
                  'کارامل',
                  'وانیل',
                  'سیتروسی'
                ].map((flavor) => (
                  <div key={flavor} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={flavor}
                      checked={profile.flavors.includes(flavor)}
                      onCheckedChange={(checked) => handleFlavorChange(flavor, checked as boolean)}
                    />
                    <Label htmlFor={flavor} className="text-lg cursor-pointer">
                      {flavor}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* اسیدیته */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-coffee-bean text-white rounded-t-lg">
              <CardTitle className="text-xl">چه میزان اسیدیته ترجیح می‌دهید؟</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={profile.acidity}
                onValueChange={(value) => setProfile(prev => ({ ...prev, acidity: value }))}
                className="space-y-3"
              >
                {[
                  { value: 'low', label: 'کم - طعم ملایم و نرم' },
                  { value: 'medium', label: 'متوسط - تعادل مناسب' },
                  { value: 'high', label: 'زیاد - طعم زنده و شاداب' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={option.value} id={`acidity-${option.value}`} />
                    <Label htmlFor={`acidity-${option.value}`} className="text-lg cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* بادی */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-coffee-bean text-white rounded-t-lg">
              <CardTitle className="text-xl">چه میزان غلظت (بادی) ترجیح می‌دهید؟</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={profile.body}
                onValueChange={(value) => setProfile(prev => ({ ...prev, body: value }))}
                className="space-y-3"
              >
                {[
                  { value: 'light', label: 'سبک - نوشیدنی ملایم و صاف' },
                  { value: 'medium', label: 'متوسط - حس متعادل در دهان' },
                  { value: 'full', label: 'غلیظ - حس پرقدرت و کرمی' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={option.value} id={`body-${option.value}`} />
                    <Label htmlFor={`body-${option.value}`} className="text-lg cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* بودجه */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-coffee-bean text-white rounded-t-lg">
              <CardTitle className="text-xl">بودجه شما برای خرید قهوه چقدر است؟</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={profile.budget}
                onValueChange={(value) => setProfile(prev => ({ ...prev, budget: value }))}
                className="space-y-3"
              >
                {[
                  { value: 'low', label: 'اقتصادی - زیر ۱۰۰ هزار تومان' },
                  { value: 'medium', label: 'متوسط - ۱۰۰ تا ۲۰۰ هزار تومان' },
                  { value: 'high', label: 'بالا - بیش از ۲۰۰ هزار تومان' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                    <Label htmlFor={`budget-${option.value}`} className="text-lg cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            size="lg"
            className="bg-gradient-to-r from-coffee-bean to-primary hover:from-primary hover:to-coffee-bean text-white font-bold py-4 px-12 rounded-full text-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            مشاهده پیشنهاد من
            <ArrowRight className="w-6 h-6 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilingPage;
