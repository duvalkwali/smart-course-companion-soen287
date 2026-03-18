import { useState } from "react";
import StudentNavbar from "../../components/student/StudentNavbar";

function StudentAddCourse() {

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      courseCode,
      courseName,
      instructor,
      term
    };

    console.log("New Course:", newCourse);

    setCourseCode("");
    setCourseName("");
    setInstructor("");
    setTerm("");
  };

  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen p-10 bg-base-200">
        <div className="max-w-3xl mx-auto">

          <div className="card bg-base-100 shadow-xl p-8">

            <h1 className="text-3xl font-bold mb-6">
              Add New Course
            </h1>

            <form onSubmit={handleSubmit}>

              {/* Course Code */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Course Code
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. SOEN 287"
                  className="input input-bordered"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                />
              </div>

              {/* Course Name */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Course Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Web Programming"
                  className="input input-bordered"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>

              {/* Instructor */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Instructor
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Duval"
                  className="input input-bordered"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  required
                />
              </div>

              {/* Term */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Term
                  </span>
                </label>
                <select
                  className="select select-bordered"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  required
                >
                  <option value="">Select Term</option>
                  <option>Fall 2026</option>
                  <option>Winter 2027</option>
                  <option>Summer 2026</option>
                </select>
              </div>

              <button className="btn btn-primary w-full">
                Add Course
              </button>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}

export default StudentAddCourse;