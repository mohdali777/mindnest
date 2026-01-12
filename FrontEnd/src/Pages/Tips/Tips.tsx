import React, { useEffect, useState } from 'react';
import { Brain, Heart, Sun, Wind, Coffee, Music, Book, Sparkles, ChevronRight, Star, Zap, CloudRain } from 'lucide-react';
import Welnesstips from '../../Utils/constants';

const MentalWellnessTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTip, setExpandedTip] = useState(null);

  const categories = [
    { id: 'all', label: 'All Tips', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { id: 'physical', label: 'Physical', icon: Heart, color: 'from-red-500 to-orange-500' },
    { id: 'relaxation', label: 'Relaxation', icon: Wind, color: 'from-green-500 to-teal-500' },
    { id: 'lifestyle', label: 'Lifestyle', icon: Sun, color: 'from-yellow-500 to-amber-500' },
  ];

    const tips = Welnesstips

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'text-purple-600';
      case 'Medium': return 'text-blue-600';
      case 'Low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  
useEffect(() => {
  window.scrollTo({
    top: document.body.scrollTop,
    behavior: "smooth",
  });
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-xl">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-800 mb-3">
            Mental Wellness <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tips</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover evidence-based techniques to enhance your mental health and emotional well-being
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            const isExpanded = expandedTip === tip.id;
            
            return (
              <div
                key={tip.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-200"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(tip.difficulty)}`}>
                        {tip.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-purple-600 font-semibold mb-3 flex items-center gap-1">
                    <Star className={`w-4 h-4 ${getImpactColor(tip.impact)}`} />
                    {tip.subtitle} • {tip.impact} Impact
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                {/* Expandable Action Steps */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 group/btn"
                  >
                    <span className="font-semibold text-purple-700">
                      {isExpanded ? 'Hide' : 'Show'} Action Steps
                    </span>
                    <ChevronRight className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {tip.actionSteps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 text-sm font-medium pt-0.5">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center p-6 bg-white rounded-3xl shadow-lg border-2 border-purple-100">
          <p className="text-gray-700 font-medium">
            💡 <span className="font-bold">Pro Tip:</span> Start with one or two tips and build consistency before adding more. Small, sustainable changes create lasting results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessTips;