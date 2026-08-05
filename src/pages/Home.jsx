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
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";



const Home = () => {
  const [pickup, setPickup] = useState("");
  const [completePickupAddress, setCompletePickupAddress] = useState({})
  const [completeDestinationAddress, setCompleteDestinationAddress] = useState({})
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
  const [fare, setFare] = useState({});
  const [driverFoundPanelOpen, setDriverFoundPanelOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({})
  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  const [ride, setRide] = useState(null)

  const navigate=useNavigate()
  useEffect(()=>{
    socket.emit("join",{userType: "user", userId: user._id});
  },[user,socket]);

  socket.on("ride-confirmed", ride =>{
    setDriverFoundPanelOpen(true);
    setRide(ride);
  })

  socket.on("ride-started", ride=>{
    setDriverFoundPanelOpen(false);
    navigate('/riding',{state:{ride:{...ride,completeDestinationAddress}}});
  })

  const closeAllBottomPanels = () => {
    setVehiclePanelOpen(false);
    setRidePanelOpen(false);
    setDriverPanelOpen(false);
    setDriverFoundPanelOpen(false);
    setPanelOpen(false);
  };

  const openVehiclePanel = () => {
    closeAllBottomPanels();
    setVehiclePanelOpen(true);
  };

  const openRidePanel = () => {
    closeAllBottomPanels();
    setRidePanelOpen(true);
  };

  const openDriverPanel = () => {
    closeAllBottomPanels();
    setDriverPanelOpen(true);
  };

  const openDriverFoundPanel = () => {
    closeAllBottomPanels();
    setDriverFoundPanelOpen(true);
  };

  async function submitHandler(e) {
    e.preventDefault();

    if (!pickup.trim() || !destination.trim()) {
      return;
    }

    try {
      const response = await api.get("/rides/get-fare", {
        params: { pickup, destination },
      });
    
      setFare(response.data);
    } catch (error) {
      console.error(error);
    }

    openVehiclePanel();
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
        //setPanelOpen(!vehiclePanelOpen && (response.data || []).length > 0);
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

  async function createRide(){
    try{
      const response=await api.post('/rides/create',{
      pickup,
      destination,
      vehicleType:selectedVehicle.vehicle,
      completePickupAddress,
      completeDestinationAddress
    })
    
    }
    catch(error){
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
    const shouldOpenSuggestions =
      value.trim().length >= 3 &&
      !vehiclePanelOpen &&
      !ridePanelOpen &&
      !driverPanelOpen &&
      !driverFoundPanelOpen;

    setPanelOpen(shouldOpenSuggestions);
  };

  const handleSuggestionSelect = (selectedLocation, field) => {
    const nextPickup = field === "pickup" ? selectedLocation.name : pickup;
    const nextDestination =
      field === "destination" ? selectedLocation.name : destination;

    if (field === "pickup") {
      setCompletePickupAddress({name:selectedLocation.name,address:selectedLocation.address})
      setPickup(selectedLocation.name);
      setPickupQuery(selectedLocation.name);
    } else {
      setCompleteDestinationAddress({name:selectedLocation.name,address:selectedLocation.address})
      setDestination(selectedLocation.name);
      setDestinationQuery(selectedLocation.name);
    }

    setSuggestions([]);
    setPanelOpen(false);
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
                const shouldOpenSuggestions =
                  pickupQuery.trim().length >= 3 &&
                  !vehiclePanelOpen &&
                  !ridePanelOpen &&
                  !driverPanelOpen &&
                  !driverFoundPanelOpen;
                setPanelOpen(shouldOpenSuggestions);
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
                const shouldOpenSuggestions =
                  destinationQuery.trim().length >= 3 &&
                  !vehiclePanelOpen &&
                  !ridePanelOpen &&
                  !driverPanelOpen &&
                  !driverFoundPanelOpen;
                setPanelOpen(shouldOpenSuggestions);
              }}
              onChange={(e) => {
                handleLocationInput("destination", e.target.value);
              }}
              value={destination}
              type="text"
              placeholder="Enter your destination"
            />
            <div className="mt-4 flex w-full items-center justify-center">
              <button
                type="submit"
                className="w-full rounded-lg bg-black px-4 py-3 text-lg font-semibold text-white"
              >
                Find trip
              </button>
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
          fare={fare}
          setSelectedVehicle={setSelectedVehicle}
          setRidePanelOpen={openRidePanel}
          setVehiclePanelOpen={closeAllBottomPanels}
        />
      </div>
      <div
        ref={ridePanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <ConfirmRide
          completePickupAddress={completePickupAddress}
          completeDestinationAddress={completeDestinationAddress}
          selectedVehicle={selectedVehicle}
          fare={fare}
          createRide={createRide}
          setDriverPanelOpen={openDriverPanel}
          setRidePanelOpen={closeAllBottomPanels}
        />
      </div>
      <div
        ref={driverPanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <LookingForDriver
          completePickupAddress={completePickupAddress}
          completeDestinationAddress={completeDestinationAddress}
          selectedVehicle={selectedVehicle}
          fare={fare}
          setDriverFoundPanelOpen={openDriverFoundPanel}
          setDriverPanelOpen={closeAllBottomPanels}
        />
      </div>
      <div
        ref={waitingPanelRef}
        className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 rounded-xl bg-white"
      >
        <WaitingForDriver
          setDriverFoundPanelOpen={closeAllBottomPanels}
          ride={ride}
          completePickupAddress={completePickupAddress}
          completeDestinationAddress={completeDestinationAddress}
        />
      </div>
    </div>
  );
};

export default Home;
