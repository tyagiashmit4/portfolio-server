import { NextResponse } from 'next/server';
import { sendMail } from '../lib/mailer';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // or restrict to your frontend like 'http://localhost:5173'
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS preflight
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Handle POST
export async function POST(req) {
  try {
    const { subject, message, email, name } = await req.json();

    if (!subject || !message || !email || !name) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: corsHeaders }
      );
    }

    await sendMail({ subject, message, email, name });

    return new NextResponse(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to send email', error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
