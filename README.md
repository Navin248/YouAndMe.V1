YouAndMe 💬
A private, link-based, one-to-one chat application built with Next.js and Socket.IO. No accounts or phone numbers needed—just create a chat, share the unique link, and start talking.

✨ Features
Real-Time Messaging: Instant one-to-one communication using WebSockets.

Link-Based Rooms: Create a unique, private chat room by simply generating a link.

Ephemeral by Design: Messages are automatically deleted from the database after 7 days.

No Accounts Needed: Completely anonymous and hassle-free.

Modern & Responsive: A stylish, dark-themed UI that works beautifully on desktop and mobile devices.

🛠️ Tech Stack
Frontend: Next.js, React, Tailwind CSS

Backend: Node.js, Express

Real-time Communication: Socket.IO

Database: MongoDB Atlas (using a TTL index for message deletion)

Deployment: Backend on Render, Frontend on Vercel

🚀 Running Locally
To run this project on your own machine, follow these steps.

Prerequisites
Node.js installed

A free MongoDB Atlas account

Setup
Clone the repository:

Bash

git clone https://github.com/your-username/YouAndMe.git
cd YouAndMe
(Replace your-username with your actual GitHub username)

Set up the Backend:

Navigate to the server directory:

Bash

cd server
Install dependencies:

Bash

npm install
Create a .env file in the server folder and add your MongoDB connection string:

Code snippet

# server/.env
MONGODB_URI=your_mongodb_connection_string
Start the backend server:

Bash

npm run dev
The backend will be running on http://localhost:3001.

Set up the Frontend:

Open a new terminal and navigate to the project's root directory.

Install dependencies:

Bash

npm install
Start the frontend server:

Bash

npm run dev
The frontend will be running on http://localhost:3000.

Open the app:
Visit http://localhost:3000 in your browser to use the application.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
