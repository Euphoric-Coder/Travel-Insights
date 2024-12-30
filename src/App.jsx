import React from 'react'
import { Button } from './components/ui/button'
import Hero from './components/Hero'
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-red-50">
      <Hero />
      <Footer />
    </div>
  );
}

export default App