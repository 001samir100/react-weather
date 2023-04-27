import "./App.css";
import srcImg from "./images/search.png";
import clearImg from "./images/clear.png";
import windImg from "./images/wind.png";
import humidityImg from "./images/humidity.png";
import cloudImg from "./images/clouds.png";
import rainImg from "./images/rain.png";
import drizzleImg from "./images/drizzle.png";
import mistImg from "./images/mist.png";
import snowImg from "./images/snow.png";
import hazeImg from "./images/haze.png";

import { useCallback, useEffect } from "react";
import { useState } from "react";

function App() {
  const apiKey = "4bfb944132b93e5127a664360dbcc3c9";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //kathmandu&appid=

  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState();
  const [error, setError] = useState();

  const [isOnline, setIsOnline] = useState(false);

  // when search button is clicked, below function will be invoked.
  const checkWeather = async (place) => {
    const response = await fetch(url + place + `&appid=${apiKey}`);
    if (response.status === 200) {
      const json = await response.json();
      setData(json);
      setWeather(data.weather[0].main);

      setIsLoading(false);

      console.log(data);
    } else if (response.status >= 400) {
      console.log("error occurred code with: " + response.status);
    } else {
      console.error("error occurred: " + response.text);
      setError(error);
      setIsLoading(true);
    }

    // await fetch(url + place + `&appid=${apiKey}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //     setWeather(data.weather[0].main);

    //     setIsLoading(false);

    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setError(error);
    //     setIsLoading(true);
    //   });
  };

  // set image according to weather
  const weatherImage = (weatherImgName = "Clear") => {
    console.log(`weather image : ${weatherImgName}`);
    switch (weatherImgName) {
      case "Clouds": {
        // return cloudImg;
        return <img src={cloudImg} alt="Clouds" />;
      }
      case "Winds": {
        // return windImg;
        return <img src={windImg} alt="Winds" />;
      }
      case "Clear": {
        // return weatherImg;
        return <img src={clearImg} alt="Clear" />;
      }
      case "Rain": {
        // return rainImg;
        return <img src={rainImg} alt="Rain" />;
      }
      case "Drizzle": {
        // return drizzleImg;
        return <img src={drizzleImg} alt="Drizzle" />;
      }
      case "Mist": {
        // return mistImg;
        return <img src={mistImg} alt="Mist" />;
      }
      case "Snow": {
        // return snowImg;
        return <img src={snowImg} alt="Snow" />;
      }
      case "Haze": {
        return <img src={hazeImg} alt="Snow" />;
      }
      default:
        return <img src={clearImg} alt="Clear" />;
    }
  };

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const checkInternetConnection = async () => {
    try {
      const response = await fetch("https://www.google.com");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(true);
    const handleOfflineStatus = () => setIsOnline(false);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      const intervalId = setInterval(async () => {
        const isConnected = await checkInternetConnection();
        setIsOnline(isConnected);
      }, 5000);

      return () => clearInterval(intervalId);
    } else {
      setIsOnline(true);
    }
  }, [isOnline]);

  if (error) {
    return (
      <div>
        <h2>Error occurred : ${error}</h2>
      </div>
    );
  } else {
    return (
      <>
        <div className="App">
          <div className="card">
            {/* for search bar */}
            <div className="search">
              <input
                placeholder="Search place"
                type="text"
                spellCheck="false"
                value={input}
                onChange={handleInputChange}
              />
              <button
                onClick={() => {
                  checkWeather(input);
                }}
              >
                <img src={srcImg} alt="Search button" />
              </button>
            </div>

            {/* online status indicator */}
            <div className="flex">
              {isOnline ? (
                <p className="statusText">Online</p>
              ) : (
                <p className="statusText">Offline</p>
              )}
            </div>

            {/* for weather details */}
            {isLoading ? (
              <></>
            ) : (
              <>
                <div className="details">
                  <div className="col">
                    <h2>Min</h2>
                    <h3>{data.main.temp_min}&deg;C</h3>
                  </div>
                  <div className="col">
                    {weatherImage(weather)}
                    <h1>{data.main.temp} &deg;C</h1>
                    <h2>{data.name}</h2>
                  </div>
                  <div className="col">
                    <h2>Max</h2>
                    <h3>{data.main.temp_max}&deg;C</h3>
                  </div>
                </div>
                <div className="detail">
                  <div className="row">
                    <div className="flex">
                      <img src={humidityImg} alt="" style={{ width: "80px" }} />
                      <div className="col">
                        <h2>{data.main.humidity}%</h2>
                        <h3>Humidity</h3>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="flex">
                      <img src={windImg} alt="" style={{ width: "80px" }} />
                      <div className="col">
                        <h2>{data.wind.speed} km/h</h2>
                        <h3>wind</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
