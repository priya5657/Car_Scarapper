'use client';

import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">
          About Car Scraper
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          <strong>Car Scraper</strong> is a major project designed to simplify
          the vehicle scrapping and recycling process. Our platform connects
          car owners, scrap dealers, and administrators in one seamless system.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Users can submit scrap requests, track approvals, and ensure proper
          disposal of end-of-life vehicles in an eco-friendly way.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
          This project is built using modern technologies like
          <span className="text-yellow-400"> Next.js, Node.js, Express, MongoDB </span>
          and focuses on transparency, security, and efficiency.
        </p>
      </div>
      <p className="text-center text-gray-500 mt-10">
          © {new Date().getFullYear()} Car Scrapper System
        </p>
    </div>
    
  );
};

export default AboutPage;
