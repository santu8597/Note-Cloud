import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom';
export default function Notes() {
  const navigate=useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{navigate('/login');}
    },[]);
  return (
    <>
      <h3 className='text-3xl font-bold mt-6 ml-5 md:ml-12'>Your Notes</h3>
      <div className='flex lg:w-[62rem] md:w-[45rem] w-full overflow-x-scroll md:flex-wrap md:overflow-hidden md:ml-8 h-fit no-scrollbar'>
        {notes.length===0 && <p className='ml-6 mt-2'>No notes to display</p>}
        {notes.map((note, key) => {
          return <Noteitem note={note} key={key}/>
        })}
      </div>
    </>
  )
}
