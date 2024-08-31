import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/Notes/notecontext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getnotes, editnotes } = context;

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [viewNote, setViewNote] = useState(null); // State to manage the view note modal

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getnotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);

  const handleUpdateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const handleClick = () => {
    editnotes(note.id, note.etitle, note.edescription, note.etag);
    window.location.reload(true);
  };

  const handleViewNote = (currentNote) => {
    setViewNote(currentNote);
  };

  return (
    <>
      <div className="row my-3">
        <AddNote />
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#editNoteModal"
        >
          Launch Edit Modal
        </button>

      
        <div
          className="modal fade"
          id="editNoteModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="editNoteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editNoteModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

     
        <div
          className="modal fade"
          id="viewNoteModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="viewNoteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="viewNoteModalLabel">
                  View Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {viewNote ? (
                  <div>
                    <h1>{viewNote.title}</h1>
                    <p>{viewNote.description}</p>
                    <p><strong>Tag:</strong> {viewNote.tag}</p>
                  </div>
                ) : (
                  <p>No note selected</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mt-6 mb-6 border-b-2 border-gray-300 inline-block">
  Your Notes
</h2>



        {notes.map((note) => (
          <NoteItem
            key={note._id}
            updatenote={handleUpdateNote}
            viewNote={handleViewNote}
            note={note}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
