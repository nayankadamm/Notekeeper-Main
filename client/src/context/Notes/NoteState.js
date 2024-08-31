import { useState } from "react";


import noteContext from "./notecontext";

const Notestate = (props) => {
 localStorage.getItem('token')
const host ="http://localhost:5000"
const [notes, setnotes] = useState([]);

  //getnotes from the database
  const getnotes = async () => {
    const response = await fetch(host+"/api/notes/fetchallnotes", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    setnotes(json);
  };

  //add notes for the user as well as update in the data base too
  const addnote = async(title, description, tag) => {
  const response = await fetch(host+"/api/notes/addnote",{
        method:"Post",
        headers :{
            "Content-Type":"application/json",
           "auth-token":localStorage.getItem('token'),
        },
        body:JSON.stringify({title,description,tag})

    })
   const json =response.json()
   console.log(json)
  
    const note ={
      title: title,
      description: description,
      tag: tag,
    };
    setnotes(notes.concat(note));
  };

  //delete the notes for the user AS well as delete the notes from the database aLso
  const deleteNote = async(id) => {
    const response = await fetch(host+"/api/notes/deletenote/"+id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
      });
      const json = await response.json();
     
    setnotes(
      notes.filter((note)=> {
        return note._id !== id;
      })
    );
  };
  const editnotes = async(id,title,description,tag) => {
    const response = await fetch(host+"/api/notes/updatenote/"+id,{
      method :"put",
      headers :{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token'),
      
      },
      body:JSON.stringify({title,description,tag})
    })
    const json = await response.json()
    
    

    //logic to edit the notes
    for(let i =0;i<notes.length;i++){
      const element = notes[i]
      if(element===id)
      {
        title =element.title
      description=element.description
        tag=element.tag
        break
      }
    }



  };






  return (
    <noteContext.Provider
      value={{ notes, addnote, deleteNote, editnotes, getnotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default Notestate;
