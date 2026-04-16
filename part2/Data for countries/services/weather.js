const apiKey = import.meta.env.VITE_SOME_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = async ({ latitude, longitude }) => {
  // żądanie pogody dla podanych współrzędnych
  if (!apiKey) return null;

  const response = await fetch(
    `${baseUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  );

  if (!response.ok) return null;

  return response.json();
};

export default getWeather;
