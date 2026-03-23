import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const handleSignIn = async () => {
        if (!email || !password) {
            alert("All fields are required")
            return
        }
        if (!emailRegex.test(email)) {
            alert("Invalid email")
            return
        }
        const res = await fetch("http://localhost:3001/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok) {
            alert(data.error)
            return
        }
        localStorage.setItem("user", JSON.stringify(data))

        if (data.role == "Student") navigate("/student/dashboard")
        else if (data.role == "Admin") navigate("/admin/dashboard")
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sign In</legend>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />


                <div className="tooltip mt-4" data-tip="Sign In">
                    <button className="btn w-full" onClick={handleSignIn}>
                        <img className="w-5" src="https://img.icons8.com/?size=100&id=87587&format=png&color=000000" alt="Sign In" />
                    </button>
                </div>
                    
            </fieldset>
        </div>
    )
}

export default SignIn