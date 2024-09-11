# Grimoire

## Overview

**Grimoire** is a job tracking app designed for individuals actively applying for jobs, offering a streamlined and organized way to manage job applications. Users can track their progress, set reminders for deadlines, and manage every step of their job search in one place.

### Problem Space

Job seekers often face challenges keeping track of multiple applications, deadlines, and interview schedules. Many resort to spreadsheets, which can become cluttered and difficult to manage. 

Additionally, users need reminders and progress tracking to stay on top of the application process. **Grimoire** solves these problems by providing a centralized platform where users can organize their job search journey efficiently and intuitively.

### User Profile

- Job seekers who apply to multiple jobs daily and need help managing deadlines, interviews, and offers.
- Users looking for an easy way to track their job applications without the hassle of manually entering data into spreadsheets.
- People who want to visually manage the progress of their job applications using a kanban board system.

### Features

1. Daily Job Tracking: Users can easily track applications, interviews, and offers, all displayed in a day-to-day log or calendar format.

2. Application Sheet: A text editor allows users to paste job descriptions, and NLP extracts key details into editable fields for easy management.

3. Kanban Board: Organize job applications visually through a drag-and-drop kanban system with stages like Wishlist, Applied, Interview, Offer, and Rejected.

4. Reminders for Deadlines: Set and receive notifications for job application deadlines, interviews, and follow-up tasks to stay on top of the process.

5. Feature Extraction from Pasted Job Details: Automatically extract important job details from copy-pasted descriptions to populate job fields.

6. Monthly View: See a high-level overview of your job search progress with a calendar that highlights job applications, interviews, and deadlines for each day.

7. Progress Dashboard: Track and analyze job search progress, including the number of applications, interviews, and offers through a visual dashboard.

8. Notifications/Reminders: Receive notifications for application deadlines and other key milestones, ensuring nothing is missed in the job search.

## Implementation

### Tech Stack

- React
- Javascript
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express
    - bcrypt for password hashing
- Heroku

### APIs

- Google NLP API

### Sitemap

- Sign Up
- Log In
- Home Page
- Monthly Tracker
- Saved Jobs
- Kanban Board (For each day)
- Modals
    - User Profile
    - Settings
    - Job Details
    - Add new Job Application
    - Notifications

### Mockups

#### Landing Page
![](./grimoire-frontend/src/assets/LandingPage1.png)

#### Landing Page (App Features)
![](./grimoire-frontend/src/assets/LandingPage2.png)

#### Sign In Page
![](./grimoire-frontend/src/assets/SignIn.png)

#### Monthly Tracker View
![](./grimoire-frontend/src/assets/MonthlyTracker.png)

#### Kanban Board (Date-wise)
![](./grimoire-frontend/src/assets/Kanban.png)



### Data
![](./grimoire-frontend/src/assets/sql-diagram.png)
 

### Endpoints

1. GET /api/user

    Fetch user's all the information to display in the profile modal.

    Parameters: user_id 
    
    Response: User name, email, profile picture, and settings.

2. GET /api/jobs/total

    Get the total number of job applications submitted by the user.

    Parameters: user_id

    Response: Total number of job applications.

3. GET /api/interviews/total

    Get the total number of interviews the user has had.

    Parameters: user_id

    Response: Total number of interviews.

4. GET /api/user/activity

    Fetch the user's last activity (e.g., last job applied or last login).

    Parameters: user_id

    Response: Job Details/ Message of Last activity user performed.

5.  GET /api/jobs/month

    Get the number of jobs applied for each day of the current month.

    Parameters: user_id, month

    Response: Array of objects with date and number of applications for each day.

6.  GET /api/jobs/day

    Fetch all job applications submitted on a specific day.

    Parameters: user_id, date

    Response: List of job applications for the given day.

7. POST /api/jobs

    Submit a new job application with details.

    Parameters: Job title, company, status, deadlines, etc.

    Response: Confirmation of job submission.

8.  GET /api/notifications

    Get all notifications related to job application deadlines and interviews.

    Parameters: user_id

    Response: List of upcoming notifications.

9.  POST /api/notifications

    Push a new notification to the user (e.g., for reminders or follow-ups).

    Parameters: user_id, notification_type, date

    Response: Confirmation of notification push.

10. GET /api/jobs/status

    Fetch jobs filtered by status (e.g., Wishlist, Applied, Interview).

    Parameters: user_id, status
    
    Response: List of jobs with the selected status.

11. DELETE /api/jobs/

    Delete a job application from the user's list.

    Parameters: job_id

    Response: Confirmation of job deletion.

12. PUT /api/jobs/

    Update job application details (e.g., changing status or adding follow-up notes).

    Parameters: job_id, updated data

    Response: Confirmation of job update.

## Roadmap

**Week 1: 
Setup and Core Features**
1. Client Setup (Day 1-2):
-   Set up the React project with routes for:
    Dashboard, Kanban Board, Calendar View, New Job, and Reminders Page.
-   Install the needed libraries.

2. Server Setup (Day 3-4):
-   Set up the Express server with routing and placeholder responses.
-   Define the database schema for jobs, reminders, and user profiles (OAuth, manual).

3. NLP Integration (Day 4-5):
-   Implement NLP using Google NLP API to extract job details from the pasted text in the New Job Form.
-   Auto-fill form fields with extracted data for user editing.

4. Kanban Board (Day 5-6):
-   Build the drag-and-drop Kanban Board for job tracking with stages (Wishlist, Applied, Interview, Offer, Rejected).
-   Test functionality using mock data.

5. Responsiveness (Throughout Week 1):
-   Use SCSS media queries to ensure responsive design across mobile, tablet, and desktop.

**Week 2: 
Features and Finalization**
1.  Calendar View (Day 7-8):
-   Implement a monthly calendar to display number of applied job on each day.

2.  Notifications (Day 9):
-   Set up notifications for application deadlines and interview reminders using an API for email [still thinking]

3.  OAuth for Google Sign-up (Day 10):
-   Integrate Google OAuth for user registration and login.

4.  Backend Features (Day 11):
-   Build all the API endpoints:

5.  Testing and Bug Fixes (Day 12-13):
-   Test all features across devices to ensure responsiveness.
-   Debug the kanban board, calendar, and NLP extraction.

---

## Future Implementations
-   AI Resume Writer: Implement an AI-powered tool that helps users generate optimized resumes tailored to specific job descriptions.
-   AI Cover Letter Writer: Integrate an AI-driven cover letter generator that personalizes cover letters based on the job posting and user’s resume.
-   Job Search within App: Allow users to search and browse job listings directly within the app, pulling from job boards or custom APIs.
-   Browser Extension: Develop a browser extension that allows users to save job listings directly from websites and push them into Grimoire’s job tracker.
-   Companies Database: Create a searchable database of companies with information on culture, benefits, and job opportunities.

