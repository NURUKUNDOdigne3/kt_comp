import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch('https://payments.paypack.rw/api/auth/agents/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.PAYPACK_CLIENT_ID,
        client_secret: process.env.PAYPACK_CLIENT_SECRET,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Paypack auth failed:', data);
      return NextResponse.json({ error: 'Authentication failed' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}