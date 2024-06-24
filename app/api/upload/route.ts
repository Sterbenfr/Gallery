/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405, headers: { Allow: 'POST' } },
    )
  }

  try {
    // Get the form data from the request
    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) {
      throw new Error('No file uploaded')
    }

    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${uuidv4()}-${Date.now()}${path.extname(file.name)}`

    // Define the file path
    const filePath = path.join(process.cwd(), 'public/images', fileName)

    // Save the file
    await fs.writeFile(filePath, buffer)

    // Return the file path
    return NextResponse.json(
      { filePath: `/images/${fileName}` },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
