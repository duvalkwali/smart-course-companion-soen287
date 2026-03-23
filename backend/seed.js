const Database = require("better-sqlite3")
const bcrypt = require("bcrypt")
const db = new Database("database.db")

// Users
db.prepare("INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run("Adam Admin", "admin@mail.com", bcrypt.hashSync("123", 10), "Admin")
db.prepare("INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run("Nathan Au", "nathan@mail.com", bcrypt.hashSync("123", 10), "Student")

// Courses
const courses = [
    { name: "Web Programming", code: "SOEN 287", instructor: "Jane Smith", term: "Winter 2026" },
    { name: "Data Structures", code: "COMP 352", instructor: "Bob Jones", term: "Winter 2026" },
    { name: "Calculus 2", code: "MATH 204", instructor: "Alice Brown", term: "Winter 2026" },
    { name: "Linear Algebra", code: "MATH 251", instructor: "Charlie Davis", term: "Winter 2026" },
    { name: "Discrete Math", code: "COMP 232", instructor: "Eve Wilson", term: "Winter 2026" },
    { name: "Software Engineering", code: "SOEN 341", instructor: "James Carter", term: "Winter 2026" },
    { name: "Operating Systems", code: "COMP 346", instructor: "Laura Kim", term: "Winter 2026" },
    { name: "Database Systems", code: "COMP 353", instructor: "Michael Lee", term: "Winter 2026" },
    { name: "Computer Networks", code: "COMP 445", instructor: "Sarah Chen", term: "Winter 2026" },
    { name: "Artificial Intelligence", code: "COMP 472", instructor: "David Park", term: "Winter 2026" },
    { name: "Machine Learning", code: "COMP 551", instructor: "Emma Wilson", term: "Winter 2026" },
    { name: "Computer Vision", code: "COMP 558", instructor: "Oliver Brown", term: "Winter 2026" },
    { name: "Algorithms", code: "COMP 465", instructor: "Sophia Davis", term: "Winter 2026" },
    { name: "Theory of Computation", code: "COMP 335", instructor: "Liam Johnson", term: "Winter 2026" },
    { name: "Programming Languages", code: "COMP 348", instructor: "Ava Martinez", term: "Winter 2026" },
    { name: "Compiler Design", code: "COMP 442", instructor: "Noah Thompson", term: "Winter 2026" },
    { name: "Computer Graphics", code: "COMP 371", instructor: "Isabella White", term: "Winter 2026" },
    { name: "Numerical Methods", code: "MATH 354", instructor: "Mason Harris", term: "Winter 2026" },
    { name: "Probability and Statistics", code: "MATH 264", instructor: "Charlotte Lewis", term: "Winter 2026" },
    { name: "Differential Equations", code: "MATH 260", instructor: "Elijah Walker", term: "Winter 2026" },
    { name: "Advanced Calculus", code: "MATH 364", instructor: "Amelia Hall", term: "Winter 2026" },
    { name: "Abstract Algebra", code: "MATH 335", instructor: "James Allen", term: "Winter 2026" },
    { name: "Real Analysis", code: "MATH 354", instructor: "Mia Young", term: "Winter 2026" },
    { name: "Complex Analysis", code: "MATH 466", instructor: "Benjamin King", term: "Winter 2026" },
    { name: "Topology", code: "MATH 475", instructor: "Harper Scott", term: "Winter 2026" },
    { name: "Physics 1", code: "PHYS 204", instructor: "Evelyn Green", term: "Winter 2026" },
    { name: "Physics 2", code: "PHYS 205", instructor: "Sebastian Baker", term: "Winter 2026" },
    { name: "Quantum Mechanics", code: "PHYS 354", instructor: "Aria Adams", term: "Winter 2026" },
    { name: "Thermodynamics", code: "PHYS 232", instructor: "Henry Nelson", term: "Winter 2026" },
    { name: "Electromagnetism", code: "PHYS 342", instructor: "Scarlett Carter", term: "Winter 2026" },
    { name: "Engineering Mathematics", code: "ENGR 213", instructor: "Jack Mitchell", term: "Winter 2026" },
    { name: "Circuit Analysis", code: "ELEC 251", instructor: "Lily Perez", term: "Winter 2026" },
    { name: "Digital Systems", code: "ELEC 342", instructor: "Owen Roberts", term: "Winter 2026" },
    { name: "Signal Processing", code: "ELEC 421", instructor: "Zoe Turner", term: "Winter 2026" },
    { name: "Embedded Systems", code: "ELEC 462", instructor: "Lucas Phillips", term: "Winter 2026" },
    { name: "Robotics", code: "MECH 412", instructor: "Chloe Campbell", term: "Winter 2026" },
    { name: "Fluid Mechanics", code: "MECH 321", instructor: "Nathan Parker", term: "Winter 2026" },
    { name: "Structural Analysis", code: "CIVI 341", instructor: "Penelope Evans", term: "Winter 2026" },
]

const insert_course = db.prepare("INSERT OR IGNORE INTO courses (name, code, instructor, term) VALUES (?, ?, ?, ?)")

for (const course of courses) {
    insert_course.run(course.name, course.code, course.instructor, course.term)
}

// Assessments (3 per course)
const all_courses = db.prepare("SELECT * FROM courses").all()
const insert_assessment = db.prepare("INSERT OR IGNORE INTO assessments (course_id, name, category, description, weight, due_date) VALUES (?, ?, ?, ?, ?, ?)")

for (const course of all_courses) {
    insert_assessment.run(course.id, "Assignment 1", "Assignment", "First assignment of the semester", 20, "2026-02-15")
    insert_assessment.run(course.id, "Midterm Exam", "Exam", "Covers weeks 1-6", 35, "2026-03-01")
    insert_assessment.run(course.id, "Final Exam", "Exam", "Covers all course material", 45, "2026-04-15")
}

console.log("Seed data inserted successfully.")