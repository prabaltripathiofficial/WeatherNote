'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherData } from '../../lib/redux/weatherSlice'
import WeatherDisplay from '../../components/WeatherDisplay'
import { RootState } from '../../lib/redux/store'

export default function WeatherPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const localityId = searchParams.get('id')
  const localityName = searchParams.get('name')

  useEffect(() => {
    if (localityId) {
      dispatch(fetchWeatherData(localityId) as any)
    }
  }, [localityId, dispatch])

  const handleBackToSearch = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <WeatherDisplay
        localityName={localityName || 'Unknown Location'} // Default to 'Unknown Location' if no name
        onBackToSearch={handleBackToSearch}
      />
    </div>
  )
}
