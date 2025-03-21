import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import AddPoem from './pages/AddPoem';
import PoemsFeed from './pages/PoemsFeed';
// import Bookmarks from './pages/Bookmarks';
// import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="mt-4 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-poem" element={<AddPoem />} />
          <Route path="/feed" element={<PoemsFeed />} />
          {/* <Route path="/bookmarks" element={<Bookmarks />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
