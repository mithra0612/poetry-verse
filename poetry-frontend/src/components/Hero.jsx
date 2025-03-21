// components/Hero.jsx
function Hero() {
    return (
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20" 
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(253, 230, 138, 0.1) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(253, 230, 138, 0.1) 0%, transparent 40%)"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center">
            <span className="block text-gray-300">Words that </span>
            <span className="block mt-2 text-amber-300">transcend time</span>
          </h1>
          
          <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-300">
            Discover poetry that speaks to your soul. Join our community of poets and poetry lovers.
          </p>
          
          <div className="mt-10 max-w-md mx-auto flex justify-center gap-x-6">
            <a 
              href="#featured" 
              className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium rounded-md bg-gray-800 text-amber-300 hover:bg-amber-300 hover:text-gray-900 transition-all duration-300 ease-out"
            >
              Explore Poems
              <svg className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="#categories" 
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium rounded-md text-gray-300 hover:text-amber-200 transition-colors duration-300"
            >
              Categories
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  export default Hero;