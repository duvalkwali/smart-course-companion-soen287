const Database = require("better-sqlite3")
const db = new Database("database.db")

// Users
db.prepare("INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run("Adam Admin", "admin@mail.com", "123", "Admin")
db.prepare("INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run("Nathan Au", "nathan@mail.com", "123", "Student")

// Courses
const courses = [
    { name: "Web Programming", code: "SOEN 287", instructor: "Jane Smith", term: "Winter 2026" },
    { name: "Data Structures", code: "COMP 352", instructor: "Bob Jones", term: "Winter 2026" },
    { name: "Calculus 2", code: "MATH 204", instructor: "Alice Brown", term: "Winter 2026" },
    { name: "Linear Algebra", code: "MATH 251", instructor: "Charlie Davis", term: "Winter 2026" },
    { name: "Discrete Math", code: "COMP 232", instructor: "Eve Wilson", term: "Winter 2026" },
]

const insert_course = db.prepare("INSERT OR IGNORE INTO courses (name, code, instructor, term) VALUES (?, ?, ?, ?)")

for (const course of courses) {
    insert_course.run(course.name, course.code, course.instructor, course.term)
}

// Assessments (3 per course)
const all_courses = db.prepare("SELECT * FROM courses").all()
const insert_assessment = db.prepare("INSERT OR IGNORE INTO assessments (course_id, name, weight, due_date) VALUES (?, ?, ?, ?)")

for (const course of all_courses) {
    insert_assessment.run(course.id, "Assignment 1", 20, "2026-02-15")
    insert_assessment.run(course.id, "Midterm Exam", 35, "2026-03-01")
    insert_assessment.run(course.id, "Final Exam",   45, "2026-04-15")
}

console.log("Seed data inserted successfully.")