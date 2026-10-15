import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

let resend: Resend | null = null;

const initializeResend = () => {
	if (!process.env.RESEND_API_KEY) return null;
	resend ??= new Resend(process.env.RESEND_API_KEY);
	return resend;
};

const InquirySchema = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.email().max(200),
	company: z.string().trim().max(150).optional().default(''),
	service: z.string().trim().max(100).optional().default(''),
	budget: z.string().trim().max(50).optional().default(''),
	timeline: z.string().trim().max(50).optional().default(''),
	message: z.string().trim().min(1).max(5000),
	website: z.string().optional(), // honeypot
});

const escapeHtml = (s: string) =>
	s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(request: NextRequest) {
	try {
		const resendClient = initializeResend();
		if (!resendClient) {
			return NextResponse.json(
				{ error: 'Email service is not configured. Please email me directly.' },
				{ status: 503 }
			);
		}

		const parsed = InquirySchema.safeParse(await request.json().catch(() => null));
		if (!parsed.success) {
			return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 400 });
		}
		const body = parsed.data;

		// Bots fill the hidden field; pretend success.
		if (body.website) return NextResponse.json({ success: true }, { status: 200 });

		const rows = [
			['From', `${body.name} <${body.email}>`],
			['Company', body.company],
			['Interested in', body.service],
			['Budget', body.budget],
			['Timeline', body.timeline],
		]
			.filter(([, v]) => v)
			.map(([k, v]) => [k, escapeHtml(v)]);

		const response = await resendClient.emails.send({
			from: process.env.CONTACT_FROM ?? 'Portfolio Inquiry <onboarding@resend.dev>',
			to: process.env.CONTACT_EMAIL || 'brandan.pratt1@gmail.com',
			replyTo: body.email,
			subject: `New inquiry: ${body.service || 'General'} — ${body.name}${body.company ? ` (${body.company})` : ''}`,
			html: `
				<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0f141c">
					<h1 style="font-size:20px;margin:0 0 16px">New project inquiry</h1>
					<table style="width:100%;border-collapse:collapse;margin-bottom:16px">
						${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`).join('')}
					</table>
					<div style="padding:16px;background:#f3f6f9;border-left:4px solid #22e1ff;border-radius:4px;white-space:pre-wrap">${escapeHtml(body.message)}</div>
					<p style="margin-top:24px;font-size:12px;color:#6b7280">Sent from the portfolio contact form. Reply to respond directly.</p>
				</div>
			`,
		});

		if (response.error) {
			console.error('Resend error:', response.error);
			return NextResponse.json({ error: 'Failed to send. Please email me directly.' }, { status: 500 });
		}

		return NextResponse.json({ success: true, id: response.data?.id }, { status: 200 });
	} catch (error) {
		console.error('Error in send-email route:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
