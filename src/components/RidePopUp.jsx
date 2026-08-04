import {
  BanknoteArrowUp,
  ChevronDown,
  MapPin,
  MapPinHouse,
} from "lucide-react";
import React from "react";

const RidePopUp = (props) => {
  console.log(props.ride);
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
        className="absolute top-0 left-[45%] pt-1 text-xl"
      >
        <ChevronDown size={40} />
      </h5>
      <h2 className="text-2xl font-semibold my-3">New Ride Available!</h2>
      <div className="flex items-center bg-yellow-400 rounded-lg justify-between p-3 mt-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDw3oa8g-lmRGmLEzr-7PkAG5dqTxLAb8g1vC87T1krg&s=10"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.rideWithUser.user.fullname.firstname+" "+props.ride?.rideWithUser.user.fullname.lastname}</h2>
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
              <h2 className="text-sm text-gray-600">Pickup</h2>
            </div>

            <div className="border-gray-600 ml-1">
              <h3 className="text-lg font-medium">{props.ride?.completeLocation.completePickupAddress.name}</h3>
              <p className="text-sm text-gray-600">{props.ride?.completeLocation.completePickupAddress.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <div className="flex items-center justify-center flex-col">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eee]">
                <MapPinHouse size={20} />
              </div>
              <h2 className="text-sm text-gray-600">Drop Off</h2>
            </div>

            <div className="ml-1">
              <h3 className="text-lg font-medium">{props.ride?.completeLocation.completeDestinationAddress.name}</h3>
              <p className="text-sm text-gray-600">{props.ride?.completeLocation.completeDestinationAddress.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <BanknoteArrowUp size={16} strokeWidth={3} />
            </div>
            <div className="ml-1">
              <h3 className="text-lg font-medium">₹{props.ride?.rideWithUser.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="w-1/2 mt-5 bg-gray-300 text-white py-2 rounded-xl text-2xl"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.setRidePopupPanel(false);
            }}
            className="w-1/2 mt-5 bg-green-600 text-white py-2 rounded-xl text-2xl"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
