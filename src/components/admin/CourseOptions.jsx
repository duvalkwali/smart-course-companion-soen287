import { useState } from "react"

function CourseOptions() {
    const [enabled, setEnabled] = useState(true)

    return (
        <>
            <div className="flex flex-row ml-auto gap-1">
                
                <button className="btn btn-square btn-ghost">
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=85028&format=png&color=000000" alt="View" />
                </button>
                <button className="btn btn-square btn-ghost">
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=86373&format=png&color=000000" alt="Edit" />
                </button>
                <button className="btn btn-square btn-ghost">
                    <img className="w-5" src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="Delete" />
                </button>
            </div>
        </>
    )
}

export default CourseOptions


