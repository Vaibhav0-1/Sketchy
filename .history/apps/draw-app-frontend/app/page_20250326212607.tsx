import Image from "next/image";
import { Pencil, Share2, Users, Sparkles, ChevronRight, Github } from 'lucide-react';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
    {/* Header */}
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Pencil className="w-6 h-6 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">Sketchy</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
          <a href="https://github.com" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Open Sketchy
          </button>
        </div>
      </nav>
    </header>

    {/* Hero Section */}
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Collaborative Whiteboarding,
          <br />
          <span className="text-indigo-600">Reimagined</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, collaborate, and share beautiful diagrams and sketches in real-time. 
          No sign-up required.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
            <span>Start Drawing</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            View Examples
          </button>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
            <p className="text-gray-600">Work together with your team in real-time, no matter where they are.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Sign-up Required</h3>
            <p className="text-gray-600">Start drawing instantly. No account creation needed.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Beautiful Results</h3>
            <p className="text-gray-600">Create professional-looking diagrams with our intuitive tools.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Demo Section */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
            alt="Sketchy Demo" 
            className="w-full h-[600px] object-cover"
          />
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pencil className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-900 font-semibold">Sketchy</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sketchy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}
