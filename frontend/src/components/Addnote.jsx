import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote() {
    const context=useContext(noteContext);
    const {addNote,getNotes}=context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"});

    const handleClick=(e)=>{
       
        e.preventDefault();
            
            addNote(note.title,note.description,note.tag);
            setNote({title:"",description:"",tag:"default"});
            
            
    }
    const onchange=(e)=>{
        
        setNote({...note,[e.target.name]:e.target.value});
        
    }
    return (
        <>
        
            <div className="h-fit md:w-fit md:ml-16 ml-8 mt-2 flex flex-col w-10/12 mb-4">
                <h1 className='text-3xl mt-2'>Add a Note</h1>
                <p className="text-md mt-4">Title</p>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-1 md:w-[30rem]" onChange={onchange} name="title" value={note.title}/>
                <p className="text-md mt-4">Description</p>
                <input type='text' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-1 md:w-[30rem] h-fit" name="description" onChange={onchange} value={note.description}/>
                <p className="text-md mt-4" >Tag</p>
                <input type='text' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-1 md:w-[30rem] h-fit" name="tag" onChange={onchange} value={note.tag}/>
                <button className="py-1 px-3 bg-blue-800 w-24 text-slate-50 mt-4 rounded-md" onClick={handleClick}>Add Note</button>
            </div>
            
           
        </>
    )
}
