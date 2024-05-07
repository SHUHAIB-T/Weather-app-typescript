import { useEffect, ChangeEvent, useState } from "react";
import { optionType, forecastType } from "../types/index.ts";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function useForcast() {
  const [city, setCity] = useState<optionType | null>(null);
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [forcast, setForcast] = useState<forecastType | null>(null);

  const getSearchOptions = async (term: string) => {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${term.trim()}&limit=5&appid=${API_KEY}`
    );
    setOptions(response.data);
  };
  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };
  const getForecast = async (data: optionType) => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${API_KEY}`
    );
    const resdata = response.data;
    if (resdata) {
      const forcastData = {
        ...resdata.city,
        list: resdata.list.slice(0, 16),
      };
      setForcast(forcastData);
    }
  };

  const onOptionsSelect = (options: optionType) => {
    setCity(options);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);
    if (value !== "") {
      getSearchOptions(value);
    }
  };
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);
  return {
    forcast,
    options,
    term,
    onOptionsSelect,
    onSubmit,
    onInputChange,
  };
}
