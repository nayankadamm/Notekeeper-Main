const mongoose = require("mongoose");
const noteschema = new mongoose.Schema({
   user:
   {
         type:mongoose.Schema.Types.ObjectId,
         ref:"users"
   },
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true
 },
 tag:{
    type:String,
    default:"General"
 },
 date:{
    type:Date,
    default: Date.now
 }
});
const Note = mongoose.model("notes", noteschema);
module.exports = Note;
