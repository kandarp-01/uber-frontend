import React, { useEffect, useRef, useState } from 'react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const LOCATION_UPDATE_INTERVAL_MS = 10000;

const LiveTracking = ({ className = 'h-full w-full' }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const [status, setStatus] = useState('Locating your position...');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!mapContainerRef.current || typeof window === 'undefined') {
      return;
    }

    if (!window.mapboxgl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('Mapbox could not be loaded. Please check your connection and token.');
      return;
    }

    window.mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.5946, 12.9716],
      zoom: 14,
    });

    mapRef.current = map;

    const currentMarkerElement = document.createElement('div');
    currentMarkerElement.className = 'h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow-lg';
    currentMarkerRef.current = new window.mapboxgl.Marker(currentMarkerElement)
      .setLngLat([77.5946, 12.9716])
      .addTo(map);

    const handleLocation = (position) => {
      const { latitude, longitude } = position.coords;
      const nextPosition = [longitude, latitude];

      setStatus('Tracking your live location');
      setError('');

      currentMarkerRef.current?.setLngLat(nextPosition);
      mapRef.current?.flyTo({
        center: nextPosition,
        zoom: 16,
        essential: true,
      });
    };

    const handleLocationError = (geoError) => {
      setError(geoError.message || 'Unable to access your location.');
      setStatus('Showing default location');
    };

    const updateLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported in this browser.');
        setStatus('Showing default location');
        return;
      }

      navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      });
    };

    updateLocation();
    const intervalId = window.setInterval(updateLocation, LOCATION_UPDATE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
      currentMarkerRef.current?.remove();
      map.remove();
    };
  }, []);

  return (
    <div className={`${className} relative overflow-hidden`}>
      <div ref={mapContainerRef} className="h-full w-full" />
      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm shadow">
        {error ? error : status}
      </div>
    </div>
  );
};

export default LiveTracking;