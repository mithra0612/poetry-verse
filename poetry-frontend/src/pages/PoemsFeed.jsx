import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PoemCard from '../components/PoemCard';

const PoemsFeed = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get('/api/poems');
        setPoems(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching poems:', err);
        setError('Failed to load poems. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  // For demo purposes if no data is returned from API
  const mockPoems = [
    {
      id: 1,
      title: "Midnight Whispers",
      content: "Shadows dance on moonlit walls,\nWhispers echo through empty halls.\nTime suspends in the quiet night,\nThoughts wander in the soft moonlight.",
      author: "Emily Frost",
      timestamp: "2025-03-18T21:45:00Z",
      hashtags: ["night", "reflection", "silence"],
      likeCount: 24,
      liked: false,
      bookmarked: false,
      commentCount: 3
    },
    {
      id: 2,
      title: "Urban Symphony",
      content: "Concrete canyons reach for skies,\nSirens wail as daylight dies.\nFootsteps echo, hurried pace,\nFingerprints of human race.",
      author: "Alex Rivera",
      timestamp: "2025-03-20T14:30:00Z",
      hashtags: ["city", "urban", "life"],
      likeCount: 17,
      liked: true,
      bookmarked: true,
      commentCount: 5
    }
  ];

  const handleLike = (poemId) => {
    setPoems(poems.map(poem => {
      if (poem.id === poemId) {
        return {
          ...poem,
          liked: !poem.liked,
          likeCount: poem.liked ? poem.likeCount - 1 : poem.likeCount + 1
        };
      }
      return poem;
    }));
  };

  const handleBookmark = (poemId) => {
    setPoems(poems.map(poem => {
      if (poem.id === poemId) {
        return {
          ...poem,
          bookmarked: !poem.bookmarked
        };
      }
      return poem;
    }));
  };

  const handleComment = (poemId) => {
    // This function would handle opening/showing the comment box
    console.log(`Open comment box for poem ${poemId}`);
    // You could implement state to track which poems have their comment sections open
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-amber-300 mb-6">Poetry Feed</h1>
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-gray-800 p-4 rounded-lg text-red-400 mb-4">
            {error}
          </div>
        )}
        
        {!loading && !error && (poems.length > 0 ? poems : mockPoems).map(poem => (
          <div key={poem.id} className="mb-6">
            <PoemCard
              poem={poem}
              onLike={() => handleLike(poem.id)}
              onComment={() => handleComment(poem.id)}
              onBookmark={() => handleBookmark(poem.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoemsFeed;