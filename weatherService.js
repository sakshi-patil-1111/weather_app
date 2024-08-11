import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    timezone,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    timezone,
    country,
    sunrise,
    sunset,
    details,
    icon: iconUrlFromCode(icon),
    speed,
    formattedLocalTime: formatToLocalTime(dt, timezone),
  };
};

// Function to format forecast weather data
const formatForecastWeather = (timezone, data) => {
  const formattedDaily = data.slice(-6, -1).map((d) => ({
    title: formatToLocalTime(d.dt, timezone, "ccc"),
    temp: d.main.temp,
    icon: d.weather[0].icon,
  }));

  const formattedHourly = data.slice(0, 5).map((h) => ({
    title: formatToLocalTime(h.dt, timezone, "hh:mm a"),
    temp: h.main.temp,
    icon: h.weather[0].icon,
  }));

  return { timezone, daily: formattedDaily, hourly: formattedHourly };
};

// Function to get and format weather data (current and forecast)
const getFormattedWeatherData = async (searchParams) => {
  try {
    const currentWeatherData = await getWeatherData("weather", searchParams);

    const formattedCurrentWeather = formatCurrentWeather(currentWeatherData);

    const { lat, lon } = formattedCurrentWeather;

    const forecastWeatherData = await getWeatherData("forecast", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    });

    const { timezone } = formattedCurrentWeather;
    const formattedForecastWeather = formatForecastWeather(
      timezone,
      forecastWeatherData.list
    );

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
