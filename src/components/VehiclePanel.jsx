import { ChevronDown, User } from 'lucide-react';
import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5
            onClick={() => {
              props.setVehiclePanelOpen(false);
            }}
            className="absolute right-6 top-6 text-2xl"
          >
            <ChevronDown />
          </h5>
        <h2 className="text-2xl font-semibold mb-5">Select your ride</h2>
        <div onClick={()=>{
            props.setSelectedVehicle({vehicle:'car',img:"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"})
            props.setVehiclePanelOpen(false);
            props.setRidePanelOpen(true);
        }} className="flex mb-1 border-2 active:border-gray-800 border-gray-100 rounded-xl w-full p-3 items-center justify-between">
          <img
            src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"
            alt=""
            className="h-20"
          />
          <div className="ml-2 w-1/2">
            <h4 className="flex font-semibold text-sm">
              UberGo
              <span className="ml-2">
                <User className="h-5 w-5 " />
              </span>
              4
            </h4>
            <h5 className="font-medium text-base">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
        </div>

        <div onClick={()=>{
            props.setSelectedVehicle({vehicle:'motorcycle',img:"https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n"})
            props.setVehiclePanelOpen(false);
            props.setRidePanelOpen(true)
        }} className="flex mb-1 border-2 active:border-gray-800  border-gray-100 rounded-xl w-full p-3 items-center justify-between">
          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n"
            alt=""
            className="h-20"
          />
          <div className="ml-2 w-1/2">
            <h4 className="flex font-semibold text-sm">
              Moto
              <span className="ml-2">
                <User className="h-5 w-5 " />
              </span>
              1
            </h4>
            <h5 className="font-medium text-base">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, motorcycle rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.motorcycle}</h2>
        </div>

        <div onClick={()=>{
            props.setSelectedVehicle({vehicle:'auto',img:"https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn"})
            props.setVehiclePanelOpen(false);
            props.setRidePanelOpen(true)
        }} className="flex border-2 active:border-gray-800  border-gray-100 rounded-xl w-full p-3 items-center justify-between">
          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn"
            alt=""
            className="h-20"
          />
          <div className="ml-2 w-1/2">
            <h4 className="flex font-semibold text-sm">
              UberAuto
              <span className="ml-2">
                <User className="h-5 w-5 " />
              </span>
              3
            </h4>
            <h5 className="font-medium text-base">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel