import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import './global.css';
export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null) as any;
  const [loading, setLoading] = useState(false);

  const API_KEY = 'YOUR_API_KEY';

  const getWeather = async () => {
    if (!city.trim()) return alert('Please enter a city name!');

    try {
      setLoading(true);
      setWeather(null);

      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod !== 200) {
        alert('City not found!');
        setLoading(false);
        return;
      }

      setWeather(data);
      setLoading(false);
    } catch (err) {
      alert('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <View className=" flex-1 bg-blue-600 px-6 pt-20">
      <StatusBar style="light" />

      {/* Title */}
      <Text className="text-center text-3xl font-bold text-red-500">Weather App</Text>

      {/* Search */}
      <View className="mt-10">
        <TextInput
          placeholder="Enter city name"
          placeholderTextColor="#eee"
          className="rounded-xl bg-white/20 px-4 py-3 text-lg text-white"
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity className="mt-4 rounded-xl bg-white py-3" onPress={getWeather}>
          <Text className="text-center text-lg font-semibold text-blue-600">Get Weather</Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {loading && (
        <View className="mt-10">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Weather Output */}
      {weather && (
        <View className="mt-16 items-center">
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
            }}
            className="h-36 w-36"
          />

          <Text className="mt-2 text-6xl font-bold text-white">{weather.main.temp}°C</Text>

          <Text className="mt-1 text-xl capitalize text-white">
            {weather.weather[0].description}
          </Text>

          <Text className="mt-1 text-lg text-white opacity-80">
            {weather.name}, {weather.sys.country}
          </Text>

          {/* Details */}
          <View className="mt-10 w-full rounded-2xl bg-white/20 px-4 py-6">
            <View className="mb-4 flex-row justify-between">
              <Text className="text-lg text-white">Humidity</Text>
              <Text className="text-lg font-semibold text-white">{weather.main.humidity}%</Text>
            </View>

            <View className="mb-4 flex-row justify-between">
              <Text className="text-lg text-white">Wind Speed</Text>
              <Text className="text-lg font-semibold text-white">{weather.wind.speed} m/s</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-lg text-white">Feels Like</Text>
              <Text className="text-lg font-semibold text-white">{weather.main.feels_like}°C</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
