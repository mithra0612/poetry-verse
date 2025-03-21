// components/FeaturedPoems.jsx
import { useState } from 'react';

function FeaturedPoems() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const poems = [
    {
      id: 1,
      title: "The Road Not Taken",
      excerpt: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both...",
      author: "Robert Frost",
      likes: 243,
      category: "Classic"
    },
    {
      id: 2,
      title: "Hope is the Thing with Feathers",
      excerpt: "Hope is the thing with feathers\nThat perches in the soul...",
      author: "Emily Dickinson",
      likes: 187,
      category: "Classic"
    },
    {
      id: 3,
      title: "Midnight Whispers",
      excerpt: "In the quiet of night\nWhen the world falls silent...",
      author: "Amara Wilson",
      likes: 156,
      category: "Contemporary"
    },
    {
      id: 4,
      title: "Urban Symphony",
      excerpt: "Steel and glass giants reach for the sky\nAs humanity flows like rivers below...",
      author: "Marcus Chen",
      likes: 124,
      category: "Contemporary"
    }
  ];

  return (
    <section id="featured" className="py-16 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-amber-300 mb-4">Featured Poems</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our editors' picks of the most beautiful and thought-provoking poems on Verse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {poems.map((poem, index) => (
            <div 
              key={poem.id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-900/20 border border-gray-800 ${
                activeIndex === index ? 'ring-2 ring-amber-300 ring-opacity-50' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-amber-300">
                    {poem.category}
                  </span>
                  <button className="text-gray-400 hover:text-amber-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-3">{poem.title}</h3>
                <p className="text-gray-400 mb-4 whitespace-pre-line">{poem.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-300">By {poem.author}</span>
                  <span className="text-sm flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {poem.likes}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-900 border-t border-gray-800">
                <a href="#" className="text-amber-300 hover:text-amber-200 transition-colors font-medium flex items-center">
                  Read full poem
                  <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center px-6 py-3 border border-amber-300 text-amber-300 rounded-md hover:bg-amber-300 hover:text-gray-900 transition-all duration-300">
            View All Poems
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPoems;