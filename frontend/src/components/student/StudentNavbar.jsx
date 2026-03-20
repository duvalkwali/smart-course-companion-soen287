import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function StudentNavbar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Student Dashboard</a>
                </div>
                <div className="navbar-center">
                    <ul className="menu menu-horizontal px-1">
                        {/* <li><a>Admins</a></li> */}
                        {/* <li><a>Students</a></li> */}
                    </ul>
                </div>
                <div className="navbar-end">
                        <button className='btn btn-link' onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </>
    )
}

export default StudentNavbar