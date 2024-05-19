import React from 'react'
import Navbar from './components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

function OnboardingPage() {

  const navigate = useNavigate('');

  return (
    <div>
      <Navbar />
      <section className='min-h-screen max-w-screen-xl mx-auto px-4 lg:px-8 pt-24 pb-4 md:py-0 md:pb-0 lg:py-0 lg:pb-0'>
        <div className="min-h-screen place-content-center grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

          <div className="py-4 lg:py-16">
            <h1 className="text-4xl font-extrabold">Brainwave</h1>
            <p className="text-base">A note-taking app.</p>
            <p className="mt-4 text-base text-neutral-600">
              Brainwave helps you capture and organize your thoughts with ease. Its intuitive interface allows for seamless note creation, updates, and management, ensuring your ideas are always at your fingertips.
            </p>
            <button
              onClick={() => navigate('/create-note')}
              className="group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring-0 active:text-black mt-6"
            >
              <span className="absolute inset-0 border border-current rounded-lg"></span>
              <span
                className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg"
              >
                Create note
              </span>
            </button>
          </div>
          <div className='max-w-lg mx-auto'>
            <img src="/img/hero.jpg" alt="hero content 1" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default OnboardingPage
