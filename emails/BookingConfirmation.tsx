// emails/BookingConfirmation.tsx
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

interface BookingEmailProps {
  fullName: string
  email: string
  checkIn: string
  checkOut: string
  roomTypes: Array<{ type: string; quantity: number }>
  adults: number
  children6to11: number
  childrenUnder6: number
  specialRequests: string
  includeSafari: boolean
  safariDescription: string
}

export const BookingConfirmation = ({
  fullName,
  email,
  checkIn,
  checkOut,
  roomTypes,
  adults,
  children6to11,
  childrenUnder6,
  specialRequests,
  includeSafari,
  safariDescription,
}: BookingEmailProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const calculateNights = () => {
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Optimized logo URLs with Cloudinary transformations
  // f_png: Convert to PNG for better email compatibility
  // q_auto: Automatic quality optimization
  // w_400: Resize to appropriate width
  const LOGO_URL = 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_400/logo.webp'
  const LOGO_SMALL_URL = 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_200/logo.webp'

  return (
    <Html>
      <Head />
      <Preview>New Booking Request from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={headerSection}>
            <Container style={logoContainer}>
              <Img
                src={LOGO_URL}
                width="200"
                height="67"
                alt="Pori Pori Serengeti"
                style={logo}
              />
            </Container>
            <Heading style={h1}>New Booking Request</Heading>
            <Text style={subtitle}>
              A new booking request has been submitted through the website.
            </Text>
          </Section>

          {/* Booking Reference */}
          <Section style={referenceSection}>
            <Text style={referenceText}>
              <span style={referenceLabel}>Reference:</span> 
              <span style={referenceValue}>#PORI-{Date.now().toString().slice(-6)}</span>
            </Text>
            <Text style={referenceDate}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Guest Information */}
          <Section style={section}>
            <Heading style={h2}>Guest Information</Heading>
            <Row style={row}>
              <Column style={label}>Full Name:</Column>
              <Column style={value}>{fullName}</Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Email:</Column>
              <Column style={value}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Stay Details */}
          <Section style={section}>
            <Heading style={h2}>Stay Details</Heading>
            <Row style={row}>
              <Column style={label}>Check-in:</Column>
              <Column style={value}>
                <span style={highlight}>{formatDate(checkIn)}</span>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Check-out:</Column>
              <Column style={value}>
                <span style={highlight}>{formatDate(checkOut)}</span>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Nights:</Column>
              <Column style={value}>
                <span style={highlight}>{calculateNights()} nights</span>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Room Requirements */}
          <Section style={section}>
            <Heading style={h2}>Room Requirements</Heading>
            <div style={roomContainer}>
              {roomTypes.map((room, index) => (
                <Row key={index} style={roomRow}>
                  <Column style={roomLabel}>{room.type}:</Column>
                  <Column style={roomValue}>
                    <span style={roomBadge}>{room.quantity} room(s)</span>
                  </Column>
                </Row>
              ))}
            </div>
          </Section>

          <Hr style={hr} />

          {/* Guest Count */}
          <Section style={section}>
            <Heading style={h2}>Guest Count</Heading>
            <Row style={row}>
              <Column style={label}>Adults (12+):</Column>
              <Column style={value}>
                <span style={guestBadge}>{adults}</span>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Children (6-11):</Column>
              <Column style={value}>
                <span style={guestBadge}>{children6to11}</span>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Infants (Under 6):</Column>
              <Column style={value}>
                <span style={guestBadge}>{childrenUnder6}</span>
              </Column>
            </Row>
          </Section>

          {/* Safari Request */}
          {includeSafari && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Safari Request</Heading>
                <Text style={safariText}>{safariDescription}</Text>
              </Section>
            </>
          )}

          {/* Special Requests */}
          {specialRequests && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Special Requests</Heading>
                <Text style={requestText}>{specialRequests}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          {/* Action Required */}
          <Section style={actionSection}>
            <Heading style={actionHeading}>Action Required</Heading>
            <Text style={actionText}>
              Please respond to this guest within <strong>12 hours</strong> to confirm availability.
            </Text>
            <Container style={buttonContainer}>
              <Link 
                href={`mailto:${email}`} 
                style={buttonPrimary}
              >
                Reply to Guest
              </Link>
              <Link 
                href="https://poriporiluxurylodgeandcamp.com/admin" 
                style={buttonSecondary}
              >
                View Dashboard
              </Link>
            </Container>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footerSection}>
            <Img
              src={LOGO_SMALL_URL}
              width="120"
              height="40"
              alt="Pori Pori Serengeti"
              style={footerLogo}
            />
            <Text style={footerText}>
              Serengeti, Tanzania
            </Text>
            <Text style={footerText}>
              <Link href="tel:+255754430599" style={footerLink}>+255 754 430 599</Link>
              {' · '}
              <Link href="mailto:info@poriporilodgescamps.com" style={footerLink}>info@poriporilodgescamps.com</Link>
            </Text>
            <Text style={footerLink}>
              <Link href="https://poriporiluxurylodgeandcamp.com" style={footerLink}>
                poriporiluxurylodgeandcamp.com
              </Link>
            </Text>
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} Pori Pori Serengeti — All rights reserved
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ============================================================
// STYLES
// ============================================================

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  padding: '20px 0',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '0',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
}

