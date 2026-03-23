import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Student")

    const handleSignUp = async () => {
        const res = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        })
        const data = await res.json()
        localStorage.setItem("user", JSON.stringify(data))

        if (role === "Student") navigate("/student/dashboard")
        else if (role === "Admin") navigate("/admin/dashboard")
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sign Up</legend>

                <label className="label">Name</label>
                <input type="text" className="input" placeholder="Name" onChange={e => setName(e.target.value)} />

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <label className="label">Role</label>
                <select className="select" value={role} onChange={e => setRole(e.target.value)}>
                    <option>Student</option>
                    <option>Admin</option>
                </select>

                <button className="btn btn-neutral mt-4" onClick={handleSignUp}>Sign Up</button>
            </fieldset>
        </div>
    )
}

export default SignUp