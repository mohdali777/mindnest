import { BookOpen, Cloud, Gamepad2, Lightbulb, MessageCircle, Moon, Smile, Sparkles, Sun, TrendingUp } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom';

function Home() {

  const {user_name,mood} = useSelector((state:RootState)=>state.Auth)  
  const navigate = useNavigate()
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const features = [
    {
      id: 'chatbot',
      title: 'Chat with Mood Bot',
      description: 'Talk to our AI companion about your feelings',
      icon: MessageCircle,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      navigate:"/chatbot"
    },
    {
      id: 'journal',
      title: 'Mood Journal',
      description: 'Track and reflect on your daily emotions',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      navigate:"/journal"
    },
    {
      id: 'tips',
      title: 'Enhancement Tips',
      description: 'Get personalized tips to boost your mood',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      navigate:"/tips"
    },
    {
      id: 'games',
      title: 'Mini Games',
      description: 'Play relaxing games to lift your spirits',
      icon: Gamepad2,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      navigate:"/games"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Greeting Card */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl shadow-2xl p-8 mb-10 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {getGreeting()}, {user_name}! 👋
              </h1>
              <p className="text-xl opacity-90">
                Ready to make today amazing? Let's get started!
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sun className="w-9 h-9 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Cloud className="w-9 h-9 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Moon className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Current Mood</p>
                <p className="text-2xl font-bold text-gray-800">{mood || 'Happy'}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Smile className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Mood Streak</p>
                <p className="text-2xl font-bold text-gray-800">5 Days</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Activities</p>
                <p className="text-2xl font-bold text-gray-800">12 Total</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                onClick={()=>navigate(feature.navigate)}
                key={feature.id}
                className={`${feature.bgColor} border-2 ${feature.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Feature Message */}
  
      </div>
  )
}

export default Home
