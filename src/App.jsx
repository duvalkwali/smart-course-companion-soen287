import NavBar from "./components/Navbar"

function App() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <NavBar></NavBar>
                <div className="hero-content text-center flex flex-col">
                    <h1 className="text-5xl text-center">Welcome to Smart Course Companion</h1>
                    <p>Developed by Nathan Au, Duval Kwali, and Rami Madadi for SOEN 287</p>
                </div>
            </div>
        </>

    )
}

export default App