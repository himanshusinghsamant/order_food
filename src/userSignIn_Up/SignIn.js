import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

  const Navigate = useNavigate()
  const [value, setValues] = useState({
    email: "",
    password: "",
  });
  // const [data, setData] = useState([])

  async function handleOnSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid details!");
    }
    setValues({
      email: "",
      password: "",
    });
    console.log("connected");
    if(json.success === true){
      localStorage.setItem("userEmail", value.email)
      localStorage.setItem("authToken", json.authToken)
      console.log(localStorage.getItem("authToken"))
      Navigate('/')
    }
  }

  function handleOnChange(e) {
    setValues({ ...value, [e.target.name]: e.target.value });
  }

  return (
    <div>
        <section className="bg-transparent dark:bg-gray-900">
        <form>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
            <h1 className="flex items-center mb-6 text-2xl font-semibold text-white">
              SignIn
            </h1>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login Now
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                 
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      onChange={handleOnChange}
                      value={value.email}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
               
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleOnChange}
                      value={value.password}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>

                  <button
                    onClick={handleOnSubmit}
                    className=" text-white bg-green-800 border rounded p-2 hover:bg-green-600"
                  >
                    Submit
                  </button>
                
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    If you are new User?{" "}
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                      <Link to={"/signup"}>Register here</Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SignIn
