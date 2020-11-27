import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ok,
  availableSkyAndWind,
  availableTemperatures,
  availableWater,
  Sky,
  Temperature,
  Water,
  Weather,
  Wind,
  WaterGroup,
} from "./options";

const allTemperatures = availableTemperatures();

function validWeather(w: Partial<Weather>): boolean {
  return (
    (w.sky && w.temperature && w.water && w.wind) !== undefined &&
    ok(w as Weather)
  );
}

type PickerProps = {
  weather: Weather | null;
  setWeather: (weather: Weather) => void;
};
export default function Picker({ weather, setWeather }: PickerProps) {
  const [local, setLocal] = useState<Partial<Weather>>({});
  const combinedWeather: Partial<Weather> = useMemo(
    () => ({ ...weather, ...local }),
    [weather, local]
  );

  useEffect(() => {
    return () => setLocal({});
  }, [weather]);

  const temperatures = availableTemperatures(combinedWeather);

  const setTemperature = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const temperature = event.target.value as Temperature;
      const w: Partial<Weather> = { ...combinedWeather, temperature };
      if (validWeather(w)) {
        setLocal({});
        setWeather(w as Weather);
      } else {
        if (temperatures.includes(temperature)) {
          setLocal({ ...local, temperature });
        } else {
          setLocal({ ...local, temperature, water: undefined });
        }
      }
    },
    [local, setLocal, combinedWeather, setWeather, temperatures]
  );

  const setSkyWindOptions = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const [sky, wind] = event.target.value.split(",") as [Sky, Wind];
      const w: Partial<Weather> = { ...combinedWeather, sky, wind };
      if (validWeather(w)) {
        setLocal({});
        setWeather(w as Weather);
      } else {
        setLocal({ ...local, sky, wind });
      }
    },
    [local, setLocal, combinedWeather, setWeather]
  );

  const setWater = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const water = event.target.value.split(",") as WaterGroup;
      const w: Partial<Weather> = { ...combinedWeather, water };
      if (validWeather(w)) {
        setLocal({});
        setWeather(w as Weather);
      } else {
        setLocal({ ...local, water });
      }
    },
    [local, setLocal, combinedWeather, setWeather]
  );

  const skyWindOptions = availableSkyAndWind(combinedWeather);
  const waterOptions =
    combinedWeather.temperature || combinedWeather.sky
      ? availableWater(combinedWeather)
      : [];

  return (
    <div>
      <select
        value={combinedWeather.temperature || ""}
        onChange={setTemperature}
      >
        {!combinedWeather.temperature && <option value="">Temperature</option>}
        {allTemperatures.map((t) => (
          <option key={t} value={t}>
            {temperatures.includes(t) ? t : `(invalid) ${t}`}
          </option>
        ))}
      </select>
      <select
        value={`${combinedWeather.sky},${combinedWeather.wind}`}
        onChange={setSkyWindOptions}
      >
        {!(combinedWeather.sky && combinedWeather.wind) && (
          <option>Sky / Wind</option>
        )}
        {skyWindOptions.map(({ sky, wind }) => (
          <option key={`${sky},${wind}`} value={`${sky},${wind}`}>
            {sky} {wind}
          </option>
        ))}
      </select>
      <select
        value={combinedWeather.water && combinedWeather.water.join(",")}
        onChange={setWater}
      >
        {!combinedWeather.water && <option>Water</option>}
        {waterOptions.map((water) => (
          <option key={water.join(",")} value={water.join(",")}>
            {water.join(", ")}
          </option>
        ))}
      </select>
      <br />
      {combinedWeather.temperature}, {combinedWeather.sky},{" "}
      {combinedWeather.wind},
      {combinedWeather.water && combinedWeather.water.join(", ")}
    </div>
  );
}
