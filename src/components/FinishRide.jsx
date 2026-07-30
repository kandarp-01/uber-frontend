import { BanknoteArrowUp, ChevronDown, MapPin, MapPinHouse } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const FinishRide = (props) => {
  const navigate=useNavigate();
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanelOpen(false)
        }}
        className="absolute top-0 left-[45%] pt-1 text-xl"
      >
        <ChevronDown size={40} />
      </h5>
      <h2 className="text-2xl font-semibold my-3">
        Finish this Ride!
      </h2>
      <div className="flex items-center bg-yellow-400 rounded-lg justify-between p-3 mt-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDw3oa8g-lmRGmLEzr-7PkAG5dqTxLAb8g1vC87T1krg&s=10"
            alt=""
          />
          <h2 className="text-lg font-medium">Utkarsh Apoorv</h2>
        </div>
        <h5 className="text-lg font-medium">2.2 KM</h5>
      </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex items-center justify-center flex-col">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eee]">
                <MapPin size={20} />
              </div>
              <h2 className="text-xs text-gray-600">Pickup</h2>
            </div>

            <div className="border-gray-600 ml-1">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex items-center justify-center flex-col">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
                <MapPinHouse size={16} strokeWidth={3} />
              </div>
              <h2 className="text-xs text-gray-600">Drop Off</h2>
            </div>

            <div className="ml-1">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text- text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <div className="flex items-center justify-center flex-col">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
                <BanknoteArrowUp size={16} strokeWidth={3} />
              </div>
              <h2 className="text-xs text-gray-600">Amount</h2>
            </div>

            <div className="ml-1">
              <h3 className="text-lg font-medium">₹198.20</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <button
              onClick={() => {
                navigate('/captain-home')
              }}
              className="w-1/2 mt-5 bg-green-600 text-center text-white py-2 rounded-xl text-2xl"
            >
              Finish Ride 
            </button>
            <p className='text-xs mt-10 '>click on finish ride button if you have recieved the payment</p>
      </div>
    </div>
  )
}

export default FinishRide