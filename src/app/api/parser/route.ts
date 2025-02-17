import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('Received data:', body)
    return new NextResponse(body, {status: 200})
  } catch (error) {
    console.error('Error processing request:', error)
    return new NextResponse('Internal Server Error', {status: 500})
  }
}
