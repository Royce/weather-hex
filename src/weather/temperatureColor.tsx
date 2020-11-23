import { Weather } from "./options";

export function temperatureColor({ temperature }: Partial<Weather>) {
  switch (temperature) {
    case "hot":
      return "red";
    case "warm":
      return "yellow";
    case "cool":
      return "green";
    case "freezing":
      return "aqua";
    default:
      return "lightgrey";
  }
}
