import AdminNavBar from "../../components/admin/AdminNavbar"
import DashboardStatistics from "../../components/admin/DashboardStatistics"
import AddCourse from "../../components/admin/AddCourse"
import CourseList from "../../components/admin/CourseList"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (!storedUser) navigate("/auth/signin")
        else if (storedUser.role != "Admin") navigate("/student/dashboard")
        else setUser(storedUser)
    }, [])

    useEffect(() => {
        fetch("http://localhost:3001/courses")
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    return (
        <>

            <AdminNavBar />
            <div className="flex flex-col items-center gap-10 p-10">
                <p className="text-4xl font-bold">Hey, {user?.name.split(" ")[0]}!</p>
                <DashboardStatistics courses={courses} />
                <div className="tabs tabs-lift w-2/3 flex flex-row justify-center">
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Course List" defaultChecked />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <CourseList courses={courses} setCourses={setCourses} />
                    </div>
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Add Course" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <AddCourse courses={courses} setCourses={setCourses} />
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default AdminDashboard