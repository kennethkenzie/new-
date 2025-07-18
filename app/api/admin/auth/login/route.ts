import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { connectToDatabase } from '../../../../../lib/mongodb';
import User from '../../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    console.log('Login API called');
    
    const { username, password } = await request.json();
    console.log('Parsed credentials:', { username, password: password ? '***' : 'missing' });

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    });

    if (!user) {
      console.log('User not found');
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log('User account is inactive');
      return new Response(JSON.stringify({ error: 'Account is inactive' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role,
        permissions: user.getPermissions(),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    const responseData = {
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        lastLogin: user.lastLogin
      }
    };

    console.log('Login successful, sending response');
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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