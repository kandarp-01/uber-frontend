import { MapPin } from "lucide-react";
import React from "react";

const LocationSearchPanel = ({
  activeField,
  suggestions = [],
  isLoading = false,
  onSelect = () => {},
}) => {
  if (!suggestions.length && !isLoading) {
    return null;
  }

  return (
    <div className="max-h-full space-y-2 overflow-y-auto px-2 pb-2">
      {isLoading && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
          Searching locations...
        </div>
      )}

      {!isLoading &&
        suggestions.map((item, idx) => (
          <button
            key={item.id || `${item.name}-${idx}`}
            type="button"
            onClick={() => {
              onSelect(item, activeField);
            }}
            className="flex w-full items-center justify-start gap-4 rounded-xl border-2 border-gray-200 p-3 text-left active:border-gray-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee]">
              <MapPin size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.address}</p>
            </div>
          </button>
        ))}
    </div>
  );
};

export default LocationSearchPanel;
