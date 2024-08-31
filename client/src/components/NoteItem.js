import React, { useContext } from "react";
import noteContext from "../context/Notes/notecontext";

const NoteItem = (props) => {
  const { note } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const onDelete = () => {
    deleteNote(note._id);
  };

  const onEdit = () => {
    props.updatenote(note);
  };

  const onView = () => {
    props.viewNote(note);
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-lg transition-shadow h-48">
        <h5 className="text-xl font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{note.title}</h5>
        <p className="text-gray-700 mb-3 overflow-hidden text-ellipsis whitespace-nowrap h-16">{note.description}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors flex items-center space-x-1"
            onClick={onView}
            data-bs-toggle="modal"
            data-bs-target="#viewNoteModal"
          >
            <i className="fas fa-eye"></i> <span>View</span>
          </button>
          <div className="flex space-x-3">
            <button
              className="text-yellow-500 hover:text-yellow-700 transition-colors flex items-center space-x-1"
              onClick={onEdit}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="fas fa-edit"></i> <span>Edit</span>
            </button>
            <button
              className="text-red-500 hover:text-red-700 transition-colors flex items-center space-x-1"
              onClick={onDelete}
            >
              <i className="fas fa-trash-alt"></i> <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
