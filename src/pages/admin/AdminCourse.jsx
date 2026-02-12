import AdminNavBar from "./AdminNavbar"

function AdminCourse() {
    return (
        <>

            <AdminNavBar></AdminNavBar>

            <div className="p-10"> 

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure">
                            <img src="https://img.icons8.com/?size=100&id=85057&format=png&color=000000" alt="Group" className="w-10" />
                        </div>
                        <div className="stat-title">Students</div>
                        <div className="stat-value">153</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure">
                            <img src="https://img.icons8.com/?size=100&id=83293&format=png&color=000000" alt="Checklist" className="w-10" />
                        </div>
                        <div className="stat-title">Assessments</div>
                        <div className="stat-value">5</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure">
                            <img src="https://img.icons8.com/?size=100&id=85929&format=png&color=000000" alt="Light Bulb" className="w-10" />
                        </div>
                        <div className="stat-title">Progress</div>
                        <div className="stat-value">34%</div>
                    </div>
                </div>



                <ul className="list bg-base-100 rounded-box shadow-md w-1/2">
  
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Courses</li>


                    <li className="list-row">
                        <div>
                            <div>Quiz 1</div>
                            <div className="text-xs font-semibold opacity-60">5%</div>
                        </div>
                        <div className="flex flex-row ml-auto">
                            <button className="btn btn-square btn-ghost">
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

                    <li className="list-row">
                        <div>
                            <div>Quiz 2</div>
                            <div className="text-xs font-semibold opacity-60">5%</div>
                        </div>
                        <div className="flex flex-row ml-auto">
                            <button className="btn btn-square btn-ghost">
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

                    <li className="list-row">
                        <div>
                            <div>Midterm Exam</div>
                            <div className="text-xs font-semibold opacity-60">30%</div>
                        </div>
                        <div className="flex flex-row ml-auto">
                            <button className="btn btn-square btn-ghost">
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


                    <li className="list-row">
                        <div>
                            <div>Group Project</div>
                            <div className="text-xs font-semibold opacity-60">10%</div>
                        </div>
                        <div className="flex flex-row ml-auto">
                            <button className="btn btn-square btn-ghost">
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

                    <li className="list-row">
                        <div>
                            <div>Final Exam</div>
                            <div className="text-xs font-semibold opacity-60">50%</div>
                        </div>
                        <div className="flex flex-row ml-auto">
                            <button className="btn btn-square btn-ghost">
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
                    
                </ul>

                
            </div>
        </>
    )
}

export default AdminCourse