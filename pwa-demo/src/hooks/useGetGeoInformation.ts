import { useEffect, useState } from "react";

export const useGetGeoInformation = () => {
  const [geoInformation, setGeoInformation] =
    useState<GeolocationPosition | null>(null);

  const [geoinfoLoading, setGeoinfoLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
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
