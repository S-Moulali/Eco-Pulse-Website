import React from "react";
import { useNavigate } from "react-router-dom";

const tipsData = [
  {
    title: "Reduce Single-Use Plastics",
    description:
      "Replace disposable plastics with reusable items like water bottles, grocery bags, and food containers.",
    impact: "High",
  },
  {
    title: "Switch to LED Lighting",
    description:
      "LED bulbs consume less energy and last significantly longer than incandescent ones.",
    impact: "Medium",
  },
  {
    title: "Unplug Devices When Not in Use",
    description:
      "Electronics still draw power even when turned off. Unplug to save energy.",
    impact: "Medium",
  },
  {
    title: "Compost Food Scraps",
    description:
      "Composting reduces landfill waste and enriches your garden soil.",
    impact: "Medium",
  },
  {
    title: "Support Local and Organic Foods",
    description:
      "Reduce emissions from transport and support sustainable farming practices.",
    impact: "High",
  },
  {
    title: "Use Public Transport",
    description:
      "Reduce your carbon footprint by commuting via bus, train, or carpool.",
    impact: "High",
  },
  {
    title: "Conserve Water",
    description:
      "Turn off taps when not in use and fix leaks to conserve precious water resources.",
    impact: "Medium",
  },
  {
    title: "Plant a Tree",
    description:
      "Trees absorb carbon dioxide and provide habitat for wildlife.",
    impact: "High",
  },
];

export default function TipsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
        Eco-friendly Tips & Actions
      </h1>

      <div className="space-y-6 max-w-3xl mx-auto">
        {tipsData.map((tip, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-lg border-l-4 border-green-400"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {tip.title}
            </h2>
            <p className="text-gray-700 mb-2">{tip.description}</p>
            <span className="text-sm font-medium text-green-600">
              Impact: <span className="italic">{tip.impact}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}