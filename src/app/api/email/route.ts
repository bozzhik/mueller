import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received email data:', body)

    return NextResponse.json({message: 'Email sent successfully'}, {status: 200})
  } catch (error) {
    console.error('Error processing email request:', error)
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
  }
}
