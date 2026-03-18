import StudentNavbar from "../../components/student/StudentNavbar.jsx"
import CourseCard from "../../components/student/CourseCard.jsx"

function StudentDashboard() {
  const courses = [
    {
      id: 1,
      title: "Web Development",
      description: "Learn React, Node, and Full Stack Development",
      image: "https://miro.medium.com/1*V-Jp13LvtVc2IiY2fp4qYw.jpeg"
    },
    {
      id: 2,
      title: "Machine Learning",
      description: "Supervised & Unsupervised learning concepts",
      image: "https://www.trentonsystems.com/hs-fs/hubfs/Machine_Learning%20.jpeg?width=8082&name=Machine_Learning%20.jpeg"
    },
    {
      id: 3,
      title: "Data Structures",
      description: "Master arrays, trees, graphs and algorithms",
      image: "https://miro.medium.com/v2/resize:fit:1200/1*-_J_BprW1eqly16pHAIgdw.jpeg"
    },
    {
      id: 4,
      title: "Game Development with Unity",
      description: "Learn how to create games using the Unity engine",
      image: "https://dotnet.microsoft.com/blob-assets/images/illustrations/unity/unity-engine-landscape-swimlane.png"
    }
 
  ]

  return (
    <>
        <StudentNavbar></StudentNavbar>
      <div className="w-full pt-24">
        <div className=" flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">    
      
        {/* Put your CourseCard components here */}
      
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
            />
          ))}

      </div>
    </div>
      </div>  
    </>
  )
}

export default StudentDashboard