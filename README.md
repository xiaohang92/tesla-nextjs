# Tesla Next.js

This Next.js project replicates the sleek, user-friendly interface of Tesla, featuring a modern, responsive design. Built with Tailwind CSS, it offers a dynamic user experience that adjusts smoothly across different devices.

## Features

- **Responsive Design**: Adapts perfectly to different screen sizes.
- **Modern UI**: Utilizes Tailwind CSS for styling to create a visually appealing layout.
- **Navigation System**: Emulates the Tesla interface's navigation for a realistic feel.
- **Stripe Integration**: Test version of Stripe integration for processing payments.
- **User Authentication**: Register and login features for user authentication.
- **Test Drive Feature**: Allows users to schedule a test drive and sends a confirmation email.

## Live Demo

Check out the live demo hosted on Vercel: [Tesla Next.js Demo](https://tesla-nextjs-seven.vercel.app)

## Installation

To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/xiaohang92/tesla-nextjs.git

# Navigate into the project directory
cd tesla-nextjs

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Variables

Create a .env.local file in the root of your project and add the following environment variables:

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SENDGRID_API_KEY=your_sendgrid_api_key
NEXT_PUBLIC_SENDGRID_FROM_EMAIL=your_sendgrid_from_email

Replace the placeholders with your actual keys.
