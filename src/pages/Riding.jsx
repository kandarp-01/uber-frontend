import { BanknoteArrowUp, House, MapPin, MapPinHouse } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const Riding = () => {
  const location = useLocation();
  const [rideData] = useState(() => location.state?.ride || null);
  const {socket} = useContext(SocketContext)
  const navigate=useNavigate();

  socket.on("ride-ended",()=>{
    navigate('/home');
  })


  return (
    <div className="h-screen">
        <Link to='/home' className="fixed right-2 top-2 h-10 w-10 flex items-center justify-center rounded-full bg-white">
            <House size={20} strokeWidth={2} />
        </Link>
      <div className="h-1/2 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 fixed w-full bottom-0 px-3 py-2 rounded-xl bg-white">
        
        <div className="flex items-center justify-between border-b-2 border-gray-400">
          <div className="flex">
            <img
              src="https://media.wbur.org/wp/2020/07/Emmanuel-1000x776.jpg"
              alt=""
              className="h-20 w-20 -mr-8 rounded-full "
            />
            <img
              src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"
              alt=""
              className="h-28 -ml-8"
            />
          </div>

          <div className="text-right">
            <h2 className="text-lg font-medium">{rideData.captain.fullname.firstname+" "+rideData.captain.fullname.lastname}</h2>
          <h4 className="uppercase text-xl font-semibold -mt-1 -mb-1">{rideData.captain.vehicle.plate}</h4>
            <p className="text-base text-gray-600">{rideData.captain.vehicle.model}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
                <MapPinHouse size={16} strokeWidth={3} />
              </div>
              <div className="ml-1">
                <h3 className="text-lg font-medium">{rideData.completeDestinationAddress.name}</h3>
                <p className="text-sm text-gray-600">{rideData.completeDestinationAddress.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
                <BanknoteArrowUp size={16} strokeWidth={3} />
              </div>
              <div className="ml-1">
                <h3 className="text-lg font-medium">₹{rideData.fare}</h3>
                <p className="text-sm text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        
        </div>

        <button onClick={()=>{
        }} className="w-full mt-5 bg-green-600 text-white py-2 rounded-xl text-2xl">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
