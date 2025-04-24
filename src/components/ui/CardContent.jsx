import React from "react";

export default function CardContent({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="text-green-600 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
