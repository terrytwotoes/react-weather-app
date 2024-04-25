import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import WeatherCard from "./WeatherCard";

function App() {
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cityImage, setCityImage] = useState(null);
  const [fetchImage, setFetchImage] = useState(false);

  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=city&orientation=landscape&fit=clip&w=1920&h=1080`,
          {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCityImage(data.urls.regular);
        }
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    if (fetchImage) {
      fetchBackgroundImage();
      setFetchImage(false);
    }
  }, [fetchImage]);

  console.log(apiData, "apiData");

  const handleApiResponse = (data) => {
    setApiData(data);
    setLoading(false);
    setError(false);
    setFetchImage(true);
  };

  const handleApiError = () => {
    setError(true);

    setLoading(false);
    setFetchImage(true);
  };

  return (
    <div
      className="text-center  bg-gray-800 h-screen flex py-8 flex-col items-center"
      style={{
        backgroundImage: `url(${cityImage || ""})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex gap-2">
        <img src="/disaster.png" alt="logo" className="h-10 w-10" />
        <h1 className="font-semibold text-2xl text-white mb-5">
          City Weather Forecast
        </h1>
      </div>
      <SearchForm
        loading={loading}
        setLoading={setLoading}
        handleApiResponse={handleApiResponse}
        handleApiError={handleApiError}
        setFetchImage={setFetchImage}
      />
      {!loading && !error && Object.keys(apiData).length > 0 && (
        <WeatherCard apiData={apiData} />
      )}
    </div>
  );
}

export default App;
