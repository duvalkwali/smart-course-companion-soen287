import { useState, useEffect } from "react"

function CourseList() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/courses")
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    return (
        <>
            {courses.map((course, index) => (
                <div key={index} className="card bg-base-100 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">{course.code} - {course.name}</h2>
                        <p>{course.term} - {course.instructor}</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Something</button>
                        </div>
                    </div>
                </div>

            ))}
        </>
    )
}

export default CourseList