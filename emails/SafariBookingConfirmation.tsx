// emails/SafariBookingConfirmation.tsx
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

interface SafariBookingConfirmationProps {
  fullName: string
  email: string
  phone: string
  countryCode: string
  country: string
  checkIn: string
  checkOut: string
  roomTypes: Array<{ type: string; quantity: number }>
  adults: number
  children6to11: number
  childrenUnder6: number
  specialRequests?: string
  includeSafari?: boolean
  safariDescription?: string
  safariName: string
}

export const SafariBookingConfirmation = ({
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
}: SafariBookingConfirmationProps) => {
  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Html>
      <Head />
      <Preview>New Safari Booking: {safariName} - {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_400/logo.webp"
              width="180"
              height="auto"
              alt="Pori Pori Serengeti"
              style={logo}
            />
            <Heading style={h1}>New Safari Booking Request</Heading>
            <Text style={subtitle}>Package: {safariName}</Text>
          </Section>

          <Hr style={hr} />

          {/* Guest Information */}
          <Section style={section}>
            <Heading style={h2}>Guest Information</Heading>
            <Row style={row}>
              <Column style={label}>Full Name</Column>
              <Column style={value}>{fullName}</Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Email</Column>
              <Column style={value}>{email}</Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Phone</Column>
              <Column style={value}>{countryCode}{phone}</Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Country</Column>
              <Column style={value}>{country}</Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Booking Details */}
          <Section style={section}>
            <Heading style={h2}>Booking Details</Heading>
            <Row style={row}>
              <Column style={label}>Check-in</Column>
              <Column style={value}>{new Date(checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Check-out</Column>
              <Column style={value}>{new Date(checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Column>
            </Row>
            <Row style={row}>
              <Column style={label}>Nights</Column>
              <Column style={value}>{nights} nights</Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Guest Details */}
          <Section style={section}>
            <Heading style={h2}>Guest Details</Heading>
            <Row style={row}>
              <Column style={label}>Adults (12+)</Column>
              <Column style={value}>{adults}</Column>
            </Row>
            {children6to11 > 0 && (
              <Row style={row}>
                <Column style={label}>Children (6-11)</Column>
                <Column style={value}>{children6to11}</Column>
              </Row>
            )}
            {childrenUnder6 > 0 && (
              <Row style={row}>
                <Column style={label}>Infants (Under 6)</Column>
                <Column style={value}>{childrenUnder6}</Column>
              </Row>
            )}
          </Section>

          <Hr style={hr} />

          {/* Room Types */}
          <Section style={section}>
            <Heading style={h2}>Room Types</Heading>
            {roomTypes.map((room, index) => (
              <Row key={index} style={row}>
                <Column style={label}>{room.type}</Column>
                <Column style={value}>x{room.quantity}</Column>
              </Row>
            ))}
          </Section>

          {includeSafari && safariDescription && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Additional Safari Activities</Heading>
                <Text style={description}>{safariDescription}</Text>
              </Section>
            </>
          )}

          {specialRequests && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Special Requests</Heading>
                <Text style={description}>{specialRequests}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This booking was submitted from the Safari Details page.
            </Text>
            <Text style={footerText}>
              <Link href="https://poriporiluxurylodgeandcamp.com" style={link}>
                poriporiluxurylodgeandcamp.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SafariBookingConfirmation

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  padding: '20px 0',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  margin: '0 auto',
  maxWidth: '600px',
  overflow: 'hidden',
  padding: '0',
}

const header = {
  backgroundColor: '#1A1510',
  padding: '40px 30px 30px',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto 20px',
  maxWidth: '200px',
}

const h1 = {
  color: '#D4BC8D',
  fontFamily: 'Georgia, serif',
  fontSize: '28px',
  fontWeight: '300',
  letterSpacing: '1px',
  margin: '0 0 8px',
}

const subtitle = {
  color: '#A0A0A0',
  fontSize: '16px',
  fontWeight: '300',
  margin: '0',
}

const hr = {
  borderColor: '#E8E0D8',
  margin: '0',
}

const section = {
  padding: '24px 30px',
}

const h2 = {
  color: '#2C2418',
  fontFamily: 'Georgia, serif',
  fontSize: '18px',
  fontWeight: '500',
  margin: '0 0 16px',
}

const row = {
  marginBottom: '8px',
}

const label = {
  color: '#8B7A64',
  fontSize: '14px',
  fontWeight: '600',
  paddingRight: '20px',
  textTransform: 'uppercase' as const,
  width: '140px',
}

const value = {
  color: '#2C2418',
  fontSize: '15px',
}

const description = {
  color: '#5A4E3E',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '8px 0 0',
}

const footer = {
  backgroundColor: '#FBF8F4',
  padding: '20px 30px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#8B7A64',
  fontSize: '12px',
  fontWeight: '300',
  margin: '4px 0',
}

const link = {
  color: '#C4A56E',
  textDecoration: 'underline',
}