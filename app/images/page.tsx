'use client'
import { useQuery } from 'react-query'
import axios from 'axios'

const ImagesPage = () => {
  const {
    data: images,
    isLoading,
    error,
  } = useQuery('images', async () => {
    const response = await axios.get('/api/images')
    return response.data
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching images: {(error as Error).message}</div>

  return (
    <div>
      {images.map((image: string) => (
        <img
          key={image}
          src={image}
          alt='Uploaded'
          style={{ width: '100px', height: 'auto' }}
        />
      ))}
      {/* Pagination UI */}
    </div>
  )
}

export default ImagesPage
