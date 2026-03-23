# Smart Course Companion — Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Database Schema](#database-schema)
6. [API Reference](#api-reference)
7. [Frontend Architecture](#frontend-architecture)
8. [Pages & Components](#pages--components)
9. [Feature Walkthrough](#feature-walkthrough)
10. [Data Flow](#data-flow)
11. [Seed Data](#seed-data)
12. [Known Limitations & Future Plans](#known-limitations--future-plans)

---

## Project Overview

**Smart Course Companion** is a full-stack web application designed for university students and administrators to manage courses and track academic assessments. Students can enroll in courses, log grades, and monitor upcoming deadlines, while admins can manage the course catalog and view completion statistics.

> "Master Your Semester, One Assessment at a Time."

The application currently supports Montreal-area universities including Concordia, McGill, Université de Montréal, Polytechnique Montréal, and HEC Montréal.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS v4, DaisyUI v5 |
| Build Tool | Vite 7 |
| Backend | Node.js, Express 5 |
| Database | SQLite via `better-sqlite3` |
| Dev Server | Nodemon |

---

## Project Structure

```
smart-course-companion/
├── backend/
│   ├── server.js          # Express server & all API routes
│   ├── seed.js            # Database seed script
│   ├── database.db        # SQLite database (generated at runtime)
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx               # App entry point & router
        ├── App.jsx                # Landing page
        ├── index.css              # Global styles
        ├── components/
        │   ├── Navbar.jsx         # Shared navigation bar
        │   └── admin/
        │       ├── AddCourse.jsx
        │       ├── CourseList.jsx
        │       └── DashboardStatistics.jsx
        └── pages/
            ├── auth/
            │   ├── SignIn.jsx
            │   └── SignUp.jsx
            ├── admin/
            │   └── AdminDashboard.jsx
            └── student/
                └── StudentDashboard.jsx
```

---

## Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Steps

**1. Clone or download the project**

```bash
cd smart-course-companion
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Seed the database (first-time only)**

```bash
node seed.js
```

This creates `database.db` and populates it with sample users, courses, and assessments.

**4. Start the backend server**

```bash
npm run dev
# Server runs at http://localhost:3001
```

**5. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

**6. Start the frontend dev server**

```bash
npm run dev
# App runs at http://localhost:5173
```

### Default Seed Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@mail.com | 123 |
| Student | nathan@mail.com | 123 |

---

## Database Schema

The SQLite database consists of five tables with foreign key constraints enforced.

### `users`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Full name |
| email | TEXT | Unique |
| password | TEXT | Plain text (no hashing currently) |
| role | TEXT | `"Student"` or `"Admin"` |

### `courses`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Course title |
| code | TEXT | Unique course code (e.g. `SOEN 287`) |
| instructor | TEXT | Instructor name |
| term | TEXT | e.g. `Winter 2026` |
| enabled | INTEGER | `1` = active, `0` = disabled |

### `assessments`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| course_id | INTEGER | Foreign key → `courses.id` |
| name | TEXT | Assessment name |
| category | TEXT | `Assignment`, `Exam`, `Lab`, `Quiz`, or `Project` |
| description | TEXT | Optional description |
| weight | REAL | Percentage weight (0–100) |
| due_date | TEXT | Optional, stored as `YYYY-MM-DD` string |

### `enrollments`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| user_id | INTEGER | Foreign key → `users.id` |
| course_id | INTEGER | Foreign key → `courses.id` |
| — | — | Unique constraint on `(user_id, course_id)` |

### `marks`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| assessment_id | INTEGER | Foreign key → `assessments.id` |
| user_id | INTEGER | Foreign key → `users.id` |
| earned | REAL | Score earned by student |
| total | REAL | Total possible score |
| status | TEXT | `"Pending"` (default) or `"Complete"` |
| — | — | Unique constraint on `(user_id, assessment_id)` |

### Entity Relationship Summary

```
users ──< enrollments >── courses ──< assessments
users ──< marks >── assessments
```

Cascade deletes are enabled: removing a course removes its assessments and all associated marks.

---

## API Reference

The backend runs on `http://localhost:3001`. All POST endpoints accept and return JSON.

### Authentication

#### `POST /signup`
Register a new user.

**Body:** `{ name, email, password, role }`  
**Returns:** `{ id, name, email, role }`  
**Errors:** 400 if fields missing or email invalid; 500 if email already exists.

---

#### `POST /signin`
Authenticate an existing user.

**Body:** `{ email, password }`  
**Returns:** Full user object `{ id, name, email, role }`  
**Errors:** 400 if fields missing; 401 if credentials invalid.

---

#### `POST /edit-user`
Update a user's profile.

**Body:** `{ id, name, email, password? }`  
If `password` is empty or omitted, only `name` and `email` are updated.  
**Returns:** `{ success: true }`

---

### Users

#### `GET /users`
Returns all users.

#### `GET /students`
Returns all users with `role = 'Student'`.

---

### Courses

#### `GET /courses`
Returns all courses (enabled and disabled).

#### `GET /enabled-courses`
Returns only courses with `enabled = 1`.

#### `POST /add-course`
**Body:** `{ name, code, instructor, term }`  
**Returns:** SQLite run result with `lastInsertRowid`.

#### `POST /edit-course`
**Body:** `{ id, name, code, instructor, term }`  
**Returns:** SQLite run result.

#### `POST /delete-course`
**Body:** `{ id }`  
Cascades to delete all related assessments and marks.

#### `POST /toggle-course`
**Body:** `{ id }`  
Flips the `enabled` field between `0` and `1`.

---

### Assessments

#### `GET /assessments`
Returns all assessments across all courses.

#### `POST /course-assessments`
**Body:** `{ course_id }`  
Returns all assessments for a specific course.

#### `POST /add-assessment`
**Body:** `{ course_id, name, category, description, weight, due_date }`  
**Validation:** `name`, `category`, `weight` are required; weight must be a number between 1 and 100.  
**Returns:** `{ id }` of the new assessment.

#### `POST /delete-assessment`
**Body:** `{ id }`

---

### Enrollments

#### `GET /enrollments`
Returns all enrollment records.

#### `POST /user-enrollments`
**Body:** `{ user_id }`  
Returns full course objects for all courses a student is enrolled in.

#### `POST /enroll`
**Body:** `{ user_id, course_id }`

#### `POST /unenroll`
**Body:** `{ user_id, course_id }`  
Also deletes all marks for that student in the course before removing the enrollment.

---

### Marks & Grades

#### `GET /marks`
Returns all mark records.

#### `POST /student-assessments`
**Body:** `{ user_id, course_id }`  
Returns all assessments for a course joined with the student's marks (earned, total, status).

#### `POST /save-mark`
**Body:** `{ user_id, assessment_id, earned, total, status }`  
Uses an `INSERT ... ON CONFLICT ... DO UPDATE` (upsert) pattern.  
**Validation:** `earned` cannot exceed `total`; `total` must be > 0; both must be provided together.

#### `POST /student-upcoming-assessments`
**Body:** `{ user_id }`  
Returns all assessments for enrolled courses where the mark status is `NULL` or `"Pending"`, ordered by `due_date ASC`.

#### `POST /all-course-averages`
**Body:** `{ user_id }`  
Returns an object mapping `course_id → weighted average (%)` for all enrolled courses. Uses only `"Complete"` marks in the calculation. Returns `null` for courses with no completed marks.

**Weighted average formula:**
```
average = (Σ (earned/total) × weight) / (Σ weight) × 100
```

---

### Admin Statistics

#### `GET /admin-course-statistics`
Returns all courses with enrollment count and per-assessment completion stats (how many enrolled students have a `"Complete"` mark).

#### `POST /course-statistics`
**Body:** `{ course_id }`  
Same as above but for a single course.

---

## Frontend Architecture

The frontend is a single-page React application using React Router v7 for client-side navigation.

### Routing

| Path | Component | Description |
|---|---|---|
| `/` | `App` | Landing page |
| `/auth/signup` | `SignUp` | Registration form |
| `/auth/signin` | `SignIn` | Login form |
| `/student/dashboard` | `StudentDashboard` | Student workspace |
| `/admin/dashboard` | `AdminDashboard` | Admin workspace |

### Authentication & Session

User data is persisted in `localStorage` under the key `"user"` as a JSON object. On page load, each dashboard reads from `localStorage` and redirects to sign-in if no session is found. Role-based redirects are also enforced — a student visiting the admin route is redirected to the student dashboard, and vice versa.

### Styling

The app uses **Tailwind CSS v4** with the **DaisyUI v5** component plugin. The default theme is `light` (set via `data-theme="light"` on `<html>`). Components use DaisyUI utility classes (`btn`, `card`, `modal`, `list`, `tabs`, `stats`, `fieldset`, etc.).

---

## Pages & Components

### `App.jsx` — Landing Page

The public-facing homepage. Contains a hero section with the app tagline, a "Get Started for Free" CTA linking to `/auth/signup`, and a rotating text element showing trusted university names. Navigation includes a "Sign In" link.

---

### `SignUp.jsx`

A form collecting name, email, password, and role (Student or Admin). Performs client-side email validation before submitting to `POST /signup`. On success, stores the user in `localStorage` and navigates to the appropriate dashboard.

---

### `SignIn.jsx`

A form collecting email and password. Validates locally then calls `POST /signin`. On success, stores the user and navigates to the appropriate dashboard based on role.

---

### `Navbar.jsx`

Shared navigation bar used across both dashboards. Displays the app name and user role. Contains a dropdown avatar menu with two options:

- **Profile** — Opens a modal to edit name, email, and optionally password. Calls `POST /edit-user` and updates `localStorage` on save.
- **Sign Out** — Clears `localStorage` and navigates to the landing page.

---

### `AdminDashboard.jsx`

The admin's main workspace. On mount, fetches all courses from `GET /courses` and statistics from `GET /admin-course-statistics`. Renders a greeting, dashboard statistics widget, and a tabbed interface with:

- **Course List** tab — `<CourseList />`
- **Add Course** tab — `<AddCourse />`

---

### `DashboardStatistics.jsx`

Displays a stat card showing total student count (fetched from `GET /students`) and total course count (passed as a prop).

---

### `CourseList.jsx`

The main admin course management component. Renders all courses in a list. Each row includes:

- An **enable/disable toggle** (calls `POST /toggle-course`; highlighted green when enabled, red outline when disabled)
- A **view button** — opens a stats modal showing enrollment count and per-assessment completion progress bars
- An **edit button** — opens an edit modal with three panels:
  - Edit course fields (name, code, instructor, term)
  - View/delete existing assessments
  - Add a new assessment

The edit modal also includes a delete button to remove the entire course.

---

### `AddCourse.jsx`

A simple form (name, code, instructor, term) that calls `POST /add-course` and appends the new course to the shared `courses` state.

---

### `StudentDashboard.jsx`

The student's primary workspace. On mount, fetches enabled courses, the user's enrollments, upcoming assessments, and course averages. Renders a tabbed interface with three tabs:

#### Tab 1 — Course List
Displays enrolled courses as cards. Each card shows:
- Course code and name
- Weighted grade average with a progress bar
- Term and instructor
- A button to open the course assessment modal

The **assessment modal** for a course shows:
- Course info header
- Assessment completion progress bar
- A list of all assessments with inline controls to:
  - Set status (`Pending` / `Complete`)
  - Enter `earned` and `total` scores (shown only when `Complete`)
- Actions: unenroll, cancel, or save all marks

#### Tab 2 — Enrollment
Displays all enabled courses the student is not yet enrolled in. Each row has an enroll button that calls `POST /enroll`.

#### Tab 3 — Upcoming Assessments
Lists all pending/incomplete assessments across enrolled courses, sorted by due date. Each row shows a checkmark button to instantly mark an assessment as `"Complete"`.

---

## Feature Walkthrough

### Student: Tracking a Grade

1. Navigate to the **Course List** tab.
2. Click the expand button on a course card.
3. In the modal, change an assessment's status dropdown from `Pending` to `Complete`.
4. Enter the `Earned` and `Total` score fields that appear.
5. Click the save button. The weighted average on the course card updates immediately.

### Admin: Disabling a Course

1. Navigate to the **Course List** tab.
2. Find the course and click the toggle button. The button styling reflects the new state (green = enabled, red outline = disabled).
3. Disabled courses no longer appear in the student enrollment tab.

### Admin: Viewing Course Statistics

1. Click the eye icon on any course row.
2. A modal shows enrollment count and a progress bar per assessment indicating how many enrolled students have completed it.

---

## Data Flow

### Student Grade Calculation

```
POST /all-course-averages
  → For each enrolled course:
      SELECT assessments + marks WHERE status = 'Complete'
      → weighted_sum = Σ (earned / total) × weight
      → total_weight = Σ weight
      → average = (weighted_sum / total_weight) × 100
  → Returns { course_id: "average%" | null }
```

### Upcoming Assessments Query

```
POST /student-upcoming-assessments
  → JOIN assessments ON enrolled courses
  → LEFT JOIN marks ON (assessment_id, user_id)
  → WHERE status IS NULL OR status = 'Pending'
  → ORDER BY due_date ASC
```

---

## Seed Data

Running `node seed.js` from the `backend/` directory populates the database with:

- **2 users**: one Admin (`admin@mail.com`) and one Student (`nathan@mail.com`), both with password `123`
- **55 courses** spanning departments including Computer Science (COMP), Software Engineering (SOEN), Mathematics (MATH), Physics (PHYS), Electrical Engineering (ELEC), Mechanical Engineering (MECH), Civil Engineering (CIVI), and General Engineering (ENCS/ENGR)
- **3 assessments per course** (165 total):
  - Assignment 1 — 20% — due 2026-02-15
  - Midterm Exam — 35% — due 2026-03-01
  - Final Exam — 45% — due 2026-04-15

The seed script uses `INSERT OR IGNORE` to avoid duplicate entries if run multiple times. The `courses` table enforces `UNIQUE` on `code`, so duplicate codes in the seed data (e.g. `COMP 228` appearing twice) will result in only the first entry being inserted.