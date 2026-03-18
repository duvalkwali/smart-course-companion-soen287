import { Link } from 'react-router-dom';

function AdminNavBar() {
  return (
    <>
        <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Admin Dashboard</a>
                </div>
                <div className="navbar-center">
                    <ul className="menu menu-horizontal px-1">
                        {/* <li><a>Admins</a></li> */}
                        {/* <li><a>Students</a></li> */}
                    </ul>
                </div>
                <div className="navbar-end">
                        <Link className='btn btn-link' to="/">Sign Out</Link>
                </div>
        </div>
    </>
  )
}

export default AdminNavBar
