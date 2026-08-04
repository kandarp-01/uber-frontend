import {
  BanknoteArrowUp,
  Clock,
  Gauge,
  LogOut,
  MapPinHouse,
  ScrollText,
} from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext);
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const [ride, setRide] = useState(null)

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain.captainId });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            };
            socket.emit("update-location-captain", {
              userType: "captain",
              userId: captain.captainId,
              location,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    
    const intervalId = setInterval(updateLocation, 10000);
    updateLocation(); // Call it immediately to send the first location update
    return () => clearInterval(intervalId);

  }, [captain, socket]);

  socket.on('new-ride',(data)=>{
    setRide(data)
    setRidePopupPanel(true);
  })



  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel],
  );
  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel],
  );

  async function logMeOut() {
    try {
      await api.post("/captains/logout", { withCredentials: true });
    } catch (error) {
      console.error(error.response.data);
    }
  }
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <Link
          onClick={() => {
            logMeOut();
          }}
          to="/captain-login"
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white"
        >
          <LogOut size={16} strokeWidth={3} />
        </Link>
      </div>
      <div className="h-2/3 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/3 p-6">
        <CaptainDetails captain={captain} />
      </div>
      <div
        ref={ridePopupRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <RidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed w-full z-10 translate-y-full h-screen bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
