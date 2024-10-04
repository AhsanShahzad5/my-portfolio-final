import React, { useState } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, techStack }) => {
  const [showToast, setShowToast] = useState(false);

  // Function to handle preview button click
  const handlePreviewClick = () => {
    if (!previewUrl || previewUrl === "/") {
      // Show the toast and hide it after 3 seconds
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      // Open the preview URL in a new tab if available
      window.open(previewUrl, "_blank");
    }
  };

  return (
    <div className="relative">
      {/* Toast Message */}
      {showToast && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-md shadow-md z-10">
          Not live yet!
        </div>
      )}

      {/* Image background with overlay */}
      <div
        className="h-80 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <a
            target="_blank"
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
          </a>
          <button
            onClick={handlePreviewClick}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
          </button>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4 
      /*md:h-80 lg:h-40/*
      ">
      <div className="md:h-[11rem] lg:h-[9rem]">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE] mb-3">{description}</p>
      </div>
        <div
          className="flex items-center gap-2 transition duration-300   flex-wrap hover:border-2 hover:border-primary-500 hover:rounded-lg text-center" >
          {techStack}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
