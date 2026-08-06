import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronUp, House } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const location = useLocation();
    const [rideData] = useState(() => location.state?.ride || null);
    const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false);
    const finishRideRef = useRef(null)
    useGSAP(function(){
    if(finishRidePanelOpen){
      gsap.to(finishRideRef.current,{
      transform:'translateY(0)'
    })}
    else{
      gsap.to(finishRideRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[finishRidePanelOpen])

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <Link
          onClick={()=>{

          }}
          to="/captain-home"
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white"
        >
          <House size={20} strokeWidth={2} />
        </Link>
      </div>
      <div className="h-4/5 w-screen">
        <LiveTracking />
      </div>
      <div onClick={()=>{
        setFinishRidePanelOpen(true);
      }} className="h-1/5 p-6 relative bg-yellow-400 flex items-center justify-between">
          <h5
        className="absolute top-0 left-[45%] pt-1 text-xl"
      >
        <ChevronUp className='text-amber-100' size={40}/>
      </h5>
          <h4 className='text-xl font-semibold'>{rideData?.rideWithUser?.distance || '3 KM away'}</h4>
          <button className="bg-green-600 text-white py-2 px-2 rounded-xl text-2xl">Complete Ride</button>
      </div>

        <div ref={finishRideRef} className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-5 bg-white">
         <FinishRide ride={rideData} setFinishRidePanelOpen={setFinishRidePanelOpen}/>
      </div>


    </div>
  )
}

export default CaptainRiding