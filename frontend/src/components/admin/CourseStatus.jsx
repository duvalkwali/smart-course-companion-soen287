import { useState } from "react"

function CourseStatus() {
    const [enabled, setEnabled] = useState(true)

    return (
        <>
            <div className="flex flex-row ml-auto gap-1">
                <button className={`btn btn-square btn-ghost flex items-center ${enabled ? "" : "btn-outline btn-error"}`} onClick={() => setEnabled(false)}>
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=82553&format=png&color=000000" alt="Disabled" />
                </button>
                <button className={`btn btn-square btn-ghost flex items-center ${enabled ? "btn-outline btn-success" : ""}`} onClick={() => setEnabled(true)}> 
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=82759&format=png&color=000000" alt="Enabled" />
                </button>
            </div>
        </>
    )
}

export default CourseStatus


