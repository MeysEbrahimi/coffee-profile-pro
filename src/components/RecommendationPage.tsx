import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerProfile, CoffeeRecommendation } from '../pages/Index';
import { Coffee, Star, Sparkles, RotateCcw, Target, Award } from 'lucide-react';

interface RecommendationPageProps {
  profile: CustomerProfile;
  onStartNew: () => void;
}

// Coffee Matrix Data (unchanged from original)
const coffeeMatrix = [
  {
    id: 1,
    type: 'سینگل اوریجین اتیوپی',
    roastLevel: 'رُست متوسط روشن',
    brewingMethod: 'V60',
    grindSize: 'متوسط',
    flavorProfile: ['میوه‌ای', 'گلی', 'سیتروسی'],
    characteristics: { acidity: 'high', body: 'light' },
    experience: ['intermediate', 'advanced', 'expert'],
    tools: ['V60', 'کمکس', 'فرنچ پرس'],
    budget: ['medium', 'high']
  },
  {
    id: 2,
    type: 'بلند برزیل - کلمبیا',
    roastLevel: 'رُست متوسط',
    brewingMethod: 'فرنچ پرس',
    grindSize: 'درشت',
    flavorProfile: ['شکلاتی', 'آجیلی', 'کارامل'],
    characteristics: { acidity: 'medium', body: 'medium' },
    experience: ['beginner', 'intermediate'],
    tools: ['فرنچ پرس', 'اسپرسو ساز', 'موکاپات'],
    budget: ['low', 'medium']
  },
  {
    id: 3,
    type: 'سینگل اوریجین یمن',
    roastLevel: 'رُست تیره',
    brewingMethod: 'ایروپرس',
    grindSize: 'متوسط ریز',
    flavorProfile: ['ادویه‌ای', 'شکلاتی'],
    characteristics: { acidity: 'low', body: 'full' },
    experience: ['advanced', 'expert'],
    tools: ['ایروپرس', 'فرنچ پرس'],
    budget: ['high']
  },
  {
    id: 4,
    type: 'بلند مکزیک - گواتمالا',
    roastLevel: 'رُست متوسط',
    brewingMethod: 'کمکس',
    grindSize: 'متوسط',
    flavorProfile: ['شکلاتی', 'وانیل', 'آجیلی'],
    characteristics: { acidity: 'medium', body: 'medium' },
    experience: ['beginner', 'intermediate', 'advanced'],
    tools: ['کمکس', 'V60', 'اسپرسو ساز'],
    budget: ['medium']
  },
  {
    id: 5,
    type: 'سینگل اوریجین کنیا',
    roastLevel: 'رُست متوسط روشن',
    brewingMethod: 'V60',
    grindSize: 'متوسط',
    flavorProfile: ['میوه‌ای', 'سیتروسی'],
    characteristics: { acidity: 'high', body: 'medium' },
    experience: ['intermediate', 'advanced', 'expert'],
    tools: ['V60', 'کمکس', 'ایروپرس'],
    budget: ['medium', 'high']
  },
  {
    id: 6,
    type: 'اسپرسو بلند ایتالیایی',
    roastLevel: 'رُست تیره',
    brewingMethod: 'اسپرسو ساز',
    grindSize: 'ریز',
    flavorProfile: ['شکلاتی', 'کارامل'],
    characteristics: { acidity: 'low', body: 'full' },
    experience: ['beginner', 'intermediate', 'advanced'],
    tools: ['اسپرسو ساز', 'موکاپات'],
    budget: ['low', 'medium']
  }
];

const getRecommendation = (profile: CustomerProfile): CoffeeRecommendation & { matchingFactors: Array<{name: string, percentage: number, color: string}> } => {
  let bestMatch = coffeeMatrix[0];
  let highestScore = 0;
  let matchingFactors: Array<{name: string, percentage: number, color: string}> = [];

  coffeeMatrix.forEach(coffee => {
    let score = 0;
    let factors: Array<{name: string, percentage: number, color: string}> = [];

    // Experience matching
    if (coffee.experience.includes(profile.experience)) {
      score += 20;
      factors.push({name: 'سطح تجربه', percentage: 95, color: 'bg-blue-400'});
    }

    // Tools matching
    const toolMatches = coffee.tools.filter(tool => profile.brewingTools.includes(tool));
    if (toolMatches.length > 0) {
      const toolScore = (toolMatches.length / profile.brewingTools.length) * 15;
      score += toolScore;
      factors.push({name: 'ابزار دم‌آوری', percentage: Math.round((toolMatches.length / profile.brewingTools.length) * 100), color: 'bg-green-400'});
    }

    // Flavor matching
    const flavorMatches = coffee.flavorProfile.filter(flavor => profile.flavors.includes(flavor));
    if (flavorMatches.length > 0) {
      const flavorScore = (flavorMatches.length / profile.flavors.length) * 10;
      score += flavorScore;
      factors.push({name: 'پروفایل طعمی', percentage: Math.round((flavorMatches.length / profile.flavors.length) * 100), color: 'bg-purple-400'});
    }

    // Acidity matching
    if (coffee.characteristics.acidity === profile.acidity) {
      score += 15;
      factors.push({name: 'اسیدیته', percentage: 100, color: 'bg-pink-400'});
    }

    // Body matching
    if (coffee.characteristics.body === profile.body) {
      score += 15;
      factors.push({name: 'بادی', percentage: 100, color: 'bg-indigo-400'});
    }

    // Budget matching
    if (coffee.budget.includes(profile.budget)) {
      score += 10;
      factors.push({name: 'بودجه', percentage: 90, color: 'bg-teal-400'});
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = coffee;
      matchingFactors = factors;
    }
  });

  // Generate reason based on matching criteria
  let reason = 'این قهوه بر اساس ';
  const reasons = [];

  if (bestMatch.experience.includes(profile.experience)) {
    const experienceLabels = {
      'beginner': 'سطح تجربه مناسب',
      'intermediate': 'تجربه متوسط شما',
      'advanced': 'تجربه پیشرفته شما',
      'expert': 'تخصص بالای شما'
    };
    reasons.push(experienceLabels[profile.experience as keyof typeof experienceLabels]);
  }

  const toolMatches = bestMatch.tools.filter(tool => profile.brewingTools.includes(tool));
  if (toolMatches.length > 0) {
    reasons.push(`ابزار ${toolMatches[0]} که دارید`);
  }

  const flavorMatches = bestMatch.flavorProfile.filter(flavor => profile.flavors.includes(flavor));
  if (flavorMatches.length > 0) {
    reasons.push(`علاقه شما به طعم‌های ${flavorMatches.slice(0, 2).join(' و ')}`);
  }

  reason += reasons.slice(0, 3).join('، ') + ' انتخاب شده است.';

  return {
    type: bestMatch.type,
    roastLevel: bestMatch.roastLevel,
    brewingMethod: bestMatch.brewingMethod,
    grindSize: bestMatch.grindSize,
    flavorProfile: bestMatch.flavorProfile,
    characteristics: bestMatch.characteristics,
    reason,
    score: Math.round(highestScore),
    matchingFactors
  };
};

