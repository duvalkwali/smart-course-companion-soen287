import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import StudentNavbar from "../../components/student/StudentNavbar";

function StudentAssessments() {
  const [selectedDate, setSelectedDate] = useState(new Date());

 
  const assessments = [
    {
      date: new Date(2026, 2, 14),
      title: "Assignment 1",
      time: "11:59 PM"
    },
    {
      date: new Date(2026, 2, 6),
      title: "Group Project",
      time: "11:59 PM"
    },
    {
      date: new Date(2026, 2, 22),
      title: "Midterm Exam",
      time: "12:00 PM"
    }, 
    {
      date: new Date(2026, 3, 17),
      title: "Final Exam",
      time: "07:00 PM"
    }
  ];

  
  const getAssessmentForDate = (date) => {
    return assessments.find(
      (a) =>
        a.date.getDate() === date.getDate() &&
        a.date.getMonth() === date.getMonth() &&
        a.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <>
      <StudentNavbar firstName="Duval" lastName="Kwali" />

      <div className="min-h-screen p-10 bg-base-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/*Left Calendar Card */}
        <div className="card bg-base-100 shadow-xl p-6 overflow-visible w-full">

          <h1 className="text-3xl font-bold mb-6">
            Upcoming Assessments
          </h1>

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}

            tileContent={({ date, view }) => {
             if (view === "month") {
            const assessment = getAssessmentForDate(date);

                if (assessment) {
                     return (
                        <div
                         className="tooltip tooltip-bottom z-50"
                             data-tip={`${assessment.title} due at ${assessment.time}`}
                        >
                     <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
                     </div>
        );
      }
    }
    return null;
  }}

  tileClassName={({ date, view }) => {
    if (view === "month") {
      const assessment = getAssessmentForDate(date);
      return assessment ? "bg-red-100 rounded-lg" : null;
    }
  }}
/>
          </div>

          {/* Right Assessments Marks */}
          <div className="card bg-base-100 shadow-xl p-6">
            <h1 className="text-3xl font-bold mb-6">
                 Add Assessment Grades
            </h1>

            {/* Course Selection */}
            <div className="form-control mb-4">
                <label className="label">
                <span className="label-text font-semibold">
                    Select Course
                </span>
                </label>

                <select className="select select-bordered w-full">
                <option disabled selected>
                    Choose a course
                </option>
                <option>Web Development</option>
                <option>Machine Learning</option>
                <option>Data Structures</option>
                <option>Game Development</option>
                </select>
            </div>

            {/* Assignment Input */}
            <div className="form-control mb-4">
                <label className="label">
                <span className="label-text font-semibold">
                    Assignment
                </span>
                </label>
                <input
                type="number"
                placeholder="Enter earned mark for assignment"
                className="input input-bordered w-full"
                />
            </div>

            {/* Lab Input */}
            <div className="form-control mb-4">
                <label className="label">
                <span className="label-text font-semibold">
                    Lab
                </span>
                </label>
                <input
                type="number"
                placeholder="Enter earned mark for lab"
                className="input input-bordered w-full"
                />
            </div>

            {/* Group Assignment Input */}
            <div className="form-control mb-6">
                <label className="label">
                <span className="label-text font-semibold">
                    Group Assignment
                </span>
                </label>
                <input
                type="number"
                placeholder="Enter earned mark for group assignment"
                className="input input-bordered w-full"
                />
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full">
                Save Grades
            </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default StudentAssessments;