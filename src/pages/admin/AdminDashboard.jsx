import AdminNavBar from "../../components/admin/AdminNavbar"
import CourseStatus from "../../components/admin/CourseStatus"

function AdminDashboard() {

    const courses = [
        { code: "COMP 249", name: "Object-Oriented Programming II", term: "Winter 2026" },
        { code: "ENGR 233", name: "Applied Advanced Calculus", term: "Winter 2026" },
        { code: "SOEN 228", name: "System Hardware", term: "Winter 2026" },
        { code: "SOEN 287", name: "Web Programming", term: "Winter 2026" },
        { code: "SOEN 287", name: "Web Programming", term: "Winter 2026" }
    ]

    const assessments = [
        { name: "Test 1", weight: 10 },
        { name: "Test 2", weight: 10 },
        { name: "Quiz 1", weight: 5 },
        { name: "Quiz 2", weight: 5 },
        { name: "Quiz 3", weight: 5 },
        { name: "Midterm Exam", weight: 25 },
        { name: "Final Exam", weight: 40 }
    ]
    
    return (
        <>
            <AdminNavBar></AdminNavBar>

            <div className="flex flex-col items-center gap-10 p-10"> 

                <div className="stats shadow w-1/2">
                    <div className="stat">
                        <div className="stat-figure">
                            <img src="https://img.icons8.com/?size=100&id=85057&format=png&color=000000" alt="Group" className="w-10" />
                        </div>
                        <div className="stat-title">Students</div>
                        <div className="stat-value">5232</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure">
                            <img src="https://img.icons8.com/?size=100&id=82464&format=png&color=000000" alt="Book" className="w-10" />
                        </div>
                        <div className="stat-title">Courses</div>
                        <div className="stat-value">635</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure">
                            <img src="https://img.icons8.com/?size=100&id=85929&format=png&color=000000" alt="Light Bulb" className="w-10" />
                        </div>
                        <div className="stat-title">Active Courses</div>
                        <div className="stat-value">532</div>
                    </div>
                </div>

                <div className="tabs tabs-lift w-2/3 flex flex-row justify-center">
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Course List" defaultChecked />
                    <div className="tab-content bg-base-100 border-base-300 p-6">

                        <label className="input">
                            <img src="https://img.icons8.com/?size=100&id=82712&format=png&color=000000" alt="Search" className="w-5"/>
                            <input type="search" placeholder="Search courses" />
                        </label>

                        <ul className="list bg-base-100 rounded-box shadow">
                            {courses.map((course, index) => (
                                <li key={index} className="list-row">
                                    <CourseStatus />
                                    <div>
                                        <div>
                                            {course.code} - {course.name}
                                        </div>
                                        <div className="text-xs font-semibold opacity-60">
                                            {course.term}
                                        </div>
                                    </div>
                                    <div className="flex flex-row ml-auto gap-1">
                                        <button className="btn btn-square btn-ghost" onClick={()=>document.getElementById(`${course.name}_view_modal`).showModal()}>
                                            <img className="w-5" src="https://img.icons8.com/?size=100&id=85028&format=png&color=000000" alt="View" />
                                        </button>
                                        <button className="btn btn-square btn-ghost">
                                            <img className="w-5" src="https://img.icons8.com/?size=100&id=86373&format=png&color=000000" alt="Edit" />
                                        </button>
                                        <button className="btn btn-square btn-ghost">
                                            <img className="w-5" src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="Delete" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Add Course" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Code</label>
                            <input type="text" className="input w-full" placeholder="MATH 205" />

                            <label className="label">Name</label>
                            <input type="text" className="input w-full" placeholder="Differential & Integral Calculus II" />

                            <label className="label">Term</label>
                            <input type="text" className="input w-full" placeholder="Winter 2025" />

                            <button className="btn btn-neutral mt-4">Add Course</button>
                        </fieldset>   
                    </div>
                </div>

            </div>

            {courses.map((course, index) => (
                <dialog key={index} id={`${course.name}_view_modal`} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{course.code} - {course.name}</h3>
                        <p className="py-4">{course.term}</p>
                        <p class="font-bold">Course Assessments</p>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assessments.map((assessment, index) => (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{assessment.name}</td>
                                            <td>{assessment.weight}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            ))}
        </>

    )
}

export default AdminDashboard