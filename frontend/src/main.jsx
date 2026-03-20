import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

import App from './App.jsx'
import SignUp from './pages/auth/SignUp.jsx';
import SignIn from './pages/auth/SignIn.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>

            <Route path="/auth/signup" element={<SignUp/>}/>
            <Route path="/auth/signin" element={<SignIn/>}/>

            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/student/dashboard" element={<StudentDashboard/>}/>

        </Routes>
    </BrowserRouter>
)
