import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserDataContext} from "../context/UserContext";
import { useContext } from 'react';
import api from '../api/api';

const UserSignup = () => {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const {user,setUser} = useContext(UserDataContext);

  async function submitHandler(e) {
    e.preventDefault();
    try {
    const data={ fullname:{firstname:firstName,lastname:lastName},email:email, password:password };
    const response=await api.post(`/users/register`,data); 
    if(response.status===201){
      setUser(response.data.user)
      navigate('/login'); 
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    } catch (error) {
      console.error(error.response.data)
    }
    
  }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-1 mb-6">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
              required
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mb-6 w-full text-lg placeholder:text-base"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[9px] leading-tight">
          By proceeding you agree to Uber's <span className="text-cyan-600">Terms of Use</span> and acknowledge you
          have read the <span className="text-cyan-600">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
