// app/api/booking/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { BookingConfirmation } from '@/emails/BookingConfirmation'
import { SafariBookingConfirmation } from '@/emails/SafariBookingConfirmation'  // ← Capital S

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    const body = await request.json()
    
    const {
      formType,
      fullName,
      email,
      phone,
      countryCode,
      country,
      checkIn,
      checkOut,
      roomTypes,
      adults,
      children6to11,
      childrenUnder6,
      specialRequests,
      includeSafari,
      safariDescription,
      safariName,
      postTitle,
    } = body

    // Validate required fields
    if (!fullName || !email || !checkIn || !checkOut || !roomTypes || roomTypes.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine which email template to use based on form type
    let adminEmailSubject = ''
    let adminEmailComponent = null

    if (formType === 'safari-details') {
      // Safari Details Page Booking
      adminEmailSubject = `New Safari Booking: ${safariName || 'Safari'} - ${fullName}`
      adminEmailComponent = SafariBookingConfirmation({
        fullName,
        email,
        phone: phone || 'Not provided',
        countryCode: countryCode || '',
        country: country || 'Not provided',
        checkIn,
        checkOut,
        roomTypes,
        adults,
        children6to11,
        childrenUnder6,
        specialRequests: specialRequests || '',
        includeSafari: includeSafari || false,
        safariDescription: safariDescription || '',
        safariName: safariName || 'Safari Package',
      })
    } else {
      // All other bookings (homepage, cuisines, rooms, gallery, safaris, blog, blog-post, etc.)
      let subjectSuffix = ''
      
      // Customize subject based on form type
      if (formType === 'blog-post' && postTitle) {
        subjectSuffix = ` - Blog Post: ${postTitle}`
      } else if (formType === 'cuisines') {
        subjectSuffix = ' - Cuisine Inquiry'
      } else if (formType === 'rooms') {
        subjectSuffix = ' - Room Inquiry'
      } else if (formType === 'gallery') {
        subjectSuffix = ' - Gallery Inquiry'
      } else if (formType === 'safaris') {
        subjectSuffix = ' - Safari Inquiry'
      } else if (formType === 'blog') {
        subjectSuffix = ' - Blog Inquiry'
      }
      
      adminEmailSubject = `New Booking Request from ${fullName}${subjectSuffix}`
      adminEmailComponent = BookingConfirmation({
        fullName,
        email,
        checkIn,
        checkOut,
        roomTypes,
        adults,
        children6to11,
        childrenUnder6,
        specialRequests: specialRequests || '',
        includeSafari: includeSafari || false,
        safariDescription: safariDescription || '',
      })
    }

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: 'Pori Pori Booking <booking@poriporiluxurylodgeandcamp.com>',
      to: ['info@poriporilodgescamps.com'],
      replyTo: email,
      subject: adminEmailSubject,
      react: adminEmailComponent,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Send auto-reply to the guest
    const { data: autoReplyData, error: autoReplyError } = await resend.emails.send({
      from: 'Pori Pori Serengeti <info@poriporiluxurylodgeandcamp.com>',
      to: [email],
      subject: 'Thank you for your booking request - Pori Pori Serengeti',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You - Pori Pori Serengeti</title>
            <style>
              @media only screen and (max-width: 480px) {
                .container { padding: 10px !important; }
                .logo { max-width: 140px !important; }
              }
            </style>
          </head>
          <body style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f6f9fc; color: #2C2418;">
            
            <!-- Main Container -->
            <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); margin: 20px;">
              
              <!-- Header -->
              <div style="background-color: #1A1510; padding: 40px 30px 30px; text-align: center;">
                <div style="margin: 0 auto 20px;">
                  <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_400/logo.webp" alt="Pori Pori Serengeti" style="max-width: 200px; height: auto; display: block; margin: 0 auto;">
                </div>
                <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: 300; color: #D4BC8D; margin: 0 0 10px; letter-spacing: 1px;">
                  Thank You, ${fullName}!
                </h1>
                <p style="font-size: 14px; font-weight: 300; color: #A0A0A0; margin: 0;">
                  Your booking request has been received
                </p>
              </div>

              <!-- Reference -->
              <div style="padding: 15px 30px; background-color: #FBF8F4; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E8E0D8;">
                <p style="margin: 0; font-size: 13px; color: #5A4E3E;">
                  <span style="font-weight: 600; color: #8B7A64;">Reference:</span>
                  <span style="font-weight: 700; color: #C4A56E; margin-left: 8px;">#PORI-${Date.now().toString().slice(-6)}</span>
                </p>
                <p style="margin: 0; font-size: 13px; color: #8B7A64;">
                  ${new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <!-- Content -->
              <div style="padding: 30px;">
                
                <!-- Thank You Message -->
                <div style="margin-bottom: 30px;">
                  <p style="font-size: 16px; line-height: 1.6; color: #5A4E3E; margin: 0 0 16px;">
                    We have received your booking request and our team is reviewing it right now.
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #5A4E3E; margin: 0;">
                    A member of our team will contact you within <strong style="color: #C4A56E;">12 hours</strong> to confirm availability and finalize your booking.
                  </p>
                  ${safariName ? `
                    <div style="margin-top: 16px; padding: 12px 16px; background-color: #FBF8F4; border-left: 3px solid #C4A56E; border-radius: 4px;">
                      <p style="margin: 0; font-size: 14px; color: #5A4E3E;">
                        <strong style="color: #C4A56E;">Safari Package:</strong> ${safariName}
                      </p>
                    </div>
                  ` : ''}
                  ${postTitle ? `
                    <div style="margin-top: 16px; padding: 12px 16px; background-color: #FBF8F4; border-left: 3px solid #C4A56E; border-radius: 4px;">
                      <p style="margin: 0; font-size: 14px; color: #5A4E3E;">
                        <strong style="color: #C4A56E;">Blog Post:</strong> ${postTitle}
                      </p>
                    </div>
                  ` : ''}
                </div>

                <!-- Your Request Details -->
                <div style="margin-bottom: 30px;">
                  <h2 style="font-family: Georgia, serif; font-size: 18px; font-weight: 500; color: #2C2418; margin: 0 0 16px;">
                    Your Request Details
                  </h2>
                  
                  <div style="background-color: #FBF8F4; padding: 20px; border-radius: 8px;">
                    
                    <!-- Stay Details -->
                    <div style="margin-bottom: 16px;">
                      <p style="margin: 0 0 4px; font-size: 13px; color: #8B7A64; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        Stay Details
                      </p>
                      <p style="margin: 4px 0; font-size: 15px; color: #2C2418;">
                        <span style="color: #C4A56E; font-weight: 600;">Check-in:</span> ${new Date(checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p style="margin: 4px 0; font-size: 15px; color: #2C2418;">
                        <span style="color: #C4A56E; font-weight: 600;">Check-out:</span> ${new Date(checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p style="margin: 4px 0; font-size: 15px; color: #2C2418;">
                        <span style="color: #C4A56E; font-weight: 600;">Nights:</span> ${Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                      </p>
                    </div>

                    <!-- Guest Count -->
                    <div style="margin-bottom: 16px; padding-top: 12px; border-top: 1px solid #E8E0D8;">
                      <p style="margin: 0 0 4px; font-size: 13px; color: #8B7A64; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        Guest Count
                      </p>
                      <p style="margin: 4px 0; font-size: 15px; color: #2C2418;">
                        <span style="color: #C4A56E; font-weight: 600;">Adults (12+):</span> ${adults}
                      </p>
                      ${children6to11 > 0 ? `<p style="margin: 4px 0; font-size: 15px; color: #2C2418;"><span style="color: #C4A56E; font-weight: 600;">Children (6-11):</span> ${children6to11}</p>` : ''}
                      ${childrenUnder6 > 0 ? `<p style="margin: 4px 0; font-size: 15px; color: #2C2418;"><span style="color: #C4A56E; font-weight: 600;">Infants (Under 6):</span> ${childrenUnder6}</p>` : ''}
                    </div>

                    <!-- Room Types -->
                    <div style="margin-bottom: 16px; padding-top: 12px; border-top: 1px solid #E8E0D8;">
                      <p style="margin: 0 0 4px; font-size: 13px; color: #8B7A64; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        Room Types
                      </p>
                      ${roomTypes.map((room: any) => `
                        <p style="margin: 4px 0; font-size: 15px; color: #2C2418;">
                          <span style="display: inline-block; background-color: #C4A56E; color: #ffffff; padding: 0 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${room.quantity}</span>
                          ${room.type}
                        </p>
                      `).join('')}
                    </div>

                    ${includeSafari ? `
                      <div style="padding-top: 12px; border-top: 1px solid #E8E0D8;">
                        <p style="margin: 0 0 4px; font-size: 13px; color: #8B7A64; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Safari Request
                        </p>
                        <p style="margin: 4px 0; font-size: 15px; color: #5A4E3E;">${safariDescription || ''}</p>
                      </div>
                    ` : ''}

                    ${specialRequests ? `
                      <div style="padding-top: 12px; border-top: 1px solid #E8E0D8;">
                        <p style="margin: 0 0 4px; font-size: 13px; color: #8B7A64; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Special Requests
                        </p>
                        <p style="margin: 4px 0; font-size: 15px; color: #5A4E3E;">${specialRequests}</p>
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Call to Action -->
                <div style="text-align: center; padding: 20px 0 0; border-top: 1px solid #E8E0D8;">
                  <p style="font-size: 15px; color: #5A4E3E; margin: 0 0 16px;">
                    We'll respond within <strong style="color: #C4A56E;">12 hours</strong>
                  </p>
                  <p style="font-size: 14px; color: #8B7A64; margin: 0;">
                    If you need to make any changes or have questions, please reply to this email.
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="padding: 30px 30px 20px; text-align: center; background-color: #FBF8F4; border-top: 1px solid #E8E0D8;">
                <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_200/logo.webp" alt="Pori Pori Serengeti" style="max-width: 120px; height: auto; margin: 0 auto 12px; display: block;">
                
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

    if (autoReplyError) {
      console.error('Auto-reply error:', autoReplyError)
    }

    return NextResponse.json(
      { 
        message: 'Booking request sent successfully',
        emailId: data?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}