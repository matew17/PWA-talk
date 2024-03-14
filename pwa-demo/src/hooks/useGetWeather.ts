import { useEffect, useState } from "react";
import { Weather } from "../models/Weather.models";
import { useGetGeoInformation } from "./useGetGeoInformation";
import { weatherApiBaseURL } from "../config";
import { buildCoordinates } from "../utils/buildCoordinates";

export const useGetWeather = () => {
  const [temperatureInfo, setTemperatureInfo] = useState<Weather | null>(null);
  const { geoInformation, geoinfoLoading } = useGetGeoInformation();

  useEffect(() => {
    if (geoinfoLoading) {
      return;
    }

    const { latitude, longitude } = buildCoordinates(geoInformation);

    const url = new URL("/v1/forecast", weatherApiBaseURL);

    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    url.searchParams.append("current", "temperature_2m,wind_speed_10m");
    url.searchParams.append(
      "hourly",
      "temperature_2m,relative_humidity_2m,wind_speed_10m"
    );

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTemperatureInfo(data);
      });
  }, [geoInformation, geoinfoLoading]);

  return { temperatureInfo };
};
