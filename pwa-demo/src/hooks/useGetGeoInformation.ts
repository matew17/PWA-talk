import { useEffect, useState } from "react";

export const useGetGeoInformation = () => {
  const [geoInformation, setGeoInformation] =
    useState<GeolocationPosition | null>(null);

  const [geoinfoLoading, setGeoinfoLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        // Set last lat lon when online
        if (navigator.onLine) {
          localStorage.setItem("lastLatitude", data.coords.latitude.toString());
          localStorage.setItem(
            "lastLongitude",
            data.coords.longitude.toString()
          );
        }

        setGeoInformation(data);
        setGeoinfoLoading(false);
      },
      () => {
        setGeoInformation(null);
        setGeoinfoLoading(false);
      }
    );
  }, []);

  return {
    geoInformation,
    geoinfoLoading,
  };
};
