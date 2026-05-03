import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { 
          message: 'Email service not configured. Please contact the administrator.',
          error: 'Missing email credentials'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      company,
      phone,
      projectType,
      projectDetails,
      preferredDate,
      preferredTime,
      duration,
    } = body;

    // Validate required fields
    if (!name || !email || !projectType || !projectDetails || !duration) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      return NextResponse.json(
        { 
          message: 'Email service configuration error. Please check your credentials.',
          error: 'Transporter verification failed'
        },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `New ${duration} Minute Meeting Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #2563EB; margin-bottom: 20px;">New Meeting Booking Request</h2>
          
          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #0B1120; margin-top: 0;">Meeting Details</h3>
            <p style="margin: 5px 0;"><strong>Duration:</strong> ${duration} Minutes</p>
            ${preferredDate ? `<p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
            ${preferredTime ? `<p style="margin: 5px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
          </div>

          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #0B1120; margin-top: 0;">Contact Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></p>
            ${company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #0B1120; margin-top: 0;">Project Information</h3>
            <p style="margin: 5px 0;"><strong>Project Type:</strong> ${projectType}</p>
            <p style="margin: 5px 0;"><strong>Project Details:</strong></p>
            <p style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px; white-space: pre-wrap;">${projectDetails}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748B; font-size: 14px; margin: 0;">
              This booking request was submitted through the Percexa contact form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', process.env.EMAIL_USER);

    return NextResponse.json(
      { message: 'Booking request sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        message: 'Failed to send booking request. Please try again or contact us directly.',
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