const headerSection = {
  backgroundColor: '#1A1510',
  padding: '40px 30px 30px',
  textAlign: 'center' as const,
}

const logoContainer = {
  margin: '0 auto 20px',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto',
  maxWidth: '200px',
  height: 'auto',
}

const h1 = {
  color: '#D4BC8D',
  fontSize: '28px',
  fontWeight: '300',
  margin: '0 0 10px',
  fontFamily: 'Georgia, serif',
  letterSpacing: '1px',
}

const subtitle = {
  color: '#A0A0A0',
  fontSize: '14px',
  fontWeight: '300',
  margin: '0',
}

const referenceSection = {
  padding: '15px 30px',
  backgroundColor: '#FBF8F4',
  display: 'flex' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
}

const referenceText = {
  margin: '0',
  fontSize: '13px',
  color: '#5A4E3E',
}

const referenceLabel = {
  fontWeight: '600',
  color: '#8B7A64',
}

const referenceValue = {
  fontWeight: '700',
  color: '#C4A56E',
  marginLeft: '8px',
}

const referenceDate = {
  margin: '0',
  fontSize: '13px',
  color: '#8B7A64',
}

const section = {
  padding: '0 30px',
}

const h2 = {
  color: '#2C2418',
  fontSize: '18px',
  fontWeight: '500',
  margin: '30px 0 15px',
  fontFamily: 'Georgia, serif',
}

const row = {
  padding: '6px 0',
  display: 'flex' as const,
  alignItems: 'center' as const,
}

const label = {
  color: '#8B7A64',
  fontSize: '14px',
  fontWeight: '500',
  width: '140px',
  paddingRight: '20px',
  flexShrink: 0 as const,
}

const value = {
  color: '#2C2418',
  fontSize: '14px',
  fontWeight: '400',
}

const highlight = {
  color: '#C4A56E',
  fontWeight: '600',
}

const roomContainer = {
  backgroundColor: '#FBF8F4',
  borderRadius: '8px',
  padding: '12px 16px',
  marginTop: '8px',
}

const roomRow = {
  padding: '4px 0',
  display: 'flex' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
}

const roomLabel = {
  color: '#2C2418',
  fontSize: '14px',
  fontWeight: '400',
}

const roomValue = {
  fontSize: '14px',
}

const roomBadge = {
  display: 'inline-block' as const,
  backgroundColor: '#C4A56E',
  color: '#ffffff',
  padding: '2px 12px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: '500',
}

const guestBadge = {
  display: 'inline-block' as const,
  backgroundColor: '#F3EDE4',
  color: '#2C2418',
  padding: '2px 12px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: '500',
}

const safariText = {
  color: '#5A4E3E',
  fontSize: '14px',
  fontWeight: '400',
  margin: '10px 0 0',
  padding: '16px',
  backgroundColor: '#FBF8F4',
  borderRadius: '8px',
  lineHeight: '1.6',
}

const requestText = {
  color: '#5A4E3E',
  fontSize: '14px',
  fontWeight: '400',
  margin: '10px 0 0',
  padding: '16px',
  backgroundColor: '#FBF8F4',
  borderRadius: '8px',
  lineHeight: '1.6',
}

const actionSection = {
  padding: '0 30px 10px',
  marginTop: '10px',
}

const actionHeading = {
  color: '#2C2418',
  fontSize: '18px',
  fontWeight: '500',
  margin: '30px 0 10px',
  fontFamily: 'Georgia, serif',
}

const actionText = {
  color: '#5A4E3E',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const buttonContainer = {
  display: 'flex' as const,
  gap: '12px',
  marginTop: '16px',
  justifyContent: 'center' as const,
}

const buttonPrimary = {
  backgroundColor: '#C4A56E',
  color: '#ffffff',
  padding: '12px 28px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  display: 'inline-block',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'center' as const,
}

const buttonSecondary = {
  backgroundColor: 'transparent',
  color: '#C4A56E',
  padding: '10px 28px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  display: 'inline-block',
  border: '2px solid #C4A56E',
  cursor: 'pointer',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#E8E0D8',
  margin: '30px 30px',
}

const footerSection = {
  padding: '30px 30px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#FBF8F4',
  borderTop: '1px solid #E8E0D8',
}

const footerLogo = {
  margin: '0 auto 12px',
  maxWidth: '120px',
  height: 'auto',
}

const footerText = {
  color: '#8B7A64',
  fontSize: '12px',
  fontWeight: '300',
  textAlign: 'center' as const,
  margin: '4px 0',
}

const footerLink = {
  color: '#C4A56E',
  textDecoration: 'underline',
  fontWeight: '400',
}

const footerCopyright = {
  color: '#A0A0A0',
  fontSize: '11px',
  fontWeight: '300',
  textAlign: 'center' as const,
  margin: '8px 0 0',
}

const link = {
  color: '#C4A56E',
  textDecoration: 'underline',
}

export default BookingConfirmation