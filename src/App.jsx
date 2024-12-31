import React from 'react'
import { Button } from './components/ui/button'
import Hero from './components/Hero'
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-white to-white">
      <Hero />
      <Footer />
    </div>
  );
}

export default App