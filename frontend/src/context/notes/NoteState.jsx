import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const getNotes =async ()=>{
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const data =await response.json();
        setNotes(data);
    }
    

   
    //Add new note
    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/add`, {
            method: "POST",
            body: JSON.stringify({title, description, tag}),
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
            
        getNotes(); 
        }
    
    //Update a note
    const editNote = async (id, title, description, tag) => {


        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({title, description, tag}),
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                notes[i].title = title;
                notes[i].description = description;
                notes[i].tag = tag;
            }
        }
        getNotes();
    }
    //Delete a note
    const deleteNote =async (id) => {
            const response = await fetch(`${host}/api/notes/delete/${id}`, {
                method: "DELETE",
                
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            getNotes();
        }
   

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;