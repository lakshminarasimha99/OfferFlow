# OfferFlow

OfferFlow is a production-ready MERN stack job application tracker with CRUD, search/filter/sort, analytics, and a polished dashboard.

## Features
- Add, view, edit, and delete job applications
- Search, filter, and sort applications
- Dashboard with summary cards and charts
- Responsive SaaS-style UI with toast notifications and delete confirmation modal

## Tech Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- Axios + React Router + Recharts + React Icons

## Setup
1. Install dependencies:
   - npm install
   - npm --prefix server install
   - npm --prefix client install
2. Start MongoDB locally.
3. Create server/.env from server/.env.example and update MONGO_URI if needed.
4. Start the app:
   - npm run dev

The client will run at http://localhost:5173 and the API at http://localhost:5000.
