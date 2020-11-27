import React, { useCallback, useEffect, useState } from "react";
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
  weather: Weather | null;
  setWeather: (weather: Weather) => void;
};
export default function Picker({ weather, setWeather }: PickerProps) {
  const [localWeather, _setLocalWeather] = useState<Partial<Weather>>(
    weather || {}
  );

  useEffect(() => {
    _setLocalWeather(weather || {});
  }, [weather]);

  const setLocalWeather = useCallback(
    (w: Partial<Weather>) => {
      _setLocalWeather(w);
      if (w.sky && w.temperature && w.wind && w.water && w.water.length >= 1)
        setWeather(w as Weather);
    },
    [_setLocalWeather, setWeather]
  );

  const temperatures = availableTemperatures(localWeather);
  const setTemperature = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const temperature = event.target.value as Temperature;
      if (temperatures.includes(temperature))
        setLocalWeather({
          ...localWeather,
          temperature,
        });
      else
        setLocalWeather({
          ...localWeather,
          temperature,
          water: undefined,
        });
    },
    [setLocalWeather, localWeather, temperatures]
  );

  const skyWindOptions = availableSkyAndWind(localWeather);
  const setSkyWindOptions = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const [sky, wind] = event.target.value.split(",") as [Sky, Wind];
      setLocalWeather({ ...localWeather, sky, wind });
    },
    [setLocalWeather, localWeather]
  );

  const waterOptions =
    localWeather.temperature || localWeather.sky
      ? availableWater(localWeather)
      : [];
  const setWater = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const water = event.target.value.split(",") as Water[];
      setLocalWeather({
        ...localWeather,
        water,
      });
    },
    [setLocalWeather, localWeather]
  );

  return (
    <div>
      <select value={localWeather.temperature || ""} onChange={setTemperature}>
        {!localWeather.temperature && <option value="">Temperature</option>}
        {allTemperatures.map((t) => (
          <option key={t} value={t}>
            {temperatures.includes(t) ? t : `(invalid) ${t}`}
          </option>
        ))}
      </select>
      <select
        value={`${localWeather.sky},${localWeather.wind}`}
        onChange={setSkyWindOptions}
      >
        {!(localWeather.sky && localWeather.wind) && (
          <option>Sky / Wind</option>
        )}
        {skyWindOptions.map(({ sky, wind }) => (
          <option key={`${sky},${wind}`} value={`${sky},${wind}`}>
            {sky} {wind}
          </option>
        ))}
      </select>
      <select
        value={localWeather.water && localWeather.water.join(",")}
        onChange={setWater}
      >
        {!localWeather.water && <option>Water</option>}
        {waterOptions.map((water) => (
          <option key={water.join(",")} value={water.join(",")}>
            {water.join(", ")}
          </option>
        ))}
      </select>
      <br />
      {localWeather.temperature}, {localWeather.sky}, {localWeather.wind},
      {localWeather.water && localWeather.water.join(", ")}
    </div>
  );
}
