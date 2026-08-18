// app/api/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return new Response('Invalid confirmation token', { status: 400 })
  }

  try {
    // Find the subscriber with this token
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, confirmation_token, token_expires_at, is_confirmed')
      .eq('confirmation_token', token)
      .single()

    if (findError || !subscriber) {
      return new Response('Invalid or expired confirmation token', { 
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      })
    }

    // Check if token has expired
    const expiresAt = new Date(subscriber.token_expires_at)
    const now = new Date()

    if (expiresAt < now) {
      return new Response('Confirmation token has expired. Please subscribe again.', { 
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      })
    }

    // Check if already confirmed
    if (subscriber.is_confirmed) {
      return new Response('Email already confirmed!', { 
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      })
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
      return new Response('Failed to confirm subscription', { status: 500 })
    }

    // Return success HTML
    const LOGO_URL = 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_400/logo.webp'
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Subscription Confirmed - Pori Pori Serengeti</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              background-color: #f6f9fc;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border-radius: 12px;
              padding: 40px;
              max-width: 500px;
              width: 100%;
              text-align: center;
              box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            }
            .logo { max-width: 180px; height: auto; margin-bottom: 20px; }
            h1 { font-family: Georgia, serif; font-size: 28px; font-weight: 300; color: #2C2418; margin-bottom: 16px; }
            .checkmark { font-size: 64px; margin-bottom: 12px; }
            p { color: #5A4E3E; line-height: 1.6; margin-bottom: 12px; font-size: 16px; }
            .button {
              display: inline-block;
              background-color: #C4A56E;
              color: #ffffff;
              padding: 14px 40px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              font-size: 16px;
              margin-top: 8px;
              transition: background-color 0.3s ease;
            }
            .button:hover { background-color: #B8944F; }
            .divider { border: none; border-top: 1px solid #E8E0D8; margin: 30px 0 20px; }
            .footer { color: #8B7A64; font-size: 12px; line-height: 1.8; }
            .footer a { color: #C4A56E; text-decoration: underline; }
            @media only screen and (max-width: 480px) {
              .container { padding: 30px 20px; }
              .logo { max-width: 140px; }
              h1 { font-size: 24px; }
              .checkmark { font-size: 48px; }
              .button { padding: 12px 30px; font-size: 14px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${LOGO_URL}" alt="Pori Pori Serengeti" class="logo">
            <div class="checkmark">✅</div>
            <h1>Subscription Confirmed!</h1>
            <p>Thank you for subscribing to the Pori Pori Serengeti newsletter.</p>
            <p>You'll now receive exclusive offers, safari insights, and stories from the heart of the Serengeti.</p>
            <a href="${baseUrl}" class="button">Visit Our Website</a>
            <hr class="divider">
            <div class="footer">
              <p>Pori Pori Serengeti · Serengeti, Tanzania</p>
              <p>
                <a href="mailto:info@poriporilodgescamps.com">info@poriporilodgescamps.com</a>
                &nbsp;·&nbsp;
                <a href="tel:+255754430599">+255 754 430 599</a>
              </p>
              <p><a href="https://poriporiluxurylodgeandcamp.com">poriporiluxurylodgeandcamp.com</a></p>
              <p style="margin-top: 8px; color: #A0A0A0;">
                © ${new Date().getFullYear()} Pori Pori Serengeti — All rights reserved
              </p>
            </div>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )

  } catch (error) {
    console.error('Confirmation error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}