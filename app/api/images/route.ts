/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images')
  try {
    const files = await fs.promises.readdir(imagesDirectory)
    const images = files.map(file => `/images/${file}`)
    return NextResponse.json(images, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
