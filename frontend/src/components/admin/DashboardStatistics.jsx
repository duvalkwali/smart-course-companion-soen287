import { useEffect, useState } from "react";

function DashboardStatistics({ courses }) {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/students")
            .then(res => res.json())
            .then(data => setStudents(data))
    }, [])

    return (
        <div className="stats shadow w-1/2">
            <div className="stat">
                <div className="stat-figure">
                    <img src="https://img.icons8.com/?size=100&id=85057&format=png&color=000000" alt="Group" className="w-10" />
                </div>
                <div className="stat-title">Students</div>
                <div className="stat-value">{students.length}</div>
            </div>
            <div className="stat">
                <div className="stat-figure">
                    <img src="https://img.icons8.com/?size=100&id=82464&format=png&color=000000" alt="Book" className="w-10" />
                </div>
                <div className="stat-title">Courses</div>
                <div className="stat-value">{courses.length}</div>
            </div>
        </div>
    )
}

export default DashboardStatistics