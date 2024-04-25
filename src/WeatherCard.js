import React, { useState } from "react";
import { FaWind, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { FaThermometerQuarter } from "react-icons/fa";

function WeatherCard({ apiData, error }) {
  const {
    location,
    temperature,
    windSpeed,
    shortForecast,
    humidity,
    pressure,
  } = apiData;
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const toCelsius = (temp) => {
    const convertedValue = ((temp - 32) * 5) / 9;
    return convertedValue.toFixed(1);
  };

  return (
    <div className="text-center mt-10">
      {error ? (
        <div className="flex flex-col mt-12 gap-2 text-center">
          <img src="/error.png" alt="error" className="w-24 h-24 mx-auto" />
          <p className="text-lg text-white font-medium">No Data Found.</p>
        </div>
      ) : (
        <div className="bg-white/60 md:w-96 w-80 p-4 rounded-md mx-auto">
          <div className="border-b-2 border-gray-300 pb-1">
            <p className="text-xl font-semibold">{location}</p>
          </div>
          <div className="flex justify-center items-center my-5">
            {temperature > 77 ? (
              <img src="/sun.png" alt="sun" className="w-24 h-24" />
            ) : temperature > 59 ? (
              <img src="/rain.png" alt="rain" className="w-24 h-24" />
            ) : (
              <img src="/snowflake.png" alt="winter" className="w-24 h-24" />
            )}
          </div>

          <div className="flex gap-2 justify-center items-center font-semibold text-lg">
            <FaThermometerQuarter />
            <p className="font-semibold text-2xl">
              {isCelsius ? toCelsius(temperature) : temperature.toFixed(1)}{" "}
              {isCelsius ? "°C" : "°F"}
            </p>
            <button
              className="focus:outline-none text-2xl"
              onClick={toggleTemperatureUnit}
            >
              {isCelsius ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className="text-gray-800 mt-2 ">
            <div clas>
              <p>Wind: {windSpeed} m/s</p>
              <p>Humidity: {humidity}%</p>
            </div>
            <div>
              <p>Pressure: {pressure} hPa</p>
              <p>Forecast: {shortForecast}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
