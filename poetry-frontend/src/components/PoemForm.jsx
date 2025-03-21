import React, { useState } from "react";
import PoemCard from "./PoemCard"; // Ensure this import path is correct based on your file structure
import axiosInstance from "../axiosInstance";

const PoemForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    comments: "", // Added comments field
  });

  const [hashtags, setHashtags] = useState([]);
  const [currentHashtag, setCurrentHashtag] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "content") {
      setCharCount(value.length);
    }
  };

  const handleHashtagChange = (e) => {
    setCurrentHashtag(e.target.value);
  };

  const addHashtag = () => {
    if (
      currentHashtag.trim() !== "" &&
      !hashtags.includes(currentHashtag.trim())
    ) {
      setHashtags([...hashtags, currentHashtag.trim()]);
      setCurrentHashtag("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHashtag();
    }
  };

  const removeHashtag = (tagToRemove) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
      hashtags,
      comments: formData.comments,
    };
  
    try {
      const response = await axiosInstance.post("/poems", payload);
      if (response.status === 200 || response.status === 201) {
        alert("Poem submitted successfully! ID: " + response.data.id);
        handleReset();
      }
    } catch (err) {
      console.error("Error submitting poem:", err);
      alert("Error while submitting poem.");
    }
  };
    
  const handleReset = () => {
    setFormData({
      title: "",
      content: "",
      author: "",
      comments: "", // Reset comments too
    });
    setHashtags([]);
    setCurrentHashtag("");
    setCharCount(0);
    setShowPreview(false);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  // Prepare poem data for PoemCard
  const poemPreviewData = {
    ...formData,
    hashtags,
    createdAt: new Date(),
    likes: 0,
    isPreview: false // We want to show the full view in preview mode
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {showPreview ? (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Poem Preview</h2>
            <button
              onClick={closePreview}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Edit
            </button>
          </div>
          
          <PoemCard poem={poemPreviewData} />
          
          <div className="flex space-x-4 mt-6">
            <button
              onClick={closePreview}
              className="w-1/3 bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-xl hover:bg-gray-300 transition duration-300 shadow-md"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="w-2/3 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Submit Poem
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-2xl shadow-md p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create New Poem
          </h2>

          {/* Poem Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-lg font-semibold text-gray-700 block"
            >
              Poem Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Poem Content */}
          <div className="space-y-2">
            <label
              htmlFor="content"
              className="text-lg font-semibold text-gray-700 block"
            >
              Poem Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
            <div className="text-sm text-gray-500 text-right">
              Characters: {charCount}
            </div>
          </div>

          {/* Author Name */}
          <div className="space-y-2">
            <label
              htmlFor="author"
              className="text-lg font-semibold text-gray-700 block"
            >
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>

          {/* Comments Section - NEW */}
          <div className="space-y-2">
            <label
              htmlFor="comments"
              className="text-lg font-semibold text-gray-700 block"
            >
              Initial Comments <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              placeholder="Add some initial thoughts about this poem to encourage discussion..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <p className="text-sm text-gray-500">
              These comments will be displayed when users view your poem, sparking interaction.
            </p>
          </div>

          {/* Hashtags */}
          <div className="space-y-2 border-t border-gray-300 pt-6">
            <label
              htmlFor="hashtag"
              className="text-lg font-semibold text-gray-700 block"
            >
              Hashtags
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="hashtag"
                value={currentHashtag}
                onChange={handleHashtagChange}
                onKeyDown={handleKeyDown}
                className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder="Add a hashtag"
              />
              <button
                type="button"
                onClick={addHashtag}
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
              >
                Add
              </button>
            </div>

            {/* Hashtag Display */}
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 max-h-24 overflow-y-auto p-2">
                {hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeHashtag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                      aria-label={`Remove hashtag ${tag}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex space-x-4 border-t border-gray-300 pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="w-1/3 bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-xl hover:bg-gray-300 transition duration-300 shadow-md"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handlePreview}
                className="w-2/3 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md"
              >
                Preview
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Submit Poem
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PoemForm;