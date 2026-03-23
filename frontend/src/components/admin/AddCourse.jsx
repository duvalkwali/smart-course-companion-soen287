import { useState } from "react"

function AddCourse({ courses, setCourses }) {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [instructor, setInstructor] = useState("")
    const [term, setTerm] = useState("")

    const handleAddCourse = async () => {
        const res = await fetch("http://localhost:3001/add-course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, code, instructor, term })
        })
        const data = await res.json()
        setCourses([...courses, { id: data.lastInsertRowid, name, code, instructor, term, enabled: 1 }])
        setName("")
        setCode("")
        setInstructor("")
        setTerm("")
    }

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Add Course</legend>

            <label className="label">Name</label>
            <input type="text" className="input w-full" placeholder="Web Programming" value={name} onChange={e => setName(e.target.value)} />

            <label className="label">Code</label>
            <input type="text" className="input w-full" placeholder="SOEN 287" value={code} onChange={e => setCode(e.target.value)} />

            <label className="label">Instructor</label>
            <input type="text" className="input w-full" placeholder="Instructor" value={instructor} onChange={e => setInstructor(e.target.value)} />

            <label className="label">Term</label>
            <input type="text" className="input w-full" placeholder="Winter 2026" value={term} onChange={e => setTerm(e.target.value)} />
            <div className="tooltip mt-4" data-tip="Add">
                <button className="btn w-full" onClick={handleAddCourse}>
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=84991&format=png&color=000000" alt="Add" />
                </button>
            </div>

        </fieldset>
    )
}

export default AddCourse