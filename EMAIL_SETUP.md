# Email Setup Instructions for Contact Form

This guide will help you set up email notifications for the booking form using Nodemailer and Gmail.

## Prerequisites

- A Gmail account
- Node.js and npm installed

## Step 1: Enable 2-Step Verification on Gmail

1. Go to your Google Account: https://myaccount.google.com/security
2. Under "Signing in to Google", select **2-Step Verification**
3. Follow the prompts to enable 2-Step Verification

## Step 2: Generate an App Password

1. Go to https://myaccount.google.com/apppasswords
2. In the "Select app" dropdown, choose **Mail**
3. In the "Select device" dropdown, choose **Other (Custom name)**
4. Enter a name like "Percexa Website"
5. Click **Generate**
6. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

## Step 3: Create Environment Variables File

1. In the `frontend` directory, create a file named `.env.local`
2. Add the following content (replace with your actual credentials):

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

**Important:** 
- Remove spaces from the app password
- Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 4: Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the contact page: http://localhost:3000/contact

3. Select a meeting duration and fill out the form

4. Submit the form and check your email inbox

## Troubleshooting

### Email not sending?

1. **Check your credentials**: Make sure `EMAIL_USER` and `EMAIL_PASSWORD` are correct in `.env.local`

2. **App Password issues**: 
   - Make sure you're using the App Password, not your regular Gmail password
   - Remove any spaces from the App Password

3. **2-Step Verification**: Ensure 2-Step Verification is enabled on your Google account

4. **Less secure apps**: Gmail may block the connection. Make sure you're using an App Password (not the regular password)

5. **Check server logs**: Look at the terminal where you ran `npm run dev` for error messages

### Using a different email provider?

If you want to use a different email provider (not Gmail), update the transporter configuration in `app/api/send-booking/route.ts`:

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

Common providers:
- **Outlook/Hotmail**: `smtp.office365.com`, port 587
- **Yahoo**: `smtp.mail.yahoo.com`, port 587
- **Custom SMTP**: Use your provider's SMTP settings

## Email Template

The email sent to you will include:
- Meeting duration selected
- Contact information (name, email, company, phone)
- Project type and details
- Preferred meeting date and time

## Security Notes

- Never commit `.env.local` to version control
- Keep your App Password secure
- Rotate your App Password periodically
- Use environment variables for production deployment

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`

2. Make sure the API route is accessible (Next.js API routes work automatically)

3. Test the form after deployment

## Support

If you encounter issues, check:
- Gmail security settings
- Server logs for detailed error messages
- Network connectivity
- Firewall settings (if applicable)
