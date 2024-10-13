import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote, editNote, getNotes } = context;
  const [view, setView] = useState(false);
  const { note } = props;
  const [newNote, setNewNote] = useState(note)
  const onchange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  }
  const handleClick = (e) => {
    editNote(newNote._id, newNote.title, newNote.description, newNote.tag);
    setView(false);
  }
  return (
    <>
      <div className='md:w-64 border border-zinc-400 rounded-md h-fit flex flex-col w-full min-w-[22rem] md:min-w-72 min-h-32 shadow-md mx-4 my-2 md:my-4 pb-3'>
        <p className='ml-4 mt-2 font-bold text-xl -mb-1'>Title:</p>
        <p className='ml-4 text-md mb-1'>{note.title}</p>
        <p className='ml-4 font-bold text-xl'>Description:</p>
        <p className='ml-4 text-md md:w-56 w-11/12 h-fit mb-3'>{note.description}</p>
        <p className='ml-4 font-bold text-xl -mb-1'>Tag:</p>
        <p className='ml-4 text-md mb-1'>{note.tag}</p>
        <div className="flex w-full justify-end">
          <button className='scale-125 mx-3' onClick={() => { deleteNote(note._id); }}><MdDelete /></button>
          <button className='scale-125 mx-3' onClick={() => { setView(true) }}><FaEdit /></button>
        </div>
      </div>
      {view && <>
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="h-fit md:w-fit flex flex-col w-10/12 border border-zinc-300 rounded-md p-4 absolute bg-white shadow-md">
            <div className="flex justify-between">
              <h1 className='text-3xl mt-2'>Update your Note</h1>
              <button className='scale-150' onClick={() => { setView(false) }}><RxCross2 /></button>
            </div>
            <p className="text-md mt-4">Title</p>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-1 md:w-[30rem]" onChange={onchange} name="title" value={newNote.title} />
            <p className="text-md mt-4">Description</p>
            <input type='text' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-1 md:w-[30rem] h-fit" name="description" onChange={onchange} value={newNote.description} />
            <p className="text-md mt-4" >Tag</p>
            <input type='text' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-1 md:w-[30rem] h-fit" name="tag" onChange={onchange} value={newNote.tag} />
            <button className="py-1 px-3 bg-blue-800 w-32 text-slate-50 mt-4 rounded-md" onClick={() => { handleClick(); }}>Update Note</button>
          </div>
        </div>
      </>
      }
    </>
  )
}
