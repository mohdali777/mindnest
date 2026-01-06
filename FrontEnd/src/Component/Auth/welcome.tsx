import { Heart, MessageCircle, Smile, Sparkles } from "lucide-react";

const WelcomeSection: React.FC = () => (
  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
    
    <div className="relative z-10 text-center max-w-lg">
      {/* Logo/Icon with subtle animation */}
      <div className="relative mb-8 inline-block">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 hover:rotate-6">
          <Heart className="w-12 h-12 text-white fill-white/80" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce"></div>
      </div>

      {/* Heading with better spacing */}
      <h2 className="text-6xl font-extrabold mb-4 leading-tight">
        Welcome to<br />
        <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Mood Nest</span>
      </h2>
      <p className="text-lg opacity-95 mb-10 leading-relaxed">Your safe space for emotional wellness. Track your moods, chat with AI support, and discover personalized insights.</p>
      
      {/* Feature cards with better visual hierarchy */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 transform transition-all hover:scale-105 hover:bg-white/25 border border-white/20">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Smile className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold">Track<br />Moods</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 transform transition-all hover:scale-105 hover:bg-white/25 border border-white/20">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold">AI<br />Support</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 transform transition-all hover:scale-105 hover:bg-white/25 border border-white/20">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold">Personal<br />Insights</p>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-6 text-sm opacity-90">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          <span>Private & Secure</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span>24/7 Available</span>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeSection