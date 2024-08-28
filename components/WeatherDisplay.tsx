'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';

interface Props {
  localityName: string;
  onBackToSearch: () => void;
}

export default function WeatherDisplay({ localityName, onBackToSearch }: Props) {
  const { weatherData, loading, error } = useSelector((state: RootState) => state.weather);

  if (loading) {
    return <div className="text-center text-lg text-black">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-black">Error: {error}</div>;
  }

  if (!weatherData || !weatherData.locality_weather_data) {
    return <div className="text-center text-lg text-black">No weather data available. Please try another search.</div>;
  }

  const { temperature, humidity, wind_speed, wind_direction, rain_intensity, rain_accumulation } = weatherData.locality_weather_data;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">{localityName}</h2>
      <p className="text-5xl font-semibold mb-4 text-center">{temperature != null ? `${temperature}°C` : 'N/A'}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-lg font-medium">Humidity:</p>
          <p className="text-xl">{humidity != null ? `${humidity}%` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Wind Speed:</p>
          <p className="text-xl">{wind_speed != null ? `${wind_speed} m/s` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Wind Direction:</p>
          <p className="text-xl">{wind_direction != null ? `${wind_direction}°` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Rain Intensity:</p>
          <p className="text-xl">{rain_intensity != null ? `${rain_intensity} mm/h` : 'N/A'}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Rain Accumulation:</p>
          <p className="text-xl">{rain_accumulation != null ? `${rain_accumulation} mm` : 'N/A'}</p>
        </div>
      </div>
      <button
        onClick={onBackToSearch}
        className="w-full bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
      >
        Back to Search
      </button>
    </div>
  );
}
