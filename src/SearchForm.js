import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchForm({
  loading,
  setLoading,
  handleApiResponse,
  handleApiError,
}) {
  const [cityName, setCityName] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4e16d8878599c4ebf293b5945b5e55ad&units=imperial`
      ).then((response) => response.json());

      console.log(response, "response");

      handleApiResponse({
        location: response.name,
        temperature: response.main.temp,
        windSpeed: response.wind.speed,
        shortForecast: response.weather[0].main,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <form className="bg-white/20 md:w-96 w-80 flex flex-col justify-start p-4 rounded-md">
      <label
        className="block text-black text-sm font-semibold mb-2"
        htmlFor="cityName"
      >
        City Name
      </label>
      <div className="relative">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cityName"
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-1 mt-2 mr-2"
          onClick={formHandler}
          disabled={loading}
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
