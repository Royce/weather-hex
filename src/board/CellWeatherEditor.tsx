import React from "react";
import _ from "lodash/fp";
import { useRecoilState, useRecoilValue } from "recoil";

import { CubeCoord, neighbors } from "../hex/coords";
import Icon from "../weather/Icon";
import Picker from "../weather/Picker";

import { selectedState } from "./selectedState";
import { cellState } from "./cellState";
import { primaries } from "./cellCoords";
import { mixes } from "../weather/mix";
import { Weather } from "../weather/options";
import { temperatureColor } from "../weather/temperatureColor";

export function CellWeatherEditor() {
  const selected = useRecoilValue(selectedState);

  return (
    <React.Fragment>
      {selected &&
        (_.some((c) => _.isEqual(c, selected), primaries) ? (
          <PickerForSelected coord={selected} />
        ) : (
          <BlendResultsView coord={selected} />
        ))}
    </React.Fragment>
  );
}

function PickerForSelected({ coord }: { coord: CubeCoord }) {
  const [weather, setWeather] = useRecoilState(cellState(coord));

  return <Picker weather={weather} setWeather={setWeather} />;
}

function BlendResultsView({ coord }: { coord: CubeCoord }) {
  const [left, right] = _.intersectionWith(
    _.isEqual,
    neighbors(coord),
    primaries
  ) as [CubeCoord, CubeCoord];

  const weather: [
    left: Weather | null,
    right: Weather | null,
    middle: Weather | null
  ] = [
    useRecoilValue(cellState(left)),
    useRecoilValue(cellState(right)),
    useRecoilValue(cellState(coord)),
  ];

  const alternatives =
    weather[0] && weather[1] ? mixes(weather[0], weather[1]) : [];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconWithBackground weather={weather[0]} /> +
        <IconWithBackground weather={weather[1]} /> =
        <IconWithBackground weather={weather[2]} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "lightgrey",
        }}
      >
        ALTERNATIVES:
        {alternatives.map((w) => (
          <IconWithBackground weather={w} />
        ))}
      </div>
    </div>
  );
}

function IconWithBackground({ weather }: { weather: Weather | null }) {
  return (
    <div
      style={{
        backgroundColor: temperatureColor(weather),
        border: "1px solid black",
        margin: 5,
        opacity: 0.7,
      }}
    >
      <Icon weather={weather} size={40} />
    </div>
  );
}
