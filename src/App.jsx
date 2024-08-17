import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "./index.css";

const { VITE_SOME_KEY, VITE_SOME_BASE } = import.meta.env;

const apiKey = VITE_SOME_KEY;
const baseUrl = VITE_SOME_BASE;

const api = {
  key: apiKey,
  base: baseUrl,
};

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [weather, setWeather] = useState("");
  const [search, setSearch] = useState("");
  const [weatherCondition, SetWeatherCondition] = useState("");
  let styles = "bg-gradient-to-b from-yellow-300 to-sky-600";

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        enqueueSnackbar("Please enter the correct city or district names.", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    SetWeatherCondition(weather?.weather?.[0]?.main);
  }, [searchPressed]);

  if (weatherCondition) {
    if (weatherCondition == "Sun") {
      styles = "bg-gradient-to-b from-yellow-300 to-cyan-400";
    }
    if (weatherCondition == "Clouds" || weatherCondition == "Clear") {
      const time = new Date();
      const hours = time.getHours();
      if (hours > 19 || hours < 7) {
        styles = "bg-gradient-to-b from-blue-400 to-neutral-300";
      } else {
        styles = "bg-gradient-to-b from-amber-400 to-blue-500";
      }
    }
    if (weatherCondition == "Snow") {
      styles = "bg-gradient-to-b from-gray-200 to-blue-400";
    }

    if (weatherCondition == "Rain" || weatherCondition == "Drizzle") {
      styles = "bg-gradient-to-t from-neutral-400 to-sky-900";
    }
    if (weatherCondition == "Thunderstorm") {
      styles = "bg-gradient-to-t from-gray-800 to-blue-900";
    }
  }
  const dayDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const time = new Date();
    const hours = time.getHours();
    let minutes = time.getMinutes();
    const month = time.getMonth();
    const day = time.getDay();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    const dateHours = +hours + ":" + minutes;

    const date = days[day] + " " + month + " " + dateHours;

    return date;
  };

  const Messsage = () => {
    const time = new Date();
    const hours = time.getHours();
    if (hours >= 19 || hours <= 7) {
      return "Good Night";
    } else if (hours >= 12 || hours <= 18) {
      return "Good Afternoon";
    } else {
      return "Good Morning";
    }
  };
  const temperatureConvert = () => {
    let x = weather ? weather.main.temp : "";
    let int_part = Math.trunc(x);
    return int_part;
  };
  const weatherImage = () => {
    const time = new Date();
    const hours = time.getHours();

    if (weatherCondition == "Snow") {
      const url = "./src/assets/snow.png";
      return url;
    }
    if (weatherCondition == "Clouds" || weatherCondition == "Clear") {
      if (hours > 19 || hours < 7) {
        const url = "./src/assets/clear.png";
        return url;
      } else {
        const url = "./src/assets/cloud_sun.png";
        return url;
      }
    }
    if (weatherCondition == "Sun") {
      const url = "./src/assets/sun.png";
      return url;
    }
    if (weatherCondition == "Rain" || weatherCondition == "Drizzle") {
      const url = "./src/assets/rain.png";
      return url;
    }
    if (weatherCondition == "Thunderstorm") {
      const url = "./src/assets/rain_thunderstorm.png";
      return url;
    }
  };
  const sunriseConvert = () => {
    let unix_timestamp = weather ? weather.sys.sunrise : "";
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    if (hours < 10) {
      hours = "0" + date.getHours();
    }
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ":" + minutes.slice(-2);

    return formattedTime;
  };
  const sunsetConvert = () => {
    let unix_timestamp = weather ? weather.sys.sunset : "";
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    if (hours < 10) {
      hours = "0" + date.getHours();
    }
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ":" + minutes.slice(-2);

    return formattedTime;
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPressed();
    }
  };
  return (
    <div className="container mx-auto items-center text-center justify-center flex flex-col h-full">
      <div
        className={`${styles} w-full md:w-10/12 lg:w-1/2 xl:w-2/5 2xl:w-1/3 p-2 min-h-screen`}
      >
        <div className="w-full ">
          <header>
            <div className="flex">
              <input
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                type="search"
                name="search"
                id="search"
                className="bg-transparent w-full h-10 rounded-full border cursor-pointer outline-none pl-4 pr-4 mt-2"
              />
              <button onClick={searchPressed} className="mt-1 ml-3 mr-1">
                <img src="./src/assets/search_btn.png" alt="" />
              </button>
            </div>
            <h2 className="text-white mb-1 mt-3 ml-5 text-2xl text-left font-bold">
              {Messsage()}
            </h2>
          </header>
          <main>
            <div className="flex-col flex justify-center items-center text-center text-white space-y-1">
              <img
                className="w-56 mt-2"
                src={weather ? weatherImage() : "./src/assets/sun_wind.png"}
                alt=""
              />
              <h1 className="text-5xl">{temperatureConvert() + "°C"}</h1>
              <h4>{weather ? weather.name : "Sun"}</h4>
              <h2>{weather ? weather.weather[0].main : "Istanbul"}</h2>
              <h4>{weather ? weather.weather[0].description : "Sun Wind"}</h4>
              <p>{dayDate()}</p>
            </div>
          </main>
          <div className="space-y-5 mt-4">
            <div className="grid grid-cols-4 text-white">
              <div className="col-span-2 flex justify-center">
                <img
                  className="w-12 h-12 mt-2 sm:w-16 sm:h-16 mr-3"
                  src="./src/assets/sun.png"
                  alt=""
                />
                <div>
                  <p className="mt-3 mb-1">Sunrise</p>
                  <p>{sunriseConvert()}</p>
                </div>
              </div>
              <div className="col-span-2 flex justify-center">
                <img
                  className="w-12 h-12 mt-2 sm:w-16 sm:h-16 mr-3"
                  src="./src/assets/sun.png"
                  alt=""
                />
                <div>
                  <p className="mt-3 mb-1 text-white">Sunset</p>
                  <p className="m-0 text-white">{sunsetConvert()}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 text-white">
              <div className="col-span-2 flex-col justify-center mt-2">
                <p>Feels Like</p>
                <p className="m-0 text-white mb-1">
                  {weather ? weather.main.feels_like + "°F" : "24 °F"}
                </p>
              </div>
              <div className="col-span-2 flex-col justify-center mt-2">
                <p>Humidity</p>
                <p className="m-0 text-white mb-1">
                  {weather ? weather.main.humidity + "%" : "64%"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 text-white">
              <div className="col-span-2 flex flex-col justify-center mt-2">
                <p>Precipitation</p>
                <p>87%</p>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <p>Wind Speed</p>
                <p>{weather ? weather.wind.speed + " Km/h" : "12.2 Km/h"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
