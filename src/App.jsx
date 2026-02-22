import { Link } from 'react-router-dom';

function App() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
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
                        <Link className='btn' to="/auth/signin">Sign In</Link>
                        <Link className='btn' to="/auth/signup">Sign Up</Link>
                    </div>
                </div>
                <div className="hero-content flex flex-col gap-10">
                    <h1 className="text-8xl text-center font-bold">Master Your Semester, One Assessment at a Time.</h1>
                    <h2 className='text-4xl'>The all-in-one workspace for students to track grades and for instructors to guide academic success. Built for the modern university experience.</h2>
                    <Link className='btn btn-wide btn-primary' to="/auth/signup">Get Started for Free</Link>
                    
                    <span className='text-2xl'>
                        Trusted by 500+ students at&nbsp;
                        <span className="text-rotate duration-4000">
                            <span>
                                <span>Concordia University</span>
                                <span>McGill University</span>
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </>

    )
}

export default App