import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "../../weatherService";
import { FaTemperatureFull, FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={icon} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex items-center justify-center text-xl text-cyan-300">
          <p>{details}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureFull size={18} className="mr-3" />
            Feels Like:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FaDroplet size={18} className="mr-3" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FaWind size={18} className="mr-3" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        {/* <UilSun /> */}
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        {/* <UilSunset /> */}
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        {/* <UilSun /> */}
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${Math.round(temp_max)}°`}</span>
        </p>
        <p className="font-light">|</p>

        {/* <UilSun /> */}
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${Math.round(temp_min)}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
