// app/api/newsletter/confirm/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// POST handler - called from the confirmation page
export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 400 }
      )
    }

    // Find the subscriber with this token
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, confirmation_token, token_expires_at, is_confirmed')
      .eq('confirmation_token', token)
      .single()

    if (findError || !subscriber) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token' },
        { status: 400 }
      )
    }

    // Check if token has expired
    const expiresAt = new Date(subscriber.token_expires_at)
    const now = new Date()

    if (expiresAt < now) {
      return NextResponse.json(
        { error: 'Confirmation token has expired. Please subscribe again.' },
        { status: 400 }
      )
    }

    // Check if already confirmed
    if (subscriber.is_confirmed) {
      return NextResponse.json(
        { message: 'Email already confirmed!' },
        { status: 200 }
      )
    }

    // Update subscriber to confirmed
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_confirmed: true,
        confirmed_at: new Date().toISOString(),
        confirmation_token: null,
        token_expires_at: null,
      })
      .eq('id', subscriber.id)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to confirm subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Subscription confirmed successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Confirmation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET handler - redirects to the confirmation page (for backward compatibility)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return new Response(
      'Invalid confirmation token. Please check your email and try again.',
      { 
        status: 400,
        headers: {
          'Content-Type': 'text/html',
        }
      }
    )
  }
  
  // Redirect to the confirmation page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  // If redirect fails, fallback to HTML response
  try {
    return Response.redirect(`${baseUrl}/confirm?token=${token}`)
  } catch (error) {
    // Fallback: Return a simple HTML page with a link
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Confirm Your Subscription</title>
          <meta http-equiv="refresh" content="0; url=${baseUrl}/confirm?token=${token}">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            a { color: #C4A56E; }
          </style>
        </head>
        <body>
          <h1>Redirecting to confirmation page...</h1>
          <p>If you are not redirected, <a href="${baseUrl}/confirm?token=${token}">click here</a>.</p>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        }
      }
    )
  }
}