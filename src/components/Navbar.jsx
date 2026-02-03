import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
        <div className="navbar bg-base-100 shadow-sm absolute top-0">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">SCC</a>
            </div>
            <div className="navbar-center">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Admins</a></li>
                    <li><a>Students</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link className='btn' to="/signin">Sign In</Link>
                <Link className='btn' to="/signup">Sign Up</Link>
            </div>
        </div>
    </>
  )
}

export default NavBar
