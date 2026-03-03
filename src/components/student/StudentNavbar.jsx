import { Link } from 'react-router-dom';
import { getLatestUser } from "../../data/users";

function StudentNavbar() {

  let initials = "ST"; // DEFAULT fallback
    const user = getLatestUser();

  if (user && user.fullName) {
    const parts = user.fullName.trim().split(" ");

    if (parts.length >= 2) {
      initials =
        parts[0][0].toUpperCase() +
        parts[1][0].toUpperCase();
    } else if (parts.length === 1) {
      initials = parts[0][0].toUpperCase();
    }
  }

  return (
    <>
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">

      {/* Left */}
      <div className="navbar-start">
        <Link to="/Student/dashboard" className="btn btn-ghost text-xl">
          Student Dashboard
        </Link>
      </div>

      {/* Center */}
       <div className="navbar-center">
        <ul className="menu menu-horizontal menu-lg px-10 gap-4">
          <li>
            <Link to="/student/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/student/assessments">Assessments</Link>
          </li>
          <li>
            <Link to="/student/add-courses">Add Courses</Link>
          </li>
        </ul>
      </div> 

      {/* Right */}
      <div className="navbar-end gap-4">

        {/* Avatar Dropdown */}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
              <span className="text-sm font-bold">{initials}</span>
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/student/profile">Profile</Link>
            </li>
            <li>
              <Link to="/student/grades">Grades</Link>
            </li>
            <li>
              <Link to="/student/assessments">Assessments</Link>
            </li>
            <li>
              <Link to="/student/add-courses">Add Courses</Link>
            </li>
          </ul>
        </div>
        <Link to="/">Sign Out</Link>
      </div>
    </div>
  </>
  )
}

export default StudentNavbar