'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchAutocomplete from '../components/SearchAutocomplete'

export default function Home() {
  const router = useRouter()
  const [localityId, setLocalityId] = useState<string | null>(null);
  const [localityName, setLocalityName] = useState<string | null>(null);

  const handleSearch = (id: string, name: string) => {
    setLocalityId(id);
    setLocalityName(name);
    router.push(`/weather?id=${id}&name=${encodeURIComponent(name)}`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <img 
          src="https://cdnl.iconscout.com/lottie/premium/thumb/thunderstorm-rainy-cloud-5520374-4629333.gif" 
          alt="Weather" 
          className="mx-auto mb-6 w-48 sm:w-64 md:w-82" 
        />
        <SearchAutocomplete onSearch={handleSearch} />
      </div>
    </div>
  )
}
