import { Weather } from "./options";

export function temperatureColor(weather: Weather | null) {
  if (!weather) return "lightgrey";

  switch (weather.temperature) {
    case "hot":
      return "red";
    case "warm":
      return "yellow";
    case "cool":
      return "green";
    case "freezing":
      return "aqua";
  }
}
