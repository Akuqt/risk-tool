/* eslint-disable no-undef */
import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setError(err);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);
  return { location, error };
};
