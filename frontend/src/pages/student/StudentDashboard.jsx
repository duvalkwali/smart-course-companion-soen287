import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [enabledCourses, setEnabledCourses] = useState([])
    const [enrollments, setEnrollments] = useState([])
    const [selectedEnrollment, setSelectedEnrollment] = useState(null)
    const [selectedEnrollmentAssessments, setSelectedEnrollmentAssessments] = useState([])
    const [upcomingAssessments, setUpcomingAssessments] = useState([])
    const [courseAverages, setCourseAverages] = useState({})

    const completedSelectedEnrollmentAssessments = selectedEnrollmentAssessments.filter(a => a.status == "Complete").length
    const totalSelectedEnrollmentAssessments = selectedEnrollmentAssessments.length

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (!storedUser) navigate("/auth/signin")
        else if (storedUser.role != "Student") navigate("/admin/dashboard")
        else setUser(storedUser)

        fetch("http://localhost:3001/enabled-courses")
            .then(res => res.json())
            .then(data => setEnabledCourses(data))
    }, [])

    useEffect(() => {
        if (!user) return
        fetch("http://localhost:3001/user-enrollments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setEnrollments(data))
        
        fetch("http://localhost:3001/student-upcoming-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setUpcomingAssessments(data))
        fetch("http://localhost:3001/all-course-averages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setCourseAverages(data))
    }, [user])

    const handleEnroll = async (course_id) => {
        await fetch("http://localhost:3001/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id, course_id })
        })
        const enrolledCourse = enabledCourses.find(c => c.id === course_id)
        setEnrollments([...enrollments, enrolledCourse].sort((a, b) => a.id - b.id))

        fetch("http://localhost:3001/student-upcoming-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setUpcomingAssessments(data))

        fetch("http://localhost:3001/all-course-averages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setCourseAverages(data))
    }

    const handleUnenroll = async (course_id) => {
        await fetch("http://localhost:3001/unenroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id, course_id })
        })
        setEnrollments(enrollments.filter(e => e.id !== course_id))

        fetch("http://localhost:3001/student-upcoming-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setUpcomingAssessments(data))

        fetch("http://localhost:3001/all-course-averages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setCourseAverages(data))

        document.getElementById("enrollment_modal").close()
    }

    const openEnrollmentModal = async (enrollment) => {
        setSelectedEnrollment(enrollment)
        const res = await fetch("http://localhost:3001/student-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id, course_id: enrollment.id })
        })
        const data = await res.json()
        setSelectedEnrollmentAssessments(data)
        document.getElementById("enrollment_modal").showModal()
    }

    const handleSaveMark = async (assessment) => {
        await fetch("http://localhost:3001/save-mark", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                assessment_id: assessment.id,
                earned: assessment.earned,
                total: assessment.total,
                status: assessment.status ?? "Pending"
            })
        })

        fetch("http://localhost:3001/student-upcoming-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setUpcomingAssessments(data))
        fetch("http://localhost:3001/all-course-averages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setCourseAverages(data))
    }

    const handleSaveAllMarks = async () => {
        for (const assessment of selectedEnrollmentAssessments) {

            if (assessment.earned && assessment.total) {
                if (parseFloat(assessment.earned) > parseFloat(assessment.total)) {
                    alert(`Invalid earned for ${assessment.name}`)
                    return
                }
                if (parseFloat(assessment.total) <= 0) {
                    alert(`Invalid total for ${assessment.name}`)
                    return
                }
            }
            if (assessment.earned && !assessment.total) {
                alert(`Invalid total for ${assessment.name}`)
                return
            }
            if (!assessment.earned && assessment.total) {
                alert(`Invalid earned for ${assessment.name}`)
                return
            }

            await fetch("http://localhost:3001/save-mark", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user.id,
                    assessment_id: assessment.id,
                    earned: assessment.earned,
                    total: assessment.total,
                    status: assessment.status ?? "Pending"
                })
            })
        }
        
        fetch("http://localhost:3001/student-upcoming-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setUpcomingAssessments(data))

        fetch("http://localhost:3001/all-course-averages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id })
        })
            .then(res => res.json())
            .then(data => setCourseAverages(data))

        document.getElementById("enrollment_modal").close()
    }

    return (
        <>
            <Navbar user={user} setUser={setUser} />

            <div className="flex flex-col items-center gap-10 p-10"> 
                <p className="text-4xl font-bold">Hey, {user?.name.split(" ")[0]}!</p>


                <div className="tabs tabs-lift w-2/3 flex flex-row justify-center">
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Course List" defaultChecked />
                    <div className="tab-content bg-base-100 border-base-300 p-6">

                        {enrollments.length == 0 ? (
                            <ul className="list bg-base-100 rounded-box shadow">
                                <li className="list-row">
                                    <div className="text-xs font-semibold opacity-60">No courses to display.</div>
                                </li>
                            </ul>
                        ) : (
                            <div className="flex flex-row flex-wrap justify-center gap-4">
                                {enrollments.map((enrollment, index) => (
                                        <div key={index} className="card bg-base-100 w-80 shadow-sm">
                                            <div className="card-body">
                                                <h2 className="card-title">{enrollment.code} - {enrollment.name}</h2>
                                                <p className="text-sm font-bold">
                                                    Average: {courseAverages[enrollment.id] ? `${courseAverages[enrollment.id]}%` : "N/A"}
                                                    <progress className="progress w-full" value={courseAverages[enrollment.id] ? courseAverages[enrollment.id] : 0} max="100"></progress>
                                                </p>
                                                <p>{enrollment.term} - {enrollment.instructor}</p>
                                                <div className="card-actions justify-end">
                                                    <div className="tooltip" data-tip="Open">
                                                        <button className="btn btn-square" onClick={() => openEnrollmentModal(enrollment)}>
                                                            <img className="w-5" src="https://img.icons8.com/?size=100&id=98028&format=png&color=000000" alt="Open" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}


                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Enrollment" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <fieldset className="fieldset w-full"><legend className="fieldset-legend">Available Courses</legend></fieldset>

                        <ul className="list bg-base-100 rounded-box shadow">

                            {enabledCourses.filter(c => !enrollments.some(e => e.id == c.id)).length == 0 ? (

                                <li className="list-row">
                                    <div className="text-xs font-semibold opacity-60">No courses to display.</div>
                                </li>

                            ) : enabledCourses.filter(c => !enrollments.some(e => e.id == c.id)).map((course, index) => (
                                    <li key={index} className="list-row">
                                        <div>
                                            <div>{course.code} - {course.name}</div>
                                            <div className="text-xs font-semibold opacity-60">{course.term} - {course.instructor}</div>
                                        </div>
                                        <div className="flex flex-row ml-auto gap-1">
                                            <div className="tooltip" data-tip="Enroll">
                                                <button className="btn btn-square btn-ghost" onClick={() => handleEnroll(course.id)}>
                                                    <img className="w-5" src="https://img.icons8.com/?size=100&id=86326&format=png&color=000000" alt="Enroll" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                        
                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Upcoming Assessments" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <fieldset className="fieldset w-full"><legend className="fieldset-legend">Upcoming Assessments</legend></fieldset>

                        <ul className="list bg-base-100 rounded-box shadow">

                            {upcomingAssessments.length == 0 ? (
                                <li className="list-row">
                                    <div className="text-xs font-semibold opacity-60">No assessments to display.</div>
                                </li>
                            ) : upcomingAssessments.map((assessment, index) => (
                                    <li key={index} className="list-row">
                                        <div>
                                            <div>{assessment.name}</div>
                                            <div className="text-xs font-semibold opacity-60">{assessment.course_code} - {assessment.course_name} - {assessment.weight}% - Due {assessment.due_date}</div>

                                        </div>
                                        <div className="flex flex-row ml-auto gap-1">
                                            <div className="tooltip" data-tip="Complete">
                                                <button className="btn btn-square btn-ghost" onClick={() => handleSaveMark({ ...assessment, status: "Complete" })}>
                                                    <img className="w-5" src="https://img.icons8.com/?size=100&id=82759&format=png&color=000000" alt="Complete" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                        
                    </div>
                </div>

                

            </div>
                            

            <dialog id="enrollment_modal" className="modal">
                <div className="modal-box max-h-8/10 max-w-8/10">
                    {selectedEnrollment && (
                        <>
                            <h3 className="font-bold text-lg">{selectedEnrollment.code} - {selectedEnrollment.name}</h3>
                            <p className="text-sm opacity-60 mb-4">{selectedEnrollment.term} - {selectedEnrollment.instructor}</p>

                            <p className="text-sm font-bold mb-4">
                                Progress: {completedSelectedEnrollmentAssessments}/{totalSelectedEnrollmentAssessments}
                                <progress className="progress w-full" value={completedSelectedEnrollmentAssessments} max={totalSelectedEnrollmentAssessments}></progress>
                            </p>

                            <ul className="list bg-base-100 rounded-box shadow overflow-y-auto max-h-80">
                                {selectedEnrollmentAssessments.length == 0 ? (
                                    <li className="list-row">
                                        <div className="text-xs font-semibold opacity-60">No assessments to display.</div>
                                    </li>

                                ) : selectedEnrollmentAssessments.map((assessment, index) => (
                                        <li key={index} className="list-row">
                                            <div>
                                                <div>{assessment.name}</div>
                                                <div className="text-xs font-semibold opacity-60">{assessment.weight}% - {assessment.due_date}</div>
                                            </div>

                                            <div className="flex flex-row gap-2">
                                                <select 
                                                    className="select" 
                                                    value={assessment.status ?? "Pending"}  
                                                    onChange={e => {
                                                        const updated = [...selectedEnrollmentAssessments]
                                                        if (e.target.value == "Pending") {
                                                            updated[index] = { ...assessment, status: "Pending", earned: null, total: null }
                                                        } else {
                                                            updated[index] = { ...assessment, status: e.target.value }
                                                        }
                                                        setSelectedEnrollmentAssessments(updated)
                                                    }}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Complete">Complete</option>
                                                </select>
                                                {assessment.status == "Complete" && (
                                                    <>
                                                        <input
                                                            type="number"
                                                            className="input"
                                                            placeholder="Earned"
                                                            value={assessment.earned ?? ""}
                                                            onChange={e => {
                                                                const updated = [...selectedEnrollmentAssessments]
                                                                updated[index] = { ...assessment, earned: e.target.value }
                                                                setSelectedEnrollmentAssessments(updated)
                                                            }}
                                                        />
                                                        <input
                                                            type="number"
                                                            className="input"
                                                            placeholder="Total"
                                                            value={assessment.total ?? ""}
                                                            onChange={e => {
                                                                const updated = [...selectedEnrollmentAssessments]
                                                                updated[index] = { ...assessment, total: e.target.value }
                                                                setSelectedEnrollmentAssessments(updated)
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </div>

                                        </li>
                                    )
                                )}
                            </ul>

                            <div className="modal-action">
                                <div className="tooltip mr-auto" data-tip="Unenroll">
                                    <button className="btn btn-square" onClick={() => handleUnenroll(selectedEnrollment.id)}>
                                        <img className="w-5" src="https://img.icons8.com/?size=100&id=3C7IH9dQArFF&format=png&color=000000" alt="Unenroll" />
                                    </button>
                                </div>
                                
                                <form method="dialog">
                                    <div className="tooltip" data-tip="Cancel">
                                        <button className="btn btn-square">
                                            <img className="w-5" src="https://img.icons8.com/?size=100&id=82764&format=png&color=000000" alt="Cancel" />
                                        </button> 
                                    </div>
                                                                  
                                </form>
                                <div className="tooltip" data-tip="Save">
                                    <button className="btn btn-square" onClick={handleSaveAllMarks}>
                                        <img className="w-5" src="https://img.icons8.com/?size=100&id=82736&format=png&color=000000" alt="Save" />
                                    </button>
                                </div>
                                
                            </div>
                        </>
                    )}
                </div>
            </dialog>



        </>
    )
}

export default StudentDashboard