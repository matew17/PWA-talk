import { useEffect, useState } from "react";

import { useGetGeoInformation } from "./useGetGeoInformation";
import { reverseGeocodeApiBaseURL } from "../config";
import { ReverseGeocode } from "../models/ReverseGeocode.models";
import { buildCoordinates } from "../utils/buildCoordinates";

export const useGetReverseGeoCode = () => {
  const { geoInformation, geoinfoLoading } = useGetGeoInformation();
  const [reverseGeocode, setreverseGeocode] = useState<ReverseGeocode | null>(
    null
  );

  useEffect(() => {
    if (geoinfoLoading) {
      return;
    }

    const { latitude, longitude } = buildCoordinates(geoInformation);

    const url = new URL(
      "/data/reverse-geocode-client",
      reverseGeocodeApiBaseURL
    );

    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("localityLanguage", "es");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setreverseGeocode(data);
      });
  }, [geoInformation, geoinfoLoading]);

  return { reverseGeocode };
};
