import React, { useState,useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import {Link,useNavigate} from "react-router-dom";
import noteContext from '../context/notes/noteContext';
export default function Navbar() {
  const navigate=useNavigate();
  const context = useContext(noteContext);
  const [isMobile, setIsmobile] = useState(false);
  const s1 =
    "w-screen h-12 flex items-center justify-center md:w-fit md:h-fit md:p-2 cursor-pointer md:mx-8";
  return (
    <>
      <nav className="h-16 bg-slate-100 w-screen flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center ml-4">
          <img
            src="https://logodix.com/logo/892175.jpg"
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="ml-4 text-lg min-w-fit">Note Cloud</p>
        </div>
        <ul
          className={`items-center justify-between flex-col bg-slate-50 absolute right-0 top-[4rem] w-screen h-fit md:flex-row md:static md:w-fit md:h-16 md:bg-transparent md:flex ${!isMobile?"hidden":""}`}>
          <li className={s1}  onClick={() => {
            setIsmobile(false);
          }}>
            <Link to="/">Home</Link></li>
            {!localStorage.getItem('token') && <li className={s1}  onClick={() => {
            setIsmobile(false);
          }}>
            <Link to="/signup">Sign up</Link>
          </li>}
          {localStorage.getItem('token') && <li className={s1}  onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
            setIsmobile(false);
          }}>
            Log out
          </li>}
          {!localStorage.getItem('token') && <li className={s1}  onClick={() => {
            setIsmobile(false);
          }}>
            <Link to="/login">Sign in</Link>
          </li>}
        </ul>
        <button
          className='md:hidden text-xl mr-4 scale-150'
          onClick={() => {
            setIsmobile(!isMobile);
          }}
        >
          {isMobile ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>
      </nav>
      
    </>
  );
}
