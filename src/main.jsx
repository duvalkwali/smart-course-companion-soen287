import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCourse from './pages/admin/AdminCourse.jsx';
import CourseDashboard from './pages/course/CourseDashboard.jsx';
import SignUp from './pages/auth/Signup.jsx';
import SignIn from './pages/auth/Signin.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/course" element={<CourseDashboard/>}/>
                <Route path="/auth/signup" element={<SignUp/>}/>
                <Route path="/auth/signin" element={<SignIn/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/admin/course" element={<AdminCourse/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
