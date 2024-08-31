import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/notecontext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!note.title || !note.description || !note.tag) {
      alert("Please fill out all fields.");
      return;
    }
    addnote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    }); // Clear form fields after adding note
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a Note</h2>
      <form className="space-y-4">
        <div className="mb-3">
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">
            Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="title"
            name="title"
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">
            Description
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="description"
            name="description"
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="block text-gray-700 text-sm font-medium mb-1">
            Tag
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="tag"
            name="tag"
            value={note.tag}
          />
        </div>
        <button
          onClick={handleClick}
          type="submit"
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
