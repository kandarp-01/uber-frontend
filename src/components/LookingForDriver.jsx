import { BanknoteArrowUp, ChevronDown, MapPin, MapPinHouse } from 'lucide-react';
import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setDriverPanelOpen(false);
          //props.setDriverFoundPanelOpen(true);
        }}
        className="absolute right-6 top-6 text-2xl"
      >
        <ChevronDown />
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Looking for a driver</h2>
      <div className="flex flex-col gap-2 justify-between items-center">
        <img
          src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"
          alt=""
          className="h-40"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <MapPin size={20} />
            </div>
            <div className="border-gray-600 ml-1">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <MapPinHouse size={16} strokeWidth={3} />
            </div>
            <div className="ml-1">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <BanknoteArrowUp size={16} strokeWidth={3} />
            </div>
            <div className="ml-1">
              <h3 className="text-lg font-medium">₹198.20</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LookingForDriver