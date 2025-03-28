"use client"
import React, { useState, useEffect } from 'react';
import { 
  Pencil, 
  Shapes, 
  Share2, 
  Users, 
  Moon, 
  Sun, 
  Github, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Palette,
  Layers,
  Download,
  Lock,
  Zap,
  Code2
} from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed w-full ${
        isScrolled 
          ? (isDark ? 'bg-gray-900/80' : 'bg-white/80') 
          : 'bg-transparent'
        } backdrop-blur-lg z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center group">
              <Shapes className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'} transform transition-transform group-hover:rotate-180 duration-700`} />
              <span className={`ml-2 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sketchy</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Features</a>
              <a href="#templates" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Templates</a>
              <a href="#pricing" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                } transition-all duration-300 hover:scale-105`}
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10' : 'bg-gradient-to-br from-cyan-100 via-transparent to-purple-100'} opacity-40`}></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                The future of collaborative drawing is here
              </span>
            </div>
            <h1 className={`text-4xl sm:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Draw, Collaborate,
              <span className={`block mt-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Create Together</span>
            </h1>
            <p className={`mt-6 text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Create beautiful diagrams, wireframes, and illustrations with our intuitive drawing tool.
              Perfect for teams, designers, and anyone who wants to bring their ideas to life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
              <button className={`group px-8 py-3 rounded-lg text-white font-medium flex items-center gap-2 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300' 
                  : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400'
              } transition-all duration-300 hover:scale-105`}>
                 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } transition-all duration-300 hover:scale-105`}>
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Preview Image */}
          <div className="mt-20 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <div className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <img 
                src="https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=2000&q=80" 
                alt="Sketchy Interface Preview"
                className="w-full h-[500px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Everything you need for seamless collaboration
            </h2>
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Powerful features that make drawing and collaboration effortless
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Pencil,
                title: "Intuitive Drawing Tools",
                description: "Freehand drawing, shapes, and text with customizable styles. Create professional diagrams with ease."
              },
              {
                icon: Users,
                title: "Real-time Collaboration",
                description: "Work together with your team in real-time. See changes instantly as they happen."
              },
              {
                icon: Palette,
                title: "Rich Styling Options",
                description: "Customize colors, fonts, and styles. Make your diagrams look exactly how you want."
              },
              {
                icon: Layers,
                title: "Infinite Canvas",
                description: "Never run out of space. Pan, zoom, and organize your ideas freely."
              },
              {
                icon: Download,
                title: "Export & Share",
                description: "Export to PNG, SVG, or share a link. Perfect for presentations and documentation."
              },
              {
                icon: Lock,
                title: "Private & Secure",
                description: "Your drawings are encrypted and secure. Control who can view and edit."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} hover:transform hover:scale-105 transition-all duration-300`}
              >
                <feature.icon className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Powerful Integrations
            </h2>
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect with your favorite tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Code2,
                title: "Developer API",
                description: "Integrate Sketchy into your applications with our comprehensive API."
              },
              {
                icon: Zap,
                title: "Quick Export",
                description: "Export directly to popular platforms and formats with one click."
              }
            ].map((integration, index) => (
              <div 
                key={index}
                className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <integration.icon className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {integration.title}
                </h3>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "5M+", label: "Drawings Created" },
              { number: "100+", label: "Countries" },
              { number: "4.9/5", label: "User Rating" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className={`text-4xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  {stat.number}
                </div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;