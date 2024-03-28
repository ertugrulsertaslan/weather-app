import React, {useState,useEffect} from "react";
import "./index.css";

const api = {
    key:'78a20c7c02a5a80140afb2f77d317c76',
    base:"https://api.openweathermap.org/data/2.5/",
};

function App() {
const [weather, setWeather] = useState();
const [search, setSearch] = useState("");
let styles = "bg-gradient-to-r from-yellow-300 to-sky-600 ";
//
//
const searchPressed = () => {
  fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
  .then((res) => res.json() )
  .then((result) => {
    setWeather(result);
  })
}
if(weather){
  const weatherCondition = weather.weather[0].main;
  if(weatherCondition == "Sun"){ 
    styles = "bg-gradient-to-bl from-yellow-300 to-cyan-400";
  }
  if(weatherCondition == "Clouds" || weatherCondition == "Clear"){
    const time =  new Date();
    const hours = time.getHours();
    if(hours > 19 || hours < 7){
      styles = "bg-gradient-to-bl from-blue-400 to-neutral-300";
    }else{ 
      styles = "bg-gradient-to-bl from-amber-400 to-blue-500";
    }
  }
  if(weatherCondition == "Snow"){
    styles = "bg-gradient-to-bl from-gray-200 to-blue-400";
  }
  
  if(weatherCondition == "Rain" || weatherCondition == "Drizzle"){
    styles = "bg-gradient-to-bl from-gray-900 to-blue-900";        
  }
  if( weatherCondition == "Thunderstorm"){
    styles = "bg-gradient-to-bl from-amber-500 via-blue-900 to-blue-500";  
  }
}
const dayDate = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const time =  new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes()
  const month = time.getMonth();
  const day = time.getDay();
  const dateHours = + hours +":"+ minutes;
  const date = days[day] + " " + month + " " + dateHours;
  
  return (date);
}

