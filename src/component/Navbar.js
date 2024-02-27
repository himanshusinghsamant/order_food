import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const Navigate = useNavigate();

  const [logout, setLogout] = useState();
  const ItemsData = useSelector((state) => state.counter.selectedData);

  function handleLogOut() {
    localStorage.removeItem("authToken");
    Navigate("/signin");
  }

  return (
    <div>
      <div className="flex fixed w-[100%] top-0 z-[100] items-center  bg-lime-900 h-[70px] text-white p-10">
      <span className='text-2xl font-bold tracking-wider border-b-4  border-white'>
        Order<strong className='text-orange-300 font-extrabold'>Food</strong>
        </span>
        <div className="flex w-[100%]">
          {localStorage.getItem("authToken") ? (
            <>
              <span className="flex items-center ml-9">
                <h3 className="font-semibold m-5 cursor-pointer hover:text-blue-400">
                  <NavLink to={"/"}>Home</NavLink>
                </h3>
                <h3 className="font-semibold m-5 cursor-pointer hover:text-blue-400">
                <NavLink to={"/myorders"}>MyOrders</NavLink>
                </h3>
              </span>
             <span className="flex ml-[55%]">
             <h3 className="font-semibold m-5 cursor-pointer hover:text-blue-400  border-2 border-white rounded-md px-2 py-[2px] relative">
             <NavLink to={"/mycart"}>MyCart {ItemsData.length !== 0 ? <h1 className="bg-red-600 absolute top-[-20px] left-[50px] flex justify-center items-center text-white rounded-full p-1 ml-1 w-7 h-7">{ItemsData.length}</h1> : ''}</NavLink>
              </h3>
              <h3
                onClick={handleLogOut}
                className="font-semibold m-5 cursor-pointer hover:text-red-400 border-2 border-white rounded-md px-2 py-[2px]"
              >
                LogOut 
              </h3>
             </span>
            </>
          ) : (
            <>
              <h3 className="font-semibold m-5 cursor-pointer hover:text-blue-400">
                <NavLink to={"/signup"}>SignUp</NavLink>
              </h3>
              <h3 className="font-semibold m-5 cursor-pointer hover:text-blue-400">
                <NavLink to={"/signin"}>SignIn</NavLink>
              </h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
