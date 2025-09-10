import { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";

export default function Weather() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("Bekasi");
  const [data, setData] = useState(null);

  const bgImages = {
    Clear: "/cerah.jpg",
    Rain: "/hujan.jpg",
    Clouds: "/berawan.jpg",
    Thunderstorm: "/badai.jpg",
    Snow: "/snow.jpg",
    Mist: "/kabut.jpg",
    Haze: "/kabut.jpg",
    Fog: "/kabut.jpg",
  };

  const weatherIcons = {
    Clear: <WiDaySunny size={70} className="mx-auto text-yellow-300" />,
    Rain: <WiRain size={70} className="mx-auto text-blue-400" />,
    Clouds: <WiCloudy size={70} className="mx-auto text-gray-300" />,
    Thunderstorm: (
      <WiThunderstorm size={70} className="mx-auto text-purple-400" />
    ),
    Snow: <WiSnow size={70} className="mx-auto text-white" />,
    Mist: <WiFog size={70} className="mx-auto text-gray-400" />,
    Haze: <WiFog size={70} className="mx-auto text-gray-400" />,
    Fog: <WiFog size={70} className="mx-auto text-gray-400" />,
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
      );
      setData(response.data);
      console.log(response.data.weather[0].main);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const weatherMain = data?.weather?.[0]?.main;
  const bgImage = bgImages[weatherMain] || "/1.jpg";
  const weatherIcon = weatherIcons[weatherMain];

  return (
    <main
      className="min-h-screen flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="w-full max-w-md min-h-[550px] bg-gray-700/50 rounded-3xl shadow-xl text-white p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 bg-[#2e2e2e] p-2 rounded-lg">
          <img src="/search.png" alt="Search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search City"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 px-3 py-1 rounded-lg text-sm"
          >
            Cari
          </button>
        </div>

        <div className="text-center space-y-2">
          {weatherIcon}
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {data?.main?.temp}°C
          </div>
          <div className="text-xl text-gray-300">
            {data?.name}, {data?.sys?.country}
          </div>
          <div className="text-sm text-gray-300">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="text-sm text-gray-400">
            {data?.weather?.[0]?.description}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-[#2e2e2e]/90 rounded-lg p-3 flex items-center gap-2">
              <WiThermometer size={24} /> Feels like: {data?.main?.feels_like}°C
            </div>
            <div className="bg-[#2e2e2e]/90 rounded-lg p-3 flex items-center gap-2">
              <WiHumidity size={24} /> Humidity: {data?.main?.humidity}%
            </div>
            <div className="bg-[#2e2e2e]/90 rounded-lg p-3 flex items-center gap-2">
              <WiStrongWind size={24} /> Wind: {data?.wind?.speed} m/s
            </div>
            <div className="bg-[#2e2e2e]/90 rounded-lg p-3 flex items-center gap-2">
              <WiBarometer size={24} /> Pressure: {data?.main?.pressure} hPa
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
