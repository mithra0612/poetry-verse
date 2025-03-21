import React, { useState, useEffect } from "react";
import PoemForm from "../components/PoemForm";
import PoemCard from "../components/PoemCard";

const AddPoem = () => {
  const [poemData, setPoemData] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    hashtags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  // Reset alert after 5 seconds
  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleFormChange = (updatedData) => {
    setPoemData(updatedData);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted with data:", formData);

      // Show success message
      setSubmitStatus({
        success: true,
        message: "Your poem has been published successfully!",
      });
      setShowAlert(true);

      // Reset form after successful submission
      setPoemData({
        title: "",
        content: "",
        author: "",
        tags: "",
        hashtags: [],
      });
    } catch (error) {
      console.error("Error adding poem: ", error);
      setSubmitStatus({
        success: false,
        message: `Failed to publish poem: ${error.message}`,
      });
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with accent color */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Share Your Poetry
          </h1>
          <div className="h-1 w-24 bg-amber-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Accent Banner */}
          <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-200"></div>
          
          {/* Form Section */}
          <div className="p-8">
            <PoemForm
              initialData={poemData}
              onFormChange={handleFormChange}
              onFormSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />

            {/* Success/Error Alert */}
            {showAlert && (
              <div
                className={`${
                  submitStatus.success
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                } rounded-xl p-4 mt-6 shadow-sm transition-all duration-300 ease-in-out`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {submitStatus.success ? (
                      <svg
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-900 px-8 py-4">
            <p className="text-amber-300 text-center text-sm font-medium">
              Share your voice with the world — every poem matters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPoem;