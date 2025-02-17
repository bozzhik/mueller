import {NextRequest, NextResponse} from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!Array.isArray(body.urls)) {
      return new NextResponse('Invalid request body: expected an array of urls', {status: 400})
    }

    const links: string[] = body.urls

    const fetchPromises = links.map(async (link) => {
      try {
        const response = await axios.get(link)
        return Array.isArray(response.data.items) ? response.data.items : []
      } catch (error) {
        console.error(`Error fetching ${link}:`, error)
        return []
      }
    })

    const results = await Promise.all(fetchPromises)
    const allItems = results.flat()

    return new NextResponse(JSON.stringify(allItems), {status: 200})
  } catch (error) {
    console.error('Error processing request:', error)
    return new NextResponse('Internal Server Error', {status: 500})
  }
}
