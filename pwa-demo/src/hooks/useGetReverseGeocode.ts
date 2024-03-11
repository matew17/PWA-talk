import { useEffect, useState } from "react";

import { useGetGeoInformation } from "./useGetGeoInformation";
import { reverseGeocodeApiBaseURL } from "../config";
import { ReverseGeocode } from "../models/ReverseGeocode.models";

export const useGetReverseGeoCode = () => {
  const { geoInformation, geoinfoLoading } = useGetGeoInformation();
  const [reverseGeocode, setreverseGeocode] = useState<ReverseGeocode | null>(
    null
  );

  useEffect(() => {
    if (geoinfoLoading) {
      return;
    }

    const url = new URL(
      "/data/reverse-geocode-client",
      reverseGeocodeApiBaseURL
    );

    const latitude =
      geoInformation?.coords?.latitude?.toString() ?? "6.1448792";
    const longitude =
      geoInformation?.coords?.longitude?.toString() ?? "-75.3947176";

    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("localityLanguage", "es");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setreverseGeocode(data);
      });
  }, [geoInformation?.coords, geoinfoLoading]);

  return { reverseGeocode };
};