const Messsage = () => {
  const time =  new Date();
  const hours = time.getHours();
  if(hours > 19 || hours < 7){
    return("Good Night");
  }else{
    return("Good Morning");
  }
}
const temperatureConvert = () => {
  let x = weather.main.temp;
  let int_part = Math.trunc(x); 
  return (int_part);
}
const weatherImage = () => {
  const time =  new Date();
  const hours = time.getHours();
  
  const weatherImage =  weather.weather[0].main;

  if( weatherImage == "Snow"){
    const url = "./src/assets/snow.png";
    return(url);
  }
  if( weatherImage == "Clouds" || weatherImage == "Clear"){
    if(hours > 19 || hours < 7){
      const url = "./src/assets/clear.png";
      return(url);
    }else{
      const url = "./src/assets/cloud_sun.png";
      return(url);
    }
  }
  if( weatherImage == "Sun"){
    const url = "./src/assets/sun.png";
    return(url);
  }
  if( weatherImage == "Rain" || weatherImage == "Drizzle"){
    const url = "./src/assets/rain.png";
    return(url);
  }
  if( weatherImage == "Thunderstorm"){
    const url = "./src/assets/rain_thunderstorm.png";
    return(url);
  }
}
const sunriseConvert = () => {

  let unix_timestamp = weather.sys.sunrise;

  let date = new Date(unix_timestamp * 1000);
  
  let hours = date.getHours();
  
  let minutes = "0" + date.getMinutes();
  
  let seconds = "0" + date.getSeconds();
  
  let formattedTime = hours + ':' + minutes.substr(-2);
  
  return (formattedTime);
}
const sunsetConvert = () => {
  let unix_timestamp = weather.sys.sunset;

  let date = new Date(unix_timestamp * 1000);
  
  let hours = date.getHours();
  
  let minutes = "0" + date.getMinutes();
  
  let seconds = "0" + date.getSeconds();
  
  let formattedTime = hours + ':' + minutes.substr(-2);
  
  return (formattedTime);
}
  return (
      <div className={`${styles} w-1/4 border-2 p-2`}>
        <header className="h-10">
          <div className="w-auto h-auto inline-block relative flex">
            <button onClick={searchPressed} className="mt-1 ml-3 mr-1"><img src="./src/assets/search_btn.png" alt="" /></button>
            <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" className="relative z-10 bg-transparent w-10 h-10 rounded-full border cursor-pointer outline-none
            pl-12
            focus:w-full focus:border-lime-300 focus:cursor-text focus:pl-16 focus:pr-4" />
          </div>
          <div className="mt-3 ml-4">
            <h2 className="m-0 text-white mb-1 text-2xl">{Messsage()}</h2>
          </div>
        </header>
          {typeof weather !== "undefined" ? (
          <div>
            <div className="text-center justify-center mt-3">
              <img className="w-3/5 h-auto ml-24" src={weatherImage()} alt=""/>
              <h2 className="m-0 text-white text-6xl mt-3 mb-1" >{temperatureConvert()+"°C"}</h2>
              <h4 className="m-0 text-white mb-1">{weather.name}</h4>
              <h2 className="m-0 text-white mb-1">{weather.weather[0].main}</h2>
              <h4 className="m-0 text-white mb-1">{weather.weather[0].description}</h4>
              <p className="m-0 text-white">{dayDate()}</p>
            </div>
            <div className="mt-10">
              <div className="flex mb-5">
                <div className="flex ml-3 ">
                  <div>
                    <img className="w-12 mr-3 ml-8" src="./src/assets/sun.png" alt="" />
                  </div>
                  <div>
                    <p className="mt-3 mb-1 text-white">Sunrise</p>
                    <p className="m-0 text-white">{sunriseConvert()}</p>
                  </div>
                </div>
                <div className="ml-32 flex">
                  <div>
                    <img className="w-12 mr-3" src="./src/assets/sun.png" alt="" />
                  </div>
                  <div>
                    <p className="mt-3 mb-1 text-white">Sunset</p>
                    <p className="m-0 text-white">{sunsetConvert()}</p>
                  </div>
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-20 mb-3 ml-14">
                  <p className="m-0 text-white">Feels Like</p>
                  <h4 className="m-0 text-white mb-1">{weather.main.feels_like + "°F"}</h4>
                </div>
                <div className="ml-32">
                  <div className="mb-5 ml-8">
                    <p className="m-0 text-white">Humidity</p>
                    <h4 className="m-0 text-white mb-1">{weather.main.humidity+"%"}</h4>
                  </div>
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-20 mb-3 ml-14">
                  <p className="m-0 text-white">Precipitation</p>
                  <h4 className="m-0 text-white mb-1">87%</h4>
                </div>
                <div className="ml-32">
                  <div className="mb-5 ml-8">
                    <p className="m-0 text-white">Wind Speed</p>
                    <h4 className="m-0 text-white mb-1">{weather.wind.speed + " Km/h"} </h4>
                  </div>
                </div>
              </div>   
            </div> 
          </div>
          ) : (
            <div>
            <div className=" text-center justify-center mt-3">
              <img className="w-3/5 h-auto ml-24" src="./src/assets/sun_wind.png" alt=""/>
              <h2 className="m-0 text-white text-6xl mt-3 mb-1" >°C</h2>
              <h4 className="m-0 text-white mb-1">THUNDERSTORM</h4>
              <p className="m-0 text-white">Friday 16 - 09.41am</p>
            </div>
            <div className="mt-10">
              <div className="flex mb-5">
                <div className="flex ml-3 ">
                  <div>
                    <img className="w-12 mr-3 ml-8" src="./src/assets/sun.png" alt="" />
                  </div>
                  <div>
                    <p className="mt-3 mb-1 text-white">Sunrise</p>
                    <p className="m-0 text-white">5.34am</p>
                  </div>
                </div>
                <div className="ml-32 flex">
                  <div>
                    <img className="w-12 mr-3" src="./src/assets/sun.png" alt="" />
                  </div>
                  <div>
                    <p className="mt-3 mb-1 text-white">Sunset</p>
                    <p className="m-0 text-white">18.38pm</p>
                  </div>
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-20 mb-3 ml-14">
                  <p className="m-0 text-white">Feels Like</p>
                  <h4 className="m-0 text-white mb-1">15°C</h4>
                </div>
                <div className="ml-32">
                  <div className="mb-5 ml-8">
                    <p className="m-0 text-white">Humidity</p>
                    <h4 className="m-0 text-white mb-1">87%</h4>
                  </div>
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-20 mb-3 ml-14">
                  <p className="m-0 text-white">Precipitation</p>
                  <h4 className="m-0 text-white mb-1">87%</h4>
                </div>
                <div className="ml-32">
                  <div className="mb-5 ml-8">
                    <p className="m-0 text-white">Wind Speed</p>
                    <h4 className="m-0 text-white mb-1">15 Km/h </h4>
                  </div>
                </div>
              </div>   
            </div> 
          </div>
          )}  
      </div>
  );
}

export default App