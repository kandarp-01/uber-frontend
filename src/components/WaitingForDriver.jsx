import { BanknoteArrowUp, ChevronDown, MapPin, MapPinHouse } from 'lucide-react';
import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setDriverFoundPanelOpen(false);
        }}
        className="absolute top-0 left-[50%] pt-1 text-xl"
      >
        <ChevronDown size={40}/>
      </h5>
      <div className='flex justify-between items-center'>
      <h2 className="text-2xl font-semibold my-5">Meet at the pickup point</h2>
      <div className='flex flex-col items-center p-1 text-lg pb-0.5 w-15 h-15 bg-black text-white'>
        <h2 className='-mb-1'>2</h2>
        <span>min</span>
      </div>
      </div >
      <div className='flex items-center justify-between border-b-2 border-gray-400'>
        <div className='flex'>
            <img
          src="https://media.wbur.org/wp/2020/07/Emmanuel-1000x776.jpg"
          alt=""
          className="h-22 w-22 -mr-8 rounded-full"
        />
            <img
          src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"
          alt=""
          className="h-28 -ml-8"
        /></div>
        
        <div className='text-right'>
            <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname+" "+props.ride?.captain.fullname.lastname}</h2>
            <h4 className='uppercase text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='text-base text-gray-600'>{props.ride?.captain.vehicle.model}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <MapPin size={20} />
            </div>
            <div className="border-gray-600 ml-1">
              <h3 className="text-lg font-medium">{props.completePickupAddress.name}</h3>
              <p className="text-sm text-gray-600">{props.completePickupAddress.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <MapPinHouse size={16} strokeWidth={3} />
            </div>
            <div className="ml-1">
              <h3 className="text-lg font-medium">{props.completeDestinationAddress.name}</h3>
              <p className="text-sm text-gray-600">{props.completeDestinationAddress.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <BanknoteArrowUp size={16} strokeWidth={3} />
            </div>
            <div className="ml-1">
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='w-full text-right flex justify-end'>
          <h2 className='w-1/3 m-4 p-2 rounded-xl text-lg -mb-1 font-medium bg-yellow-400'>OTP:{props.ride?.otp}</h2>
        </div>
        
      </div>
    </div>
  )
}

export default WaitingForDriver