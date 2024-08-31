const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../db/Note");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "NAYANANILKADAM";
const { body, validationResult } = require("express-validator");

//route 1 :to fetch all the notes using authentication key using get
router.post("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route2:to add the notes to the existing user using post
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter the valid title").isLength({ min: 3 }),
    body("description", "description atleast must be 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //if there are errors it will give bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savnote = await note.save();
      res.json(savnote);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }
  }
);

//route3: route to update the notes for the specific user
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body; //destructring array to accept new input from user to update it

    const newNote = {}; //create new json data to save the notes which user will put

    //adding new information to notes to update it
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //finding the id of sepcific note which we will put in link
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //here we will check if that it is same user which was logged in
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route4: to delete the note for the user
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body; //destructring array to accept new input from user to update it

    //finding the id of sepcific note which we will put in link
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //here we will check if that it is same user which was logged in
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ succces: "note has beeen deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
