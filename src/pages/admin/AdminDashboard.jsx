import AdminNavBar from "./AdminNavbar"

function AdminDashboard() {
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



                <ul className="list bg-base-100 rounded-box shadow-md w-1/2">
  
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Courses</li>
                
                    <li className="list-row">
                        <div>
                            <div>COMP 249 - Object-Oriented Programming II</div>
                            <div className="text-xs font-semibold opacity-60">Winter 2026</div>
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
                            <div>ENGR 233 - Applied Advanced Calculus</div>
                            <div className="text-xs font-semibold opacity-60">Winter 2026</div>
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
                            <div>SOEN 228 - System Hardware</div>
                            <div className="text-xs font-semibold opacity-60">Winter 2026</div>
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
                            <div>SOEN 287 - Web Programming</div>
                            <div className="text-xs font-semibold opacity-60">Winter 2026</div>
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

export default AdminDashboard