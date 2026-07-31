import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, LogOut } from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import api from "../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupQuery, setPickupQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const ridePanelRef = useRef(null);
  const driverPanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [ridePanelOpen, setRidePanelOpen] = useState(false);
  const [driverPanelOpen, setDriverPanelOpen] = useState(false);
  const waitingPanelRef = useRef(null);
  const [driverFoundPanelOpen, setDriverFoundPanelOpen] = useState(false);
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

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen],
  );

  useGSAP(
    function () {
      if (ridePanelOpen) {
        gsap.to(ridePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePanelOpen],
  );

  useGSAP(
    function () {
      if (driverPanelOpen) {
        gsap.to(driverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(driverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [driverPanelOpen],
  );

  useGSAP(
    function () {
      if (driverFoundPanelOpen) {
        gsap.to(waitingPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [driverFoundPanelOpen],
  );

  useEffect(() => {
    const query = activeField === "pickup" ? pickupQuery : destinationQuery;
    const trimmedQuery = query.trim();

    if (!activeField || trimmedQuery.length < 3) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const response = await api.get("/maps/get-suggestions", {
          params: { input: trimmedQuery },
        });
        setSuggestions(response.data || []);
        setPanelOpen(!vehiclePanelOpen && (response.data || []).length > 0);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
        setPanelOpen(false);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [activeField, pickupQuery, destinationQuery, vehiclePanelOpen]);

  async function logMeOut() {
    try {
      await api.post("/users/logout", { withCredentials: true });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  const handleLocationInput = (field, value) => {
    if (field === "pickup") {
      setPickup(value);
      setPickupQuery(value);
    } else {
      setDestination(value);
      setDestinationQuery(value);
    }

    setActiveField(field);
    setPanelOpen(value.trim().length >= 3);
  };

  const handleSuggestionSelect = (selectedLocation, field) => {
    const nextPickup = field === "pickup" ? selectedLocation.name : pickup;
    const nextDestination =
      field === "destination" ? selectedLocation.name : destination;

    if (field === "pickup") {
      setPickup(selectedLocation.name);
      setPickupQuery(selectedLocation.name);
    } else {
      setDestination(selectedLocation.name);
      setDestinationQuery(selectedLocation.name);
    }

    setSuggestions([]);
    setPanelOpen(false);

    if (nextPickup.trim() && nextDestination.trim()) {
      setVehiclePanelOpen(true);
      setPanelOpen(false);
    } else {
      setVehiclePanelOpen(false);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
          alt=""
        />
        <Link
          onClick={() => {
            logMeOut();
          }}
          to="/login"
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white"
        >
          <LogOut size={16} strokeWidth={3} />
        </Link>
      </div>
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end absolute top-0 h-screen w-full rounded-full ">
        <div className="bg-white p-6 h-[28%] relative">
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
            <div className="line absolute h-16 w-1 top-[38%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-xl rounded-lg w-full mt-5"
              onFocus={() => {
                setActiveField("pickup");
                setPanelOpen(pickupQuery.trim().length >= 3);
              }}
              onChange={(e) => {
                handleLocationInput("pickup", e.target.value);
              }}
              value={pickup}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-xl rounded-lg w-full mt-3"
              onFocus={() => {
                setActiveField("destination");
                setPanelOpen(destinationQuery.trim().length >= 3);
              }}
              onChange={(e) => {
                handleLocationInput("destination", e.target.value);
              }}
              value={destination}
              type="text"
              placeholder="Enter your destination"
            />
            <div className="flex w-full items-center justify-center">
            </div>
          </form>
        </div>
        <div ref={panelRef} className="bg-white">
          <LocationSearchPanel
            activeField={activeField}
            suggestions={suggestions}
            isLoading={isLoadingSuggestions}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <VehiclePanel
          setRidePanelOpen={setRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={ridePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <ConfirmRide
          setDriverPanelOpen={setDriverPanelOpen}
          setRidePanelOpen={setRidePanelOpen}
        />
      </div>
      <div
        ref={driverPanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <LookingForDriver
          setDriverFoundPanelOpen={setDriverFoundPanelOpen}
          setDriverPanelOpen={setDriverPanelOpen}
        />
      </div>
      <div
        ref={waitingPanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <WaitingForDriver setDriverFoundPanelOpen={setDriverFoundPanelOpen} />
      </div>
    </div>
  );
};

export default Home;
