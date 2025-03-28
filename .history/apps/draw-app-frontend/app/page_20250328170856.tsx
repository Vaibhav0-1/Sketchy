import React, { useState } from 'react';
import { Pencil, Shapes, Share2, Users, Moon, Sun, Github } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed w-full ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'} backdrop-blur-lg border-b z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shapes className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`ml-2 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sketchy</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
                } transition-colors`}
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Collaborative Drawing
              <span className={`block ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Made Simple</span>
            </h1>
            <p className={`mt-6 text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Create, collaborate, and share your ideas in real-time with our intuitive drawing tool.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button className={`px-8 py-3 rounded-lg text-white font-medium ${
                isDark 
                  ? 'bg-cyan-500 hover:bg-cyan-400' 
                  : 'bg-cyan-600 hover:bg-cyan-500'
              } transition-colors`}>
                Start Drawing
              </button>
              <button className={`px-8 py-3 rounded-lg font-medium ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } transition-colors`}>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Preview Image */}
          <div className="mt-20 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
              alt="Sketchy Interface Preview"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Pencil className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Intuitive Drawing Tools
              </h3>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Powerful yet simple tools that make drawing and diagramming a breeze.
              </p>
            </div>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Users className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Real-time Collaboration
              </h3>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Work together with your team in real-time, no matter where they are.
              </p>
            </div>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Share2 className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Easy Sharing
              </h3>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your drawings with a single click and export in multiple formats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;