import { useState } from "react";
import { FaWind } from "react-icons/fa";
import { FaThermometerQuarter } from "react-icons/fa";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const renderAppData = () => {
    return error ? (
      <div className=" flex flex-col mt-12 gap-2">
        <img src="/error.png" alt="error" className="w-[120px] h-[120px]" />
        <p className="text-lg text-white font-medium">No Data Found.</p>
      </div>
    ) : (
      apiData.length !== 0 && (
        <div className="text-center flex flex-col  mt-10 ">
          <div className="bg-white w-96 p-4 rounded-md ">
            <div className="border-b-2 border-gray-300 pb-1">
              <p className="text-xl font-semibold">{`${location.city}, ${location.state}`}</p>
            </div>
            <div className="flex justify-center items-center my-5">
              {apiData.temperature > 77 ? (
                <img src="/sun.png" alt="sun" className="w-[120px] h-[120px]" />
              ) : apiData.temperature > 59 ? (
                <img
                  src="/rain.png"
                  alt="rain"
                  className="w-[120px] h-[120px]"
                />
              ) : (
                <img
                  src="/snowflake.png"
                  alt="winter"
                  className="w-[120px] h-[120px]"
                />
              )}
            </div>

            <div className="flex gap-1 justify-center items-center font-semibold text-lg">
              <FaThermometerQuarter />
              <p className="font-semibold text-2xl">
                {apiData?.temperature}°F / {toCelsius(apiData.temperature)}°C
              </p>
            </div>
            <div className="flex justify-between mt-2 text-gray-800">
              <div className="flex justify-center items-center gap-2">
                <FaWind />
                <p>{apiData.windSpeed}</p>
              </div>
              <div className="flex justify-center items-center gap-0">
                <p>{apiData.shortForecast}</p>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  const formHandler = async (e) => {
    e.preventDefault();
    // API CALL
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weather.gov/points/${latitude},${longitude}`
      ).then((response) => response.json());

      setLocation(response.properties.relativeLocation.properties);

      const forecast = await fetch(response.properties.forecast).then((res) =>
        res.json()
      );

      setApiData(
        forecast.properties.periods
          .filter(
            (timePeriodObject) => timePeriodObject.name === "Wednesday Night"
          )
          .pop()
      );

      setLoading(false);
      setError(false);
    } catch (error) {
      console.log("There was an error", error);
      setError(true);
      setLoading(false);
    }
  };
  console.log(apiData);
  const toCelsius = (temp) => {
    const convertedValue = (5 / 9) * (temp - 32);
    return convertedValue.toFixed(2);
  };

  return (
    <div className="bg-gray-800 h-screen flex py-8 flex-col items-center ">
      <h1 className="font-semibold text-2xl text-white mb-5">
        USA Weather Forecast
      </h1>
      <div className="bg-white w-96 p-4 rounded-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="Latitude"
          >
            Latitude
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Latitude"
            type="text"
            placeholder="XX.YYYY"
            onChange={(e) => setLatitude(e.target.value)}
          ></input>
          <label
            class="block text-gray-700 text-sm font-bold mt-3"
            for="Longitude"
          >
            Longitude
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Longitude"
            type="text"
            placeholder="-XX.YYYY"
            onChange={(e) => setLongitude(e.target.value)}
          ></input>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
            onClick={formHandler}
          >
            Get Weather
          </button>
        </form>
      </div>

      {loading ? (
        <div className="grid place-items-center h-full">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
            alt="..."
            className="w-14 mx-auto mb-2 animate-spin"
          />
        </div>
      ) : (
        renderAppData()
      )}
    </div>
  );
}

export default App;
