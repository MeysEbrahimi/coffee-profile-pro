import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerProfile, CoffeeRecommendation } from '../pages/Index';
import { Coffee, Star, Sparkles, RotateCcw, TrendingDown, Package } from 'lucide-react';

interface RecommendationPageProps {
  profile: CustomerProfile;
  onStartNew: () => void;
}

// Coffee Matrix Data with Sales Metrics
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
    budget: ['medium', 'high'],
    salesMetrics: { monthlyUnits: 8, inventory: 45, promotionBoost: 1.5 }
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
    budget: ['low', 'medium'],
    salesMetrics: { monthlyUnits: 25, inventory: 12, promotionBoost: 1.0 }
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
    budget: ['high'],
    salesMetrics: { monthlyUnits: 4, inventory: 38, promotionBoost: 2.0 }
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
    budget: ['medium'],
    salesMetrics: { monthlyUnits: 12, inventory: 28, promotionBoost: 1.3 }
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
    budget: ['medium', 'high'],
    salesMetrics: { monthlyUnits: 18, inventory: 22, promotionBoost: 1.1 }
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
    budget: ['low', 'medium'],
    salesMetrics: { monthlyUnits: 32, inventory: 8, promotionBoost: 0.9 }
  }
];

const getRecommendation = (profile: CustomerProfile): CoffeeRecommendation => {
  let bestMatch = coffeeMatrix[0];
  let highestScore = 0;

  coffeeMatrix.forEach(coffee => {
    let score = 0;

    // Experience matching
    if (coffee.experience.includes(profile.experience)) {
      score += 20;
    }

    // Tools matching
    const toolMatches = coffee.tools.filter(tool => profile.brewingTools.includes(tool));
    score += toolMatches.length * 15;

    // Flavor matching
    const flavorMatches = coffee.flavorProfile.filter(flavor => profile.flavors.includes(flavor));
    score += flavorMatches.length * 10;

    // Acidity matching
    if (coffee.characteristics.acidity === profile.acidity) {
      score += 15;
    }

    // Body matching
    if (coffee.characteristics.body === profile.body) {
      score += 15;
    }

    // Budget matching
    if (coffee.budget.includes(profile.budget)) {
      score += 10;
    }

    // Apply sales metrics boost for low-selling items
    score *= coffee.salesMetrics.promotionBoost;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = coffee;
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

  // Add sales metrics reason if applicable
  if (bestMatch.salesMetrics.promotionBoost > 1.2) {
    reasons.push('پیشنهاد ویژه این ماه');
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
    salesMetrics: bestMatch.salesMetrics
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
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-coffee-caramel';
    return 'bg-blue-500';
  };

  const getSalesStatus = (monthlyUnits: number) => {
    if (monthlyUnits < 10) return { label: 'کم‌فروش', color: 'bg-red-100 text-red-800' };
    if (monthlyUnits < 20) return { label: 'متوسط', color: 'bg-coffee-mocha bg-opacity-20 text-coffee-bean' };
    return { label: 'پرفروش', color: 'bg-green-100 text-green-800' };
  };

  const getInventoryStatus = (inventory: number) => {
    if (inventory > 30) return { label: 'موجودی بالا', color: 'bg-orange-100 text-orange-800' };
    if (inventory > 15) return { label: 'موجودی متوسط', color: 'bg-blue-100 text-blue-800' };
    return { label: 'موجودی کم', color: 'bg-purple-100 text-purple-800' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-800 mb-2">پیشنهاد ویژه شما</h1>
          <p className="text-slate-600">بر اساس پروفایل شما، بهترین انتخاب را پیدا کردیم</p>
        </div>

        {/* Main Recommendation Card */}
        <Card className="shadow-2xl border-0 overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <Coffee className="w-12 h-12 text-blue-100" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">{recommendation.type}</CardTitle>
            <div className="flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-300 ml-2" />
              <span className="text-xl">انتخاب ویژه برای شما</span>
            </div>
            
            {/* Sales Metrics Badges */}
            {recommendation.salesMetrics && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {recommendation.salesMetrics.promotionBoost > 1.2 && (
                  <Badge className="bg-red-500 text-white">
                    <TrendingDown className="w-4 h-4 ml-1" />
                    پیشنهاد ویژه
                  </Badge>
                )}
                <Badge className={getSalesStatus(recommendation.salesMetrics.monthlyUnits).color}>
                  فروش: {recommendation.salesMetrics.monthlyUnits} واحد/ماه
                </Badge>
                <Badge className={getInventoryStatus(recommendation.salesMetrics.inventory).color}>
                  <Package className="w-4 h-4 ml-1" />
                  موجودی: {recommendation.salesMetrics.inventory} کیلو
                </Badge>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* مشخصات کلی */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">مشخصات کلی</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold">سطح رُست:</span>
                      <Badge variant="secondary" className="bg-coffee-caramel bg-opacity-20 text-coffee-bean">
                        {recommendation.roastLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold">روش دم‌آوری:</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {recommendation.brewingMethod}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold">درجه آسیاب:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {recommendation.grindSize}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* خصوصیات حسی */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">خصوصیات حسی</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold">اسیدیته:</span>
                      <Badge variant="outline" className="border-purple-200 text-purple-800">
                        {getAcidityLabel(recommendation.characteristics.acidity)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-semibold">بادی:</span>
                      <Badge variant="outline" className="border-purple-200 text-purple-800">
                        {getBodyLabel(recommendation.characteristics.body)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* پروفایل طعمی و متریک‌ها */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">پروفایل طعمی</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.flavorProfile.map((flavor, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 text-sm"
                      >
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* میزان تطابق */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">میزان تطابق</h3>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">امتیاز تطابق:</span>
                      <span className="text-2xl font-bold text-slate-800">{recommendation.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getScoreColor(recommendation.score)} transition-all duration-1000`}
                        style={{ width: `${Math.min(recommendation.score, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* متریک‌های فروش */}
                {recommendation.salesMetrics && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">اطلاعات فروش</h3>
                    <div className="bg-slate-100 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">فروش ماهانه:</span>
                        <Badge className={getSalesStatus(recommendation.salesMetrics.monthlyUnits).color}>
                          {recommendation.salesMetrics.monthlyUnits} واحد
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">موجودی انبار:</span>
                        <Badge className={getInventoryStatus(recommendation.salesMetrics.inventory).color}>
                          {recommendation.salesMetrics.inventory} کیلو
                        </Badge>
                      </div>
                      {recommendation.salesMetrics.promotionBoost > 1.2 && (
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">تخفیف ویژه:</span>
                          <Badge className="bg-red-100 text-red-800">
                            {Math.round((recommendation.salesMetrics.promotionBoost - 1) * 100)}% اولویت
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* دلیل انتخاب */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-100 to-blue-50 rounded-lg border-r-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">چرا این انتخاب؟</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
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
