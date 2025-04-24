import React from "react";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-10 bg-gradient-to-br from-green-200 via-white to-green-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-16">
        <div className="text-3xl font-black text-green-800 tracking-tight drop-shadow-sm">🌱 EcoPulse</div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-green-700 font-semibold hover:underline transition duration-200"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12 mb-20 animate-fadeIn">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight text-green-900 drop-shadow-lg">
            Report Local <br /> Environmental Issues
          </h1>
          <p className="mb-8 text-gray-700 text-lg font-medium">
            Help your community stay green by identifying and solving environmental problems together.
          </p>
          <button
            className="bg-green-700 text-white px-7 py-3 rounded-full text-lg shadow-xl hover:bg-green-800 transition-transform duration-300 transform hover:scale-105"
          >
            Report an Issue
          </button>
        </div>

        <div className=" flex-1">
          <img 
            src="image.png"
            alt="Eco illustration"
            className="rounded-3xl w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </div>
      </main>

      {/* Info Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
        <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1.5 duration-300">
          <h2 className="text-2xl font-bold mb-3 text-green-800">🌍 Community-Driven</h2>
          <p className="text-gray-700 text-base">
            Work together with your neighbors to tackle environmental challenges and create lasting impact.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1.5 duration-300">
          <h2 className="text-2xl font-bold mb-3 text-green-800">🌿 Eco-Friendly Tips</h2>
          <p className="text-gray-700 text-base">
            Learn how to live sustainably with simple, effective changes that support the environment.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-600">© 2025 EcoPulse. All rights reserved.</footer>
    </div>
  );
}