import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"

function Navbar({ user, setUser }) {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (!user) return
        setName(user.name)
        setEmail(user.email)
    }, [user])

    const handleSignOut = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    const handleEditUser = async () => {
        await fetch("http://localhost:3001/edit-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id, name, email, password })
        })
        const updatedUser = { ...user, name, email }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
        setPassword("")
        document.getElementById("profile_modal").close()
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <a className="btn btn-ghost text-xl">Smart Course Companion - {user?.role}</a>
                    </div>
                    <div className="navbar-center">
                        <ul className="menu menu-horizontal px-1">
                            {/* <li><a>Admins</a></li> */}
                            {/* <li><a>Students</a></li> */}
                        </ul>
                    </div>
                    
                    <div className="navbar-end">
                        {/* <button className='btn btn-link' onClick={handleSignOut}>Sign Out</button> */}
                        <div className="dropdown dropdown-end">

                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                                <div className="ring-neutral w-10 rounded-full ring-2">
                                    <span>{user?.name?.charAt(0)}</span>
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><a onClick={() => document.getElementById("profile_modal").showModal()}>Profile</a></li>
                                <li><a onClick={handleSignOut}>Sign Out</a></li>
                            </ul>
                    </div>
                    </div>
            </div>

            <dialog id="profile_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Profile</h3>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" className="input w-full" value={name} onChange={e => setName(e.target.value)} />

                        <label className="label">Email</label>
                        <input type="email" className="input w-full" value={email} onChange={e => setEmail(e.target.value)} />

                        <label className="label">Password</label>
                        <input type="password" className="input w-full" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} />
                    </fieldset>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                        <button className="btn btn-neutral" onClick={handleEditUser}>Save</button>
                    </div>
                </div>
            </dialog>

        </>
    )
}

export default Navbar


