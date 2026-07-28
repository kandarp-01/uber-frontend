import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  async function submitHandler(e) {
    e.preventDefault();
  }
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "80%",
          padding:24
        });
        gsap.to(panelCloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen],
  );
  return (
    <div className="h-screen relative">
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
      <div className="flex flex-col justify-end absolute bottom-0 h-screen w-full ">
        <div className="bg-white p-6 h-[25%] relative">
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
        <div ref={panelRef} className="bg-white overflow-hidden">
          <LocationSearchPanel/>
        </div>
      </div>
      <div className="fixed z-10">
              <div>
                <img src="data:image/jpeg;base64,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" alt="" />
              </div>
      </div>
    </div>
  );
};

export default Home;
