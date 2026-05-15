import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

let resend: Resend | null = null;

// Initialize Resend only if API key is available
const initializeResend = () => {
	if (!process.env.RESEND_API_KEY) {
		return null;
	}
	if (!resend) {
		resend = new Resend(process.env.RESEND_API_KEY);
	}
	return resend;
};

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export async function POST(request: NextRequest) {
	try {
		const resendClient = initializeResend();

		if (!resendClient || !process.env.RESEND_API_KEY) {
			return NextResponse.json(
				{ error: 'Email service is not configured. Please set RESEND_API_KEY.' },
				{ status: 503 }
			);
		}

		const body: ContactFormData = await request.json();

		// Validate input
		if (!body.name || !body.email || !body.subject || !body.message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(body.email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Send email using Resend
		const response = await resendClient.emails.send({
			from: 'Contact Form <onboarding@resend.dev>',
			to: process.env.CONTACT_EMAIL || 'brandan.pratt1@gmail.com',
			replyTo: body.email,
			subject: `Portfolio Contact: ${body.subject}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
							body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
							.content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
							.field { margin-bottom: 16px; }
							.label { font-weight: 600; color: #1f2937; margin-bottom: 4px; }
							.value { color: #4b5563; padding: 8px; background: white; border-radius: 4px; border-left: 4px solid #3b82f6; }
							.footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h1 style="margin: 0;">New Contact Form Submission</h1>
							</div>
							<div class="content">
								<div class="field">
									<div class="label">From:</div>
									<div class="value"><strong>${body.name}</strong><br>${body.email}</div>
								</div>
								<div class="field">
									<div class="label">Subject:</div>
									<div class="value">${body.subject}</div>
								</div>
								<div class="field">
									<div class="label">Message:</div>
									<div class="value">${body.message.split('\n').join('<br>')}</div>
								</div>
								<div class="footer">
									<p>This email was sent from your portfolio contact form.</p>
								</div>
							</div>
						</div>
					</body>
				</html>
			`,
		});

		if (response.error) {
			console.error('Resend error:', response.error);
			return NextResponse.json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ 
				success: true, 
				message: 'Email sent successfully',
				id: response.data?.id 
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error in send-email route:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
