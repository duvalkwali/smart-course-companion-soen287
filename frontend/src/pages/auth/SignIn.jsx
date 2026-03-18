import { Link } from 'react-router-dom';

function SignIn() {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-1/3 border p-4">
                    <legend className="fieldset-legend">Sign In</legend>

                    <label className="label">Email</label>
                    <input type="email" className="input w-full" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input w-full" placeholder="Password" />

                    {/* <button className="btn btn-neutral mt-4">Sign In</button> */}

                    <div className='flex flex-row justify-around'>
                        <Link className='btn btn-neutral mt-4' to="/student/dashboard">Sign In (Student)</Link>
                        <Link className='btn btn-neutral mt-4' to="/admin/dashboard">Sign In (Admin)</Link>
                    </div>

                </fieldset>
            </div>
        </>

    )
}

export default SignIn