const express = require("express")
const cors = require("cors")
const Database = require("better-sqlite3")

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database("database.db")
db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        instructor TEXT NOT NULL,
        term TEXT NOT NULL,
        enabled INTEGER DEFAULT 1
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        weight REAL NOT NULL,
        due_date TEXT,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE(user_id, course_id)
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS marks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        assessment_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        earned REAL,
        total REAL,
        status TEXT DEFAULT 'Pending',
        FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id, assessment_id)
    )
`)

app.get("/users", (req, res) => {
    const get_all_users = db.prepare("SELECT * FROM users")
    const result = get_all_users.all()
    res.json(result)
})

app.get("/students", (req, res) => {
    const get_all_students = db.prepare("SELECT * FROM users WHERE role ='Student'")
    const result = get_all_students.all()
    res.json(result)
})

app.post("/signup", (req, res) => {
    const { name, email, password, role } = req.body
    const insert_user = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)")
    const result = insert_user.run(name, email, password, role)
    res.json(result)
})

app.post("/signin", (req, res) => {
    const { email, password } = req.body
    const select_user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?")
    const result = select_user.get(email, password)
    res.json(result)
})

app.get("/courses", (req, res) => {
    const get_all_courses = db.prepare("SELECT * FROM courses")
    const result = get_all_courses.all()
    res.json(result)
})

app.post("/add-course", (req, res) => {
    const { name, code, instructor, term } = req.body
    const insert_course = db.prepare("INSERT INTO courses (name, code, instructor, term) VALUES (?, ?, ?, ?)")
    const result = insert_course.run(name, code, instructor, term)
    res.json(result)
})

app.post("/edit-course", (req, res) => {
    const { id, name, code, instructor, term } = req.body
    const update_course = db.prepare("UPDATE courses SET name = ?, code = ?, instructor = ?, term = ? WHERE id = ?");
    const result = update_course.run(name, code, instructor, term, id);
    res.json(result);
})

app.post("/delete-course", (req, res) => {
    const { id } = req.body
    const delete_course = db.prepare("DELETE FROM courses WHERE id = ?")
    const result = delete_course.run(id)
    res.json(result)
})

app.post("/toggle-course", (req, res) => {
    const { id } = req.body
    const toggle_course = db.prepare("UPDATE courses SET enabled = 1 - enabled WHERE id = ?")
    const result = toggle_course.run(id)
    res.json(result)
})

app.get("/assessments", (req, res) => {
    const get_all_assessments = db.prepare("SELECT * FROM assessments")
    const result = get_all_assessments.all()
    res.json(result)
})

app.post("/course-assessments", (req, res) => {
    const { course_id } = req.body
    const get_course_assessments = db.prepare("SELECT * FROM assessments WHERE course_id = ?")
    res.json(get_course_assessments.all(course_id))
})

app.post("/add-assessment", (req, res) => {
    const { course_id, name, weight, due_date } = req.body
    const insert_assessment = db.prepare("INSERT INTO assessments (course_id, name, weight, due_date) VALUES (?, ?, ?, ?)")
    const result = insert_assessment.run(course_id, name, weight, due_date)
    res.json({ id: result.lastInsertRowid })
})

app.post("/delete-assessment", (req, res) => {
    const { id } = req.body
    const delete_assessment = db.prepare("DELETE FROM assessments WHERE id = ?")
    const result = delete_assessment.run(id)
    res.json(result)
})

app.get("/enabled-courses", (req, res) => {
    const get_enabled_courses = db.prepare("SELECT * FROM courses WHERE enabled = 1")
    const result = get_enabled_courses.all()
    res.json(result)
})

app.get("/enrollments", (req, res) => {
    const get_all_enrollments = db.prepare("SELECT * FROM enrollments")
    const result = get_all_enrollments.all()
    res.json(result)
})

app.post("/user-enrollments", (req, res) => {
    const { user_id } = req.body
    const get_user_enrollments = db.prepare("SELECT courses.* FROM enrollments JOIN courses ON courses.id = enrollments.course_id WHERE enrollments.user_id = ?")
    res.json(get_user_enrollments.all(user_id))
})

app.post("/enroll", (req, res) => {
    const { user_id, course_id } = req.body
    const insert_enrollment = db.prepare("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)")
    const result = insert_enrollment.run(user_id, course_id)
    res.json(result)
})

app.post("/unenroll", (req, res) => {
    const { user_id, course_id } = req.body

    db.prepare("DELETE FROM marks WHERE user_id = ? AND assessment_id IN (SELECT id FROM assessments WHERE course_id = ?)").run(user_id, course_id)

    const delete_enrollment = db.prepare("DELETE FROM enrollments WHERE user_id = ? AND course_id = ?")
    const result = delete_enrollment.run(user_id, course_id)
    res.json(result)
})

app.post("/student-assessments", (req, res) => {
    const { user_id, course_id } = req.body
    const get_course_assessments_with_marks = db.prepare(`
        SELECT assessments.*, marks.earned, marks.total, marks.status
        FROM assessments
        LEFT JOIN marks ON marks.assessment_id = assessments.id AND marks.user_id = ?
        WHERE assessments.course_id = ?
    `)
    res.json(get_course_assessments_with_marks.all(user_id, course_id))
})

app.post("/save-mark", (req, res) => {
    const { user_id, assessment_id, earned, total, status } = req.body
    const upsert_mark = db.prepare(`
        INSERT INTO marks (user_id, assessment_id, earned, total, status)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, assessment_id) DO UPDATE SET
        earned = excluded.earned,
        total = excluded.total,
        status = excluded.status
    `)
    const result = upsert_mark.run(user_id, assessment_id, earned, total, status)
    res.json(result)
})

app.get("/marks", (req, res) => {
    const get_all_marks = db.prepare("SELECT * FROM marks")
    const result = get_all_marks.all()
    res.json(result)
})

app.post("/student-upcoming-assessments", (req, res) => {
    const { user_id } = req.body
    const get_upcoming = db.prepare(`
        SELECT assessments.*, courses.name as course_name, courses.code as course_code,
               marks.earned, marks.total, marks.status
        FROM assessments
        JOIN enrollments ON enrollments.course_id = assessments.course_id AND enrollments.user_id = ?
        JOIN courses ON courses.id = assessments.course_id
        LEFT JOIN marks ON marks.assessment_id = assessments.id AND marks.user_id = ?
        WHERE marks.status IS NULL OR marks.status = 'Pending'
        ORDER BY assessments.due_date ASC
    `)
    const result = get_upcoming.all(user_id, user_id)
    res.json(result)
})

app.post("/all-course-averages", (req, res) => {
    const { user_id } = req.body
    const get_enrollments = db.prepare("SELECT course_id FROM enrollments WHERE user_id = ?")
    const enrollments = get_enrollments.all(user_id)

    const get_marks = db.prepare(`
        SELECT assessments.weight, marks.earned, marks.total
        FROM assessments
        LEFT JOIN marks ON marks.assessment_id = assessments.id AND marks.user_id = ?
        WHERE assessments.course_id = ? AND marks.status = 'Complete'
    `)

    const averages = {}
    for (const enrollment of enrollments) {
        const marks = get_marks.all(user_id, enrollment.course_id)
        const valid_marks = marks.filter(m => 
            m.earned != null && m.earned !== "" &&
            m.total != null && m.total !== "" && 
            m.total != 0
        )
        if (valid_marks.length === 0) {
            averages[enrollment.course_id] = null
        } else {
            const weighted_sum = valid_marks.reduce((sum, m) => sum + (parseFloat(m.earned) / parseFloat(m.total)) * m.weight, 0)
            const total_weight = valid_marks.reduce((sum, m) => sum + m.weight, 0)
            averages[enrollment.course_id] = ((weighted_sum / total_weight) * 100).toFixed(2)
        }
    }

    res.json(averages)
})

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001")
})