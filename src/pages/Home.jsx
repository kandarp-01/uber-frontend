import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, User } from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const ridePanelRef = useRef(null);
  const driverPanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [ridePanelOpen, setRidePanelOpen] = useState(false)
  const [driverPanelOpen, setDriverPanelOpen] = useState(false)
  const waitingPanelRef = useRef(null);
  const [driverFoundPanelOpen, setDriverFoundPanelOpen] = useState(false)
  async function submitHandler(e) {
    e.preventDefault();
  }
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "80%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen],
  );
  useGSAP(function(){
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })}
    else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[vehiclePanelOpen])
  useGSAP(function(){
    if(ridePanelOpen){
      gsap.to(ridePanelRef.current,{
      transform:'translateY(0)'
    })}
    else{
      gsap.to(ridePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[ridePanelOpen])
  useGSAP(function(){
    if(driverPanelOpen){
      gsap.to(driverPanelRef.current,{
      transform:'translateY(0)'
    })}
    else{
      gsap.to(driverPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[driverPanelOpen])

  useGSAP(function(){
    if(driverFoundPanelOpen){
      gsap.to(waitingPanelRef.current,{
      transform:'translateY(0)'
    })}
    else{
      gsap.to(waitingPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[driverFoundPanelOpen])
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end absolute top-0 h-screen w-full rounded-full ">
        <div className="bg-white p-6 h-[24%] relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <ChevronDown />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-xl rounded-lg w-full mt-5"
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              value={pickup}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-xl rounded-lg w-full mt-3"
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              value={destination}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white">
        <VehiclePanel setRidePanelOpen={setRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      <div ref={ridePanelRef} className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white">
        <ConfirmRide setDriverPanelOpen={setDriverPanelOpen} setRidePanelOpen={setRidePanelOpen}/>
      </div>
      <div ref={driverPanelRef} className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white">
        <LookingForDriver setDriverFoundPanelOpen={setDriverFoundPanelOpen} setDriverPanelOpen={setDriverPanelOpen} />
      </div>
      <div ref={waitingPanelRef} className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white">
        <WaitingForDriver setDriverFoundPanelOpen={setDriverFoundPanelOpen} />
      </div>
    </div>
  );
};

export default Home;
