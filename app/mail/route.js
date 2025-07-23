// app/api/mail/route.js

import { NextResponse } from 'next/server';
import { sendMail } from '../lib/mailer';

export async function POST(req) {
  try {
    const { subject, message, email, name } = await req.json();

    if (!subject || !message || !email || !name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await sendMail({ subject, message, email, name });
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
