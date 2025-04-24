import React from "react";
import { useNavigate } from "react-router-dom";
export default function TipsAndChallengesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800">
          Eco-awareness Tips & Challenges
        </h1>
        <p className="text-green-700 mt-2">
          Learn how to make a positive environmental impact with these eco-friendly tips and challenges
        </p>
      </div>

      {/* Featured Tip */}
      <div className="max-w-4xl mx-auto bg-green-100/50 border border-green-200 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-green-900 mb-2 flex items-center">
          🍃 <span className="ml-2">Featured Tip of the Day</span>
        </h2>
        <p className="text-sm text-green-800 mb-4">Start making a difference today</p>
        <h3 className="text-lg font-bold text-green-900">Reduce Single-Use Plastics</h3>
        <p className="text-green-800 mt-1">
          Single-use plastics are among the biggest contributors to ocean pollution. Try using reusable water bottles, shopping bags, and food containers. When shopping, look for products with minimal or compostable packaging.
        </p>
        <div className="mt-4 bg-green-200/60 p-3 rounded text-green-900 text-sm">
          <strong>Did you know?</strong> The average person generates about 4.4 pounds of waste daily, much of which is plastic that takes hundreds of years to decompose.
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="max-w-4xl mx-auto mt-8 flex justify-center space-x-4">
        <button
          onClick={() => navigate("/TipsPage")}
          className="px-6 py-2 border border-green-500 rounded-full text-green-800 hover:bg-green-100 flex items-center space-x-2 font-medium"
        >
          <span role="img" aria-label="tips">🍃</span>
          <span>Tips</span>
        </button>
        <button
          onClick={() => navigate("/challenges")}
          className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 flex items-center space-x-2 font-medium"
        >
          <span role="img" aria-label="challenges">👥</span>
          <span>Challenges</span>
        </button>
      </div>

      {/* Example Tip Card */}
      <div className="max-w-4xl mx-auto mt-8 bg-white border rounded-lg shadow-sm p-6">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs mb-2">Waste</span>
        <h3 className="text-lg font-bold text-gray-900">Start Composting at Home</h3>
        <p className="text-gray-700 mt-2">
          Composting food scraps and yard waste reduces landfill use and creates nutrient-rich soil for your garden.
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Impact: Medium</span>
          <span className="text-green-700 hover:underline cursor-pointer">&rarr;</span>
        </div>
      </div>
    </div>
  );
}
