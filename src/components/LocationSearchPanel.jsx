import { MapPin } from "lucide-react";
import React from "react";

const LocationSearchPanel = () => {
  const pickupLocations = [
    {
      name: "Kempegowda International Airport",
      address: "KIAL Rd, Devanahalli, Bengaluru, Karnataka",
    },
    {
      name: "Phoenix Marketcity",
      address:
        "Whitefield Rd, Devasandra Industrial Estate, Mahadevapura, Bengaluru, Karnataka",
    },
    {
      name: "Salarpuria Aura Block B",
      address:
        "BLOCK-B, TOUCH STONE, Chandana, Kadabeesanrahalli, Bengaluru, Karnataka",
    },
    {
      name: "Sheraton Grand Bengaluru Whitefield",
      address:
        "Prestige Shantiniketan Hoodi, Whitefield, Thigalarapalya, Krishnarajapura, Bengaluru",
    },
    {
      name: "KSR Bengaluru City Junction (Bangalore)",
      address: "M.G. Railway Colony, Majestic, Bengaluru, Karnataka",
    },
  ];

  return (
    <div className="space-y-2">
      {pickupLocations.map((item, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 rounded-xl border-2 border-white p-3 cursor-pointer transition-all duration-200 hover:border-black hover:bg-gray-50"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
            <MapPin size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;