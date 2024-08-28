'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';

interface Locality {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
  deviceType: string;
}

interface Props {
  onSearch: (localityId: string, localityName: string) => void;
}

export default function SearchAutocomplete({ onSearch }: Props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Locality[]>([]);
  const localities = useSelector((state: RootState) => state.localities.localities);

  const getSuggestions = useCallback((value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : localities.filter(locality =>
          locality.localityName.toLowerCase().includes(inputValue)
        ).slice(0, 5);
  }, [localities]);

  useEffect(() => {
    setSuggestions(getSuggestions(input));
    console.log(input);
  }, [input, getSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLocality = localities.find(locality => 
      locality.localityName.toLowerCase() === input.toLowerCase()
    );
    if (selectedLocality) {
      onSearch(selectedLocality.localityId, selectedLocality.localityName);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-l-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
          placeholder="Search for a location"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
        >
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg z-10 overflow-hidden">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.localityId}
              className="px-4 py-2 text-black hover:bg-blue-100 cursor-pointer transition-all duration-150 ease-in-out"
              onClick={() => {
                setInput(suggestion.localityName);
                setSuggestions([]);
                onSearch(suggestion.localityId, suggestion.localityName);
              }}
            >
              {suggestion.localityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
