import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const handleSignUp = async () => {
        if (!name || !email || !password) {
            alert("All fields are required")
            return
        }
        if (!emailRegex.test(email)) {
            alert("Invalid email")
            return
        }
        const res = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role: "Student" })
        })
        const data = await res.json()
        if (!res.ok) {
            alert(data.error)
            return
        }
        localStorage.setItem("user", JSON.stringify(data))

        navigate("/student/dashboard")
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="tooltip mt-4" data-tip="Go Back">
                <button className="btn btn-square btn-ghost" onClick={() => navigate("/")}>
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=84994&format=png&color=000000" alt="Back" />
                </button>
            </div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sign Up</legend>

                <label className="label">Name</label>
                <input type="text" className="input" placeholder="Name" onChange={e => setName(e.target.value)} />

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <div className="tooltip mt-4" data-tip="Sign Up">
                    <button className="btn w-full" onClick={handleSignUp}>
                        <img className="w-5" src="https://img.icons8.com/?size=100&id=85445&format=png&color=000000" alt="Sign Up" />
                    </button>
                </div>
            </fieldset>
        </div>
    )
}

export default SignUp