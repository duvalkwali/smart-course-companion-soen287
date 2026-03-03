import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCourse from './pages/admin/AdminCourse.jsx';
import CourseDashboard from './pages/course/CourseDashboard.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import SignIn from './pages/auth/Signin.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import StudentAssessments from './pages/student/StudentAssessments.jsx';
import StudentAddCourse from './pages/student/StudentAddCourse.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/student/course" element={<CourseDashboard/>}/>
                <Route path="/auth/signup" element={<SignUp/>}/>
                <Route path="/auth/signin" element={<SignIn/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/admin/course" element={<AdminCourse/>}/>
                <Route path="/student/dashboard" element={<StudentDashboard/>}/>
                <Route path="/student/assessments" element={<StudentAssessments/>}/>
                <Route path="/student/add-courses" element={<StudentAddCourse/>}/>
                <Route path="/student/grades" element={<CourseDashboard/>}/>

            </Routes>
        </BrowserRouter>
    </StrictMode>
)
