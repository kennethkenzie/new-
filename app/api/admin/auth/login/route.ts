import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

// Demo admin credentials (in production, these should be hashed and stored in database)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'labrezi123' // In production, use bcrypt to hash passwords
};

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called');
    
    const { username, password } = await request.json();
    console.log('Parsed credentials:', { username, password: password ? '***' : 'missing' });

    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate JWT token
      const token = sign(
        { 
          username, 
          role: 'admin',
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        },
        process.env.JWT_SECRET || 'your-secret-key'
      );

      const responseData = {
        success: true,
        token,
        user: {
          username,
          role: 'admin',
          name: 'Hotel Administrator'
        }
      };

      console.log('Login successful, sending response');
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.log('Invalid credentials provided');
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}