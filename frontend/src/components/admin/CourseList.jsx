import { useState } from "react"

function CourseList({ courses, setCourses }) {
    const [selectedCourse, setSelectedCourse] = useState(null)

    const [assessments, setAssessments] = useState([])
    const [assessmentName, setAssessmentName] = useState("")
    const [assessmentWeight, setAssessmentWeight] = useState("")
    const [assessmentDueDate, setAssessmentDueDate] = useState("")

    const handleEditCourse = async () => {
        await fetch("http://localhost:3001/edit-course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedCourse)
        })
        setCourses(courses.map(c => {
            if (c.id == selectedCourse.id) return selectedCourse
            return c
        }))
        document.getElementById("course_modal").close()
    }

    const handleToggleCourse = async (course) => {
        await fetch("http://localhost:3001/toggle-course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: course.id })
        })
        setCourses(courses.map(c => {
            if (c.id == course.id) return { ...c, enabled: c.enabled ? 0 : 1 }
            return c
        }))
    }

    const handleDeleteCourse = async (id) => {
        await fetch("http://localhost:3001/delete-course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        setCourses(courses.filter(c => c.id != id))
        document.getElementById("course_modal").close()
    }

    const handleAddAssessment = async () => {
        const res = await fetch("http://localhost:3001/add-assessment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ course_id: selectedCourse.id, name: assessmentName, weight: assessmentWeight, due_date: assessmentDueDate })
        })
        const data = await res.json()
        setAssessments([...assessments, { id: data.id, course_id: selectedCourse.id, name: assessmentName, weight: assessmentWeight, due_date: assessmentDueDate }])
        setAssessmentName("")
        setAssessmentWeight("")
        setAssessmentDueDate("")
    }

    const handleDeleteAssessment = async (id) => {
        await fetch("http://localhost:3001/delete-assessment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        setAssessments(assessments.filter(a => a.id != id))
    }

    const openCourseModal = async (course) => {
        setSelectedCourse(course)
        const res = await fetch("http://localhost:3001/course-assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ course_id: course.id })
        })

        const data = await res.json();
        setAssessments(data);
        document.getElementById("course_modal").showModal()
    }

    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow">
                {courses.length == 0 ? (

                    <li className="list-row">
                        <div className="text-xs font-semibold opacity-60">No courses to display.</div>
                    </li>

                ) : courses.map((course, index) => (
                        <li key={index} className="list-row">
                            <div className="flex flex-row ml-auto gap-1">
                                <button className={`btn btn-square btn-ghost flex items-center ${course.enabled ? "" : "btn-outline btn-error"}`} onClick={() => handleToggleCourse(course)}>
                                    <img className="w-5" src="https://img.icons8.com/?size=100&id=82553&format=png&color=000000" alt="Disabled" />
                                </button>
                                <button className={`btn btn-square btn-ghost flex items-center ${course.enabled ? "btn-outline btn-success" : ""}`} onClick={() => handleToggleCourse(course)}> 
                                    <img className="w-5" src="https://img.icons8.com/?size=100&id=82759&format=png&color=000000" alt="Enabled" />
                                </button>
                            </div>
                            <div>
                                <div>{course.code} - {course.name}</div>
                                <div className="text-xs font-semibold opacity-60">{course.term} - {course.instructor}</div>
                            </div>
                            <div className="flex flex-row ml-auto gap-1">
                                <button className="btn btn-square btn-ghost" onClick={() => openCourseModal(course)}>
                                    <img className="w-5" src="https://img.icons8.com/?size=100&id=86373&format=png&color=000000" alt="Edit" />
                                </button>
                            </div>
                        </li>
                    )
                )}
            </ul>

            <dialog id="course_modal" className="modal">
                <div className="modal-box max-h-8/10 max-w-8/10">
                    <h3 className="font-bold text-lg">Edit Course</h3>
                    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                    <div className="flex flex-row gap-8">

                        {selectedCourse && (
                            <>
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend">Edit Course</legend>

                                    <label className="label">Name</label>
                                    <input type="text" className="input w-full" value={selectedCourse.name} onChange={e => setSelectedCourse({ ...selectedCourse, name: e.target.value })} />

                                    <label className="label">Code</label>
                                    <input type="text" className="input w-full" value={selectedCourse.code} onChange={e => setSelectedCourse({ ...selectedCourse, code: e.target.value })} />

                                    <label className="label">Instructor</label>
                                    <input type="text" className="input w-full" value={selectedCourse.instructor} onChange={e => setSelectedCourse({ ...selectedCourse, instructor: e.target.value })} />

                                    <label className="label">Term</label>
                                    <input type="text" className="input w-full" value={selectedCourse.term} onChange={e => setSelectedCourse({ ...selectedCourse, term: e.target.value })} />
                                </fieldset>
                                <div className="w-full">
                                    <fieldset className="fieldset w-full"><legend className="fieldset-legend">Course Assessments</legend></fieldset>

                                    <ul className="list bg-base-100 rounded-box shadow overflow-y-auto max-h-80">

                                        {assessments.length == 0 ? (
                                            <li className="list-row">
                                                <div className="text-xs font-semibold opacity-60">No assessments to display.</div>
                                            </li>

                                        ) : assessments.map((assessment, index) => (
                                                <li key={index} className="list-row">
                                                    <div>
                                                        <div>{assessment.name}</div>
                                                        <div className="text-xs font-semibold opacity-60">{assessment.weight}% - {assessment.due_date}</div>
                                                    </div>
                                                    <div className="flex flex-row ml-auto gap-1">
                                                        <button className="btn btn-square btn-ghost" onClick={() => handleDeleteAssessment(assessment.id)}>
                                                            <img className="w-5" src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="Delete" />
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                </div>
                                
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend">Add Assessment</legend>
                                    <label className="label">Name</label>
                                    <input type="text" className="input w-full" placeholder="Midterm Exam" value={assessmentName} onChange={e => setAssessmentName(e.target.value)} />

                                    <label className="label">Weight (%)</label>
                                    <input type="number" className="input w-full" placeholder="25" value={assessmentWeight} onChange={e => setAssessmentWeight(e.target.value)} />

                                    <label className="label">Due Date</label>
                                    <input type="date" className="input w-full" value={assessmentDueDate} onChange={e => setAssessmentDueDate(e.target.value)} />

                                    <button className="btn btn-square mt-4" onClick={handleAddAssessment}>
                                        <img className="w-5" src="https://img.icons8.com/?size=100&id=84991&format=png&color=000000" alt="Add" />
                                    </button>
                                </fieldset>

                            </>
                            
                        )}
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-square mr-auto" onClick={() => handleDeleteCourse(selectedCourse.id)}>
                            <img className="w-5" src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="Delete" />
                        </button>
                        <form method="dialog">
                            <button className="btn btn-square">
                                <img className="w-5" src="https://img.icons8.com/?size=100&id=82764&format=png&color=000000" alt="Cancel" />
                            </button>
                        </form>
                        <button className="btn btn-square" onClick={handleEditCourse}>
                            <img className="w-5" src="https://img.icons8.com/?size=100&id=82736&format=png&color=000000" alt="Save" />
                        </button>

                    </div>
                </div>
            </dialog>
        </>
        
    )
}

export default CourseList