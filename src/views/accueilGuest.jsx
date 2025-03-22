import React from 'react';
import Image from '../assets/ai-generated-8915797_1280.jpg';
import { Link } from 'react-router-dom';

export default function AccueilGuest() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-900 px-4">
      <div className="relative w-full max-w-[1200px] h-[600px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={Image}
          alt="Fond de ciel"
          className="w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-indigo-900/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg animate-fade-in">
            Bienvenue sur Bla Bla
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl font-light leading-relaxed drop-shadow-md animate-fade-in-delayed">
            Développement Hub
          </p>
          <button className="mt-8 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400">
            <Link to="/login">Se Connecter</Link>
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <svg
          className="w-6 h-6 text-white animate-bounce cursors-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}