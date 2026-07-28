import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");
  const navigate=useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
        vehicle: {
          color,
          plate,
          capacity: Number(capacity),
          vehicleType:type,
        },
      };
      const response = await api.post("/captains/register", captainData);
      if(response.status===201){
        setCaptain(captainData);
        navigate('/captain-login');
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setColor("");
      setCapacity("");
      setType("");
      setPlate("");
    } catch (error) {
      console.error(error.response.data);
    }
  }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-6"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-1 mb-6">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
              required
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email
          </h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mb-6 w-full text-lg placeholder:text-base"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="password"
          />
          <h3 className="text-xl font-medium mb-2">Vehicle Informations</h3>
          <div className="flex gap-4 mb-7">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              onChange={(e) => {
                setColor(e.target.value);
              }}
              value={color}
              required
              placeholder="Vehicle color"
            />
            <input
              className="uppercase bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              onChange={(e) => {
                setPlate(e.target.value);
              }}
              value={plate}
              placeholder="Vehicle Plate no."
              required
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/3 text-lg placeholder:text-base"
              type="number"
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
              value={capacity}
              placeholder="Capacity"
              required
            />

            <select
              required
              className="bg-[#eeeeee] rounded px-4 py-2 w-2/3 text-lg placeholder:text-base"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Bike</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[9px] leading-tight">
          By proceeding you agree to Uber's{" "}
          <span className="text-cyan-600">Terms of Use</span> and acknowledge
          you have read the{" "}
          <span className="text-cyan-600">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
