import StudentNavbar from "../../components/student/StudentNavbar.jsx";

const ASSIGNMENTS = [
  {
    id: "a0",
    title: "Assignment 0",
    subtitle: "",
    grade: 86,
    iconUrl:
      "https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1",
  },
  {
    id: "l0",
    title: "Lab 0",
    subtitle: "",
    grade: 92,
    iconUrl:
      "https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1",
  },
  {
    id: "g0",
    title: "Group assignment",
    subtitle: "Requires minimum team of 2",
    grade: 78,
    iconUrl:
      "https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1",
  },
];

function CourseDashboard() {
 
    const graded = ASSIGNMENTS.filter((a) => Number.isFinite(a.grade));
    let average;
    if (graded.length === 0) {
    average = null;
    } else {
    const sum = graded.reduce((sum, a) => sum + a.grade, 0);
    average = sum / graded.length;
    }

    let avgLabel;
    if (average == null) {
    avgLabel = "—";
    } else {
    avgLabel = `${average.toFixed(1)}%`;
    }

  let avgBadgeClass;

/* daisy ui badge colors can remove them if yall dont like */
    if (average == null) {
  avgBadgeClass = "badge-ghost";
    } else if (average >= 90) {
  avgBadgeClass = "badge-success";
    }  else if (average >= 75) {
  avgBadgeClass = "badge-info";
    } else if (average >= 60) {
  avgBadgeClass = "badge-warning";
    } else {
    avgBadgeClass = "badge-error";
}

  return (
    <>
      <StudentNavbar />

      
      <div className="mx-6 mt-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-60">Current course average</div>
                <div className="text-2xl font-semibold">{avgLabel}</div>
              </div>

              <div className={`badge ${avgBadgeClass} badge-lg`}>Live</div>
            </div>

            <progress
              className="progress w-full mt-3"
              value={average ?? 0}
              max="100"
            />
          </div>
        </div>
      </div>

     
      <div className="mx-6 mt-4">
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Weekly table
          </li>

          {ASSIGNMENTS.map((a, idx) => {
    let gradeBadge;

    if (a.grade >= 90) {
    gradeBadge = "badge-success";
    } else if (a.grade >= 75) {
    gradeBadge = "badge-info";
    } else if (a.grade >= 60) {
    gradeBadge = "badge-warning";
    } else {
    gradeBadge = "badge-error";
    }

            return (
              <li key={a.id} className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-md"
                />

                <div>
                  <img className="size-10 rounded-box" src={a.iconUrl} alt="" />
                </div>

                <div className="list-col-grow">
                  <div className="flex items-center gap-3">
                    <div>{a.title}</div>
                    <span className={`badge ${gradeBadge} badge-outline`}>
                      {a.grade}%
                    </span>
                  </div>

                  {a.subtitle ? (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {a.subtitle}
                    </div>
                  ) : null}
                </div>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-square btn-ghost"
                  >
                    <img
                      className="w-8 h-8"
                      src="https://img.icons8.com/?size=100&id=83268&format=png&color=000000"
                      alt="triple-dot"
                    />
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
                  >
                    <li>
                      <button
                        className="text-red-600"
                        onClick={() => console.log("remove", a.title)}
                      >
                        Remove assignment
                      </button>
                    </li>
                  </ul>
                </div>

                <button className="btn btn-square btn-ghost">
                  <img
                    className="w-8.5"
                    src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000"
                    alt="Access"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CourseDashboard;