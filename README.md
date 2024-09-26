# Grimoire

Grimoire is a job tracking application that helps users manage their job search efficiently. It offers features like daily job tracking and kanban board organization, making it easier for users to stay on top of their job applications.

## Overview
Grimoire provides a centralized platform for job seekers to organize and track their job search process. With features like visual progress tracking, Grimoire simplifies the job search journey.

## Features
- **Daily Job Tracking**: View and manage job applications on a day-to-day basis.
- **Kanban Board**: Organize applications with a drag-and-drop interface across different stages (Wishlist, Applied, Interview, Offer, Rejected).
- **Monthly Calendar View**: Get a high-level overview of your job applications for each day of the month. Click on any day to see detailed information and manage your applications for that day.
- **Kanban View for Each Day**: Visualize and manage job applications for a specific day using the kanban board, where you can move applications between different stages.


## Tech Stack
- **Frontend**: React(VITE), JavaScript, HTML, CSS
- **Backend**: Node.js, Express, Knex, MySQL, JWT

## Installation

### Database Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/shahenoor/grimoire.git
2. Navigate to the server directory:
   ```bash
   cd grimoire/server
2. Run the migrations to set up the tables:
     ```bash
     npx knex migrate:latest
     
### Server Setup

1. Navigate to the server directory:
   ```bash
   cd grimoire/server
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables in a .env file:
    ```bash
    DB_HOST= <your-database-host>
    DB_NAME= <your-database-name>
    DB_USER= <your-database-username>
    DB_PASSWORD= <your-database-password>
    PORT = <port-number>
    CORS_ORIGIN = <cors-origin-url>
    JWT_SECRET = <your-secret-key>

4. Start the server:
   ```bash
   npm run start

### Client Setup
1. Navigate to the client directory:
    ```bash
    cd grimoire/client

3. Install dependencies:
   ```bash
   npm install

5. Start the client:
   ```bash
   npm start
   
## Usage
Open your browser and navigate to http://localhost:PORT to access the Grimoire web app.
Sign up or log in to start tracking your job applications.

## Contact
For any inquiries or issues, please contact Shahenoor Radhanpuri at shahenooraslam29@gmail.com

