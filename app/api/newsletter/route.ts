// app/api/newsletter/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  // Initialize Resend INSIDE the handler
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    const { email } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, is_confirmed')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.is_confirmed) {
        return NextResponse.json(
          { error: 'You are already subscribed!' },
          { status: 409 }
        )
      } else {
        return NextResponse.json(
          { error: 'Please check your email for the confirmation link.' },
          { status: 409 }
        )
      }
    }

    // Generate a confirmation token
    const confirmationToken = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    // Insert subscriber into database
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          confirmation_token: confirmationToken,
          token_expires_at: expiresAt.toISOString(),
          is_confirmed: false,
          subscribed_at: new Date().toISOString(),
        },
      ])

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    // Build confirmation URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const confirmationUrl = `${baseUrl}/api/newsletter/confirm?token=${confirmationToken}`

    // Optimized logo URL with Cloudinary transformations
    const LOGO_URL = 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_400/logo.webp'

    // Send confirmation email
    const { error: emailError } = await resend.emails.send({
      from: 'Pori Pori Serengeti <newsletter@poriporiluxurylodgeandcamp.com>',
      to: [email],
      subject: 'Confirm your subscription to Pori Pori Serengeti',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirm Subscription</title>
            <style>
              @media only screen and (max-width: 480px) {
                .container { padding: 10px !important; }
                .logo { max-width: 140px !important; }
              }
            </style>
          </head>
          <body style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f6f9fc; color: #2C2418;">
            
            <!-- Main Container -->
            <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); margin: 0 auto;">
              
              <!-- Header with Logo -->
              <div style="background-color: #1A1510; padding: 40px 30px 30px; text-align: center;">
                <div style="margin: 0 auto 20px;">
                  <img src="${LOGO_URL}" alt="Pori Pori Serengeti" style="max-width: 200px; height: auto; display: block; margin: 0 auto;">
                </div>
                <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: 300; color: #D4BC8D; margin: 0 0 10px; letter-spacing: 1px;">
                  Confirm Your Subscription
                </h1>
                <p style="font-size: 14px; font-weight: 300; color: #A0A0A0; margin: 0;">
                  Join our community of safari enthusiasts
                </p>
              </div>

              <!-- Content -->
              <div style="padding: 30px;">
                
                <!-- Message -->
                <div style="margin-bottom: 30px;">
                  <p style="font-size: 16px; line-height: 1.6; color: #5A4E3E; margin: 0 0 16px;">
                    Thank you for subscribing to the Pori Pori Serengeti newsletter.
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #5A4E3E; margin: 0;">
                    You'll receive exclusive offers, safari insights, and stories from the heart of the Serengeti.
                  </p>
                </div>

                <!-- Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${confirmationUrl}" style="display: inline-block; background-color: #C4A56E; color: #ffffff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
                    Confirm Subscription
                  </a>
                </div>

                <!-- Note -->
                <div style="background-color: #FBF8F4; padding: 16px; border-radius: 8px; text-align: center;">
                  <p style="font-size: 14px; color: #8B7A64; margin: 0;">
                    If you didn't subscribe to our newsletter, you can safely ignore this email.
                  </p>
                </div>

              </div>

              <!-- Footer -->
              <div style="padding: 30px 30px 20px; text-align: center; background-color: #FBF8F4; border-top: 1px solid #E8E0D8;">
                <img src="${LOGO_URL}" alt="Pori Pori Serengeti" style="max-width: 120px; height: auto; margin: 0 auto 12px; display: block;">
                
                <p style="margin: 4px 0; font-size: 12px; color: #8B7A64; font-weight: 300;">
                  Serengeti, Tanzania
                </p>
                
                <p style="margin: 4px 0; font-size: 12px; color: #8B7A64; font-weight: 300;">
                  <a href="tel:+255754430599" style="color: #C4A56E; text-decoration: underline;">+255 754 430 599</a>
                  &nbsp;·&nbsp;
                  <a href="mailto:info@poriporilodgescamps.com" style="color: #C4A56E; text-decoration: underline;">info@poriporilodgescamps.com</a>
                </p>
                
                <p style="margin: 4px 0; font-size: 12px; color: #8B7A64; font-weight: 300;">
                  <a href="https://poriporiluxurylodgeandcamp.com" style="color: #C4A56E; text-decoration: underline;">poriporiluxurylodgeandcamp.com</a>
                </p>
                
                <p style="margin: 8px 0 0; font-size: 11px; color: #A0A0A0; font-weight: 300;">
                  © ${new Date().getFullYear()} Pori Pori Serengeti — All rights reserved
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json(
      { message: 'Subscription successful! Check your email to confirm.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}