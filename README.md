# Laundry & Chore Scheduler

## Overview

The **Laundry & Chore Scheduler** is a web application designed to manage laundry tasks efficiently and set timely reminders for chores. This application allows users to join laundry queues, track the availability of laundry machines, set reminders for their tasks, and receive notifications.

## Features

- **Laundry Queue Management**: Users can join a virtual queue for laundry machines, track real-time availability, and see how much time is left for the current user.
- **Reminder Notifications**: Users can set reminders for their laundry tasks, chores, and other activities, and receive notifications via email.
- **Supplies Management**: Users can track their laundry supplies and set thresholds for low stock notifications.
- **User-Friendly Interface**: The platform is intuitive and easy to navigate, ensuring a smooth user experience.

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Email Notifications**: NodeMailer
- **Other Tools**: Vite (for frontend development)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- A mail service (for example, Gmail for NodeMailer)

### Clone the Repository

```bash
git clone https://github.com/your-username/laundry-chore-scheduler.git
cd laundry-chore-scheduler
```
## Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```
2.**Install backend dependencies**:

```bash
npm install
```
3.**Create a .env file in the backend directory with the following content**:

```env
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
EMAIL_SERVICE=<your-email-service>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>
```
Replace the placeholders (<...>) with your actual MongoDB URI, JWT secret, and email service credentials.

4.**Run the backend server**:

```bash
npm run server
```
The backend will run on http://localhost:5000.

## Frontend Setup
1.**Navigate to the frontend directory**:

```bash
cd ../frontend
```
2. **Install frontend dependencies**:

```bash
npm install
```
3.**Run the frontend development server**:

```bash
npm run dev
```
The frontend will be available on http://localhost:5173.

## Running the App
- Make sure both the backend and frontend servers are running.
- Open http://localhost:5173 in your browser to access the application.
# API Endpoints
## Authentication
- POST /api/users/login: User login
- POST /api/users/register: User registration
## Laundry Management
- GET /api/laundry: Fetch all laundry machines
- POST /api/laundry/:id/queue: Join a laundry machine queue
- POST /api/laundry/:id/start: Start a laundry machine
- PUT /api/laundry/:id/status: Update machine status
## Reminder Management
- POST /api/reminders: Add a new reminder
- GET /api/reminders: Get all reminders for the logged-in user
- DELETE /api/reminders/:id: Delete a reminder
## Supplies Management
- POST /api/supplies: Add a new supply
- GET /api/supplies: Get all supplies
- PUT /api/supplies/:id: Update supply quantity
## Project Structure
```bash
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.html
│   └── vite.config.js
└── README.md
```
## Future Enhancements
- Admin Panel: An admin interface to manage users, laundry machines, and supplies.
- Notifications: Add SMS notifications for reminders and laundry availability.
- Mobile App: Extend the project by developing a mobile app for easier access.
