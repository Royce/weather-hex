import React, { useCallback } from "react";
import {
  availableSkyAndWind,
  availableTemperatures,
  availableWater,
  Sky,
  Temperature,
  Water,
  Weather,
  Wind,
} from "./options";

const allTemperatures = availableTemperatures();

type PickerProps = {
  weather: Partial<Weather>;
  setWeather: (weather: Partial<Weather>) => void;
};
export default function Picker({ weather, setWeather }: PickerProps) {
  const temperatures = availableTemperatures(weather);
  const setTemperature = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const temperature = event.target.value as Temperature;
      if (temperatures.includes(temperature))
        setWeather({
          ...weather,
          temperature,
        });
      else
        setWeather({
          ...weather,
          temperature,
          water: undefined,
        });
    },
    [setWeather, weather, temperatures]
  );

  const skyWindOptions = availableSkyAndWind(weather);
  const setSkyWindOptions = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const [sky, wind] = event.target.value.split(",") as [Sky, Wind];
      setWeather({ ...weather, sky, wind });
    },
    [setWeather, weather]
  );

  const waterOptions =
    weather.temperature || weather.sky ? availableWater(weather) : [];
  const setWater = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const water = event.target.value.split(",") as Water[];
      setWeather({
        ...weather,
        water,
      });
    },
    [setWeather, weather]
  );

  return (
    <div>
      <select value={weather.temperature} onChange={setTemperature}>
        {!weather.temperature && <option>Temperature</option>}
        {allTemperatures.map((t) => (
          <option key={t} value={t}>
            {temperatures.includes(t) ? t : `(invalid) ${t}`}
          </option>
        ))}
      </select>
      <select
        value={`${weather.sky},${weather.wind}`}
        onChange={setSkyWindOptions}
      >
        {!(weather.sky && weather.wind) && <option>Sky / Wind</option>}
        {skyWindOptions.map(({ sky, wind }) => (
          <option key={`${sky},${wind}`} value={`${sky},${wind}`}>
            {sky} {wind}
          </option>
        ))}
      </select>
      <select
        value={weather.water && weather.water.join(",")}
        onChange={setWater}
      >
        {!weather.water && <option>Water</option>}
        {waterOptions.map((water) => (
          <option key={water.join(",")} value={water.join(",")}>
            {water.join(", ")}
          </option>
        ))}
      </select>
      <br />
      {weather.temperature}, {weather.sky}, {weather.wind},
      {weather.water && weather.water.join(", ")}
    </div>
  );
}
