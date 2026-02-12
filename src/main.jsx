import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup.jsx"
import Signin from "./pages/Signin.jsx"
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCourse from './pages/admin/AdminCourse.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/admin/course" element={<AdminCourse/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