const RecommendationPage: React.FC<RecommendationPageProps> = ({ profile, onStartNew }) => {
  const recommendation = getRecommendation(profile);

  const getAcidityLabel = (acidity: string) => {
    const labels = {
      'low': 'کم',
      'medium': 'متوسط',
      'high': 'زیاد'
    };
    return labels[acidity as keyof typeof labels];
  };

  const getBodyLabel = (body: string) => {
    const labels = {
      'light': 'سبک',
      'medium': 'متوسط',
      'full': 'غلیظ'
    };
    return labels[body as keyof typeof labels];
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    return 'text-slate-600';
  };

  return (
    <div className="min-h-screen soft-gradient py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-700 mb-2">پیشنهاد ویژه شما</h1>
          <p className="text-slate-600">بر اساس پروفایل شما، بهترین انتخاب را پیدا کردیم</p>
        </div>

        {/* Main Recommendation Card */}
        <Card className="shadow-xl border-0 overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <Coffee className="w-12 h-12 text-slate-200" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">{recommendation.type}</CardTitle>
            <div className="flex items-center justify-center">
              <Target className="w-6 h-6 text-slate-200 ml-2" />
              <span className={`text-2xl font-bold ${getScoreColor(recommendation.score)}`}>
                {recommendation.score}% تطابق
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Matching Factors */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">پارامترهای تطابق</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recommendation.matchingFactors.map((factor, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">{factor.name}</span>
                      <span className="text-sm font-bold text-slate-700">{factor.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${factor.color} transition-all duration-1000`}
                        style={{ width: `${factor.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* مشخصات کلی */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-700 mb-4">مشخصات کلی</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">سطح رُست:</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {recommendation.roastLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">روش دم‌آوری:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {recommendation.brewingMethod}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">درجه آسیاب:</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {recommendation.grindSize}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* خصوصیات حسی */}
                <div>
                  <h3 className="text-xl font-bold text-slate-700 mb-4">خصوصیات حسی</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">اسیدیته:</span>
                      <Badge variant="outline" className="border-pink-200 text-pink-600">
                        {getAcidityLabel(recommendation.characteristics.acidity)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">بادی:</span>
                      <Badge variant="outline" className="border-indigo-200 text-indigo-600">
                        {getBodyLabel(recommendation.characteristics.body)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* پروفایل طعمی */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-700 mb-4">پروفایل طعمی</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.flavorProfile.map((flavor, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-slate-400 to-slate-500 text-white px-3 py-1 text-sm"
                      >
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* میزان کلی تطابق */}
                <div>
                  <h3 className="text-xl font-bold text-slate-700 mb-4">امتیاز کلی</h3>
                  <div className="bg-slate-50 rounded-lg p-6 text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(recommendation.score)}`}>
                      {recommendation.score}%
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-slate-500 to-slate-600 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${recommendation.score}%` }}
                      />
                    </div>
                    <p className="text-slate-600 mt-2">میزان تطابق با سلیقه شما</p>
                  </div>
                </div>
              </div>
            </div>

            {/* دلیل انتخاب */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border-r-4 border-slate-500">
              <h3 className="text-xl font-bold text-slate-700 mb-3">چرا این انتخاب؟</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {recommendation.reason}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={onStartNew}
            size="lg"
            variant="outline"
            className="bg-white hover:bg-slate-50 text-slate-700 border-slate-300 font-bold py-4 px-12 rounded-full text-xl shadow-lg"
          >
            <RotateCcw className="w-6 h-6 ml-2" />
            شروع پروفایل جدید
          </Button>
          
          <p className="text-slate-600 text-sm">
            آیا نتیجه را دوست داشتید؟ می‌توانید پروفایل جدیدی ایجاد کنید
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
