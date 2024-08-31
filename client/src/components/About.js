import React from "react";

function About() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About</h1>
        <p className="text-gray-700 mb-4">
          This project is designed to help you keep track of your notes efficiently. 
          It allows you to add, edit, view, and delete notes with ease. 
          Built using React and styled with Tailwind CSS, it offers a clean and user-friendly interface.
        </p>
        <p className="text-gray-700">
          <strong>Features:</strong>
          <ul className="list-disc list-inside pl-5 mt-2">
            <li>Add new notes</li>
            <li>Edit existing notes</li>
            <li>View details of each note</li>
            <li>Delete notes</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default About;
