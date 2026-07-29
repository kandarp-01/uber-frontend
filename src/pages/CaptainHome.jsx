import {
  BanknoteArrowUp,
  Clock,
  Gauge,
  LogOut,
  MapPinHouse,
  ScrollText,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CaptainHome = () => {
  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <Link
          to="/home"
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white"
        >
          <LogOut size={16} strokeWidth={3} />
        </Link>
      </div>
      <div className="h-1/2 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              className="w-15 h-15 rounded-full object-cover"
              src="https://media.wbur.org/wp/2020/07/Emmanuel-1000x776.jpg"
              alt=""
            />
            <h4 className="text-lg font-medium">Aman Patel</h4>
          </div >
          <div className="flex items-center justify-start gap-3">
            <h4 className="text-xl font-semibold">₹500</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 items-start">
          <div className="items-center flex flex-col">
            <Clock size={25} strokeWidth={0.75} />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="items-center flex flex-col">
            <Gauge size={25} strokeWidth={0.75} />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div lassName="items-center flex flex-col">
            <ScrollText size={25} strokeWidth={0.75} />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
