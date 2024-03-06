/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import "./App.css";
import { apiUrl } from "./config";

function App() {
  const [temperatureInfo, setTemperatureInfo] = useState<any | null>(null);

  useEffect(() => {
    fetch(
      `${apiUrl}?latitude=6.1448792&longitude=-75.3947176&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemperatureInfo(data);
      });
  }, []);

  return (
    <>
      <section
        style={{
          background: "#226ba3",
          color: "white",
          height: "100vh",
          width: "100%",
          display: "flex",
          padding: "24px",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          fontSize: "3em",
        }}
      >
        {temperatureInfo?.current?.temperature_2m && (
          <>
            <h1>Temperatura Actual:</h1>

            <h2>
              {Number(temperatureInfo?.current?.temperature_2m).toFixed()}
              {temperatureInfo?.current_units?.temperature_2m}
            </h2>
          </>
        )}
      </section>
    </>
  );
}

export default App;
