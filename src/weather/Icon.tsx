import React from "react";
import * as wi from "react-icons/wi";
import { BsFillQuestionDiamondFill } from "react-icons/bs";

import { Weather } from "./options";
import {
  WiCloudShowerWind,
  WiDayCloudShowerWind,
  WiLightning,
  WiCloudLightningGusty,
  WiDayFog,
  WiCloudHailGusty,
  WiDayCloudHailGusty,
  WiCloudRainWind,
  WiDayCloudRainWind,
  WiCloudRainGusty,
  WiDayCloudRainGusty,
  WiThunderstormGusty,
} from "./CustomIcons";

type IconProps = {
  weather: Weather | null;
  size: number;
};
export default function Icon({ weather, size }: IconProps) {
  if (!weather) return <BsFillQuestionDiamondFill size={size} />;

  if (weather.water.length === 1 && weather.water[0] === "dry") {
    if (weather.sky === "clear") {
      if (weather.wind === "calm") return <wi.WiDaySunny size={size} />;
      if (weather.wind === "breeze") return <wi.WiDayLightWind size={size} />;
      if (weather.wind === "gale") return <wi.WiDayWindy size={size} />;
    }
    if (weather.sky === "light clouds") {
      if (weather.wind === "calm") return <wi.WiDaySunnyOvercast size={size} />;
      if (weather.wind === "breeze") return <wi.WiDayCloudyWindy size={size} />;
      if (weather.wind === "gale") return <wi.WiDayCloudyGusts size={size} />;
    }
    if (weather.sky === "overcast") {
      if (weather.wind === "calm") return <wi.WiCloudy size={size} />;
      if (weather.wind === "breeze") return <wi.WiCloudyWindy size={size} />;
      if (weather.wind === "gale") return <wi.WiCloudyGusts size={size} />;
    }
  }

  if (weather.water.length === 1 && weather.water[0] === "fog") {
    if (weather.wind === "calm") {
      if (weather.sky === "clear") return <WiDayFog size={size} />;
      if (weather.wind === "calm") return <wi.WiDayFog size={size} />;
      if (weather.wind === "calm") return <wi.WiFog size={size} />;
    }
  }

  if (weather.water.length === 1 && weather.water[0] === "light rain") {
    if (weather.sky === "light clouds") {
      if (weather.wind === "calm") return <wi.WiDayShowers size={size} />;
      if (weather.wind === "breeze")
        return <WiDayCloudShowerWind size={size} />;
    }
    if (weather.sky === "overcast") {
      if (weather.wind === "calm") return <wi.WiShowers size={size} />;
      if (weather.wind === "breeze") return <WiCloudShowerWind size={size} />;
    }
  }

  if (weather.water.length === 1 && weather.water[0] === "heavy rain") {
    if (weather.sky === "light clouds") {
      if (weather.wind === "calm") return <wi.WiDayRain size={size} />;
      if (weather.wind === "breeze") return <WiDayCloudRainWind size={size} />;
      if (weather.wind === "gale") return <WiDayCloudRainGusty size={size} />;
    }
    if (weather.sky === "overcast") {
      if (weather.wind === "calm") return <wi.WiRain size={size} />;
      if (weather.wind === "breeze") return <WiCloudRainWind size={size} />;
      if (weather.wind === "gale") return <WiCloudRainGusty size={size} />;
    }
  }

  if (weather.water.length === 1 && weather.water[0] === "hail") {
    if (weather.sky === "light clouds") {
      if (weather.wind === "calm") return <wi.WiDayHail size={size} />;
      if (weather.wind === "breeze") return <wi.WiDayRainWind size={size} />;
      if (weather.wind === "gale") return <WiDayCloudHailGusty size={size} />;
    }
    if (weather.sky === "overcast") {
      if (weather.wind === "calm") return <wi.WiHail size={size} />;
      if (weather.wind === "breeze") return <wi.WiRainWind size={size} />;
      if (weather.wind === "gale") return <WiCloudHailGusty size={size} />;
    }
  }

  if (weather.water.length === 1 && weather.water[0] === "heavy snowfall") {
    if (weather.wind === "breeze") {
      if (weather.sky === "light clouds") return <wi.WiDaySleet size={size} />;
      if (weather.sky === "overcast") return <wi.WiSleet size={size} />;
    }
    if (weather.wind === "gale") {
      if (weather.sky === "overcast") return <wi.WiSandstorm size={size} />;
    }
  }

  if (weather.water.length === 1 && weather.water[0] === "light snowfall") {
    if (weather.wind === "calm") {
      if (weather.sky === "light clouds") return <wi.WiDaySnow size={size} />;
      if (weather.sky === "overcast") return <wi.WiSnow size={size} />;
    }
    if (weather.wind === "breeze") {
      if (weather.sky === "light clouds")
        return <wi.WiDaySnowWind size={size} />;
      if (weather.sky === "overcast") return <wi.WiSnowWind size={size} />;
    }
  }

  if (weather.water.includes("lightning") && weather.sky === "overcast") {
    if (weather.water.length === 1) {
      if (weather.wind === "breeze") return <WiLightning size={size} />;
      if (weather.wind === "gale") return <WiCloudLightningGusty size={size} />;
    } else {
      if (weather.water.includes("light rain")) {
        if (weather.wind === "breeze") return <wi.WiStormShowers size={size} />;
      }
      if (weather.water.includes("heavy rain")) {
        if (weather.wind === "breeze") return <wi.WiThunderstorm size={size} />;
        if (weather.wind === "gale") return <WiThunderstormGusty size={size} />;
      }
    }
  }

  return <BsFillQuestionDiamondFill size={size} />;
}
