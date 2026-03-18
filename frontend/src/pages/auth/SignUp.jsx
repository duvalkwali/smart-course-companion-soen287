import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { addUser } from "../../data/users";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Stops page reload
        
        // Identify which button was clicked
        const action = event.nativeEvent.submitter.value;
            addUser({
        fullName: name,
        role: action
        });
        
        // 1. Process form data 
        console.log("Form submitted for:", action);
        console.log("User saved:", name);

        // 2. Redirect to appropriate dashboard
        if (action === "student") {
            navigate("/student/dashboard");
        } else {
            navigate("/admin/dashboard");
        }
    };
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-1/3 border p-4">
                    <legend className="fieldset-legend">Sign Up</legend>

                        <form onSubmit={handleSubmit}>
                            <label className="label">Name</label>
                            <input type="text"
                                className="input w-full"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />

                            <label className="label">Email</label>
                            <input type="email" className="input w-full" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" className="input w-full" placeholder="Password" />
                        
                            {/* <button className="btn btn-neutral mt-4">Sign Up</button> */}
                            <div className='flex flex-row justify-around'>
                                <button type="submit" className='btn btn-neutral mt-4' value="student">Sign Up (Student)</button>
                                <button type="submit"className='btn btn-neutral mt-4' value="admin">Sign Up (Admin)</button>
                            </div>
                        </form>

                </fieldset>
            </div>
        </>

    )
}

export default SignUp