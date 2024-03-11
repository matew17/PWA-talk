import styles from "./Weather.component.module.css";

import { useGetWeather } from "../hooks/useGetWeather";
import { useGetGeoInformation } from "../hooks/useGetGeoInformation";
import { useEffect, useState } from "react";
import { useGetReverseGeoCode } from "../hooks/useGetReverseGeocode";

export const Weather = () => {
  const { geoInformation, geoinfoLoading } = useGetGeoInformation();
  const { reverseGeocode } = useGetReverseGeoCode();
  const { temperatureInfo } = useGetWeather();

  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const time = new Date(geoInformation?.timestamp ?? "").toLocaleTimeString();

    setCurrentTime(time);
  }, [geoInformation?.timestamp]);

  return (
    <section
      className={`${styles.weatherContainer} ${styles.weatherContainerDay}`}
    >
      <header className={styles.weatherHeader}>
        <p>{reverseGeocode?.city ?? "---"}</p>
        <p>{geoinfoLoading ? "-- --" : currentTime}</p>
      </header>

      <section className={styles.weatherIcon}>
        <img src="svg/sun.svg" alt="sun" />
      </section>

      <p className={styles.weatherTemperature}>
        {temperatureInfo?.current?.temperature_2m ? (
          <>
            {Math.round(temperatureInfo?.current?.temperature_2m)}
            {temperatureInfo?.current_units?.temperature_2m}
          </>
        ) : (
          "-- -"
        )}
      </p>

      <section className={styles.weatherChart}>
        <img src="svg/chart.svg" alt="char" />
      </section>
    </section>
  );
};
