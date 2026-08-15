import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Call Supabase Edge Function
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          adults: data.adults || 1,
          children: data.children || 0,
          specialRequests: data.specialRequests || 'None'
        })
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Edge Function Error:', result)
      return NextResponse.json(
        { error: result.error || 'Failed to send request' },
        { status: response.status }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request sent successfully!' 
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}