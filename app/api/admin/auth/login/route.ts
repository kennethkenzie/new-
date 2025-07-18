import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

// Demo admin credentials (in production, these should be hashed and stored in database)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'labrezi123' // In production, use bcrypt to hash passwords
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

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

      return NextResponse.json({
        success: true,
        token,
        user: {
          username,
          role: 'admin',
          name: 'Hotel Administrator'
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}