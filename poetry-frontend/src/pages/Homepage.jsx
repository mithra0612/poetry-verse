// src/App.jsx or src/pages/LandingPage.jsx
import { useState } from 'react';
import Hero from '../components/Hero';
import FeaturedPoems from '../components/FeaturedPoems';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const openModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section at the top */}
      <Hero 
        onLoginClick={() => openModal('login')} 
        onSignupClick={() => openModal('signup')} 
      />
      
      {/* Main Content */}
      <main>
        {/* Featured Poems Section */}
        <FeaturedPoems />
        
        {/* Categories Section */}
        <Categories />
      </main>
      
      {/* Footer at the bottom */}
      <Footer 
        onLoginClick={() => openModal('login')}
        onSignupClick={() => openModal('signup')} 
      />
      
      {/* Auth Modal (hidden until triggered) */}
      {isModalOpen && (
        <AuthModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialMode={authMode}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </div>
  );
}

export default Homepage;