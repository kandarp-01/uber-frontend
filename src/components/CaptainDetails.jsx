import { Clock, Gauge, ScrollText } from 'lucide-react'
import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              className="w-13 h-13 rounded-full object-cover"
              src="https://media.wbur.org/wp/2020/07/Emmanuel-1000x776.jpg"
              alt=""
            />
            <h4 className="text-lg font-medium">Aman Patel</h4>
          </div >
          <div className="flex flex-col items-center justify-start">
            <h4 className="text-xl font-semibold">₹500</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
          <div className="items-center flex flex-col">
            <Clock size={25} strokeWidth={1.25} />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="items-center flex flex-col">
            <Gauge size={25} strokeWidth={1.25} />
            <h5 className="text-lg font-medium">30 KM</h5>
            <p className="text-sm text-gray-600">Total Distance</p>
          </div>
          <div className="items-center flex flex-col">
            <ScrollText size={25} strokeWidth={1.25} />
            <h5 className="text-lg font-medium">20</h5>
            <p className="text-sm text-gray-600">Total Jobs</p>
          </div>
          
        </div>  
    </div>
  )
}

export default CaptainDetails