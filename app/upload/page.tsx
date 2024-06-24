'use client'
import { useState } from 'react'
import axios from 'axios'

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      try {
        const response = await axios.post('/api/upload', formData)
        console.log('File uploaded:', response.data)
        // Handle success (e.g., show a success message)
      } catch (error) {
        console.error('Error uploading file:', error)
        // Handle error (e.g., show an error message)
      }
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default UploadPage
