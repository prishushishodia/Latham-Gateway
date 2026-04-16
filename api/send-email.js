import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Latham Gateway Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #1a2e2c;">
          <div style="background: #026362; padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 500;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Latham Gateway Medical Center</p>
          </div>

          <div style="background: white; padding: 32px; border: 1px solid #d8e7e4; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4; width: 140px;">
                  <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #667085;">Name</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4; font-size: 15px;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4;">
                  <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #667085;">Email</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #026362;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4;">
                  <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #667085;">Phone</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4; font-size: 15px;">
                  <a href="tel:${phone}" style="color: #026362;">${phone}</a>
                </td>
              </tr>` : ''}
              ${service ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4;">
                  <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #667085;">Service</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f4f4; font-size: 15px;">
                  ${service}
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding: 12px 0; vertical-align: top;">
                  <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #667085;">Message</span>
                </td>
                <td style="padding: 12px 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
                  ${message}
                </td>
              </tr>
            </table>

            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0f4f4;">
              <a href="mailto:${email}" style="display: inline-block; background: #026362; color: white; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-size: 14px; font-weight: 600;">
                Reply to ${name}
              </a>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
