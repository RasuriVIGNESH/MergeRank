/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Login } from './pages/Login';
import Register from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { Leaderboard } from './pages/Leaderboard';
import { Suggestions } from './pages/Suggestions';
import { StudentProfile } from './pages/StudentProfile';
import { MentorDashboard } from './pages/MentorDashboard';
import { MentorBatches } from './pages/MentorBatches';
import { MentorAlerts } from './pages/MentorAlerts';
import StudentOnboarding from './pages/StudentOnboarding';
import BatchExplorer from './pages/BatchExplorer';
import BatchStudents from './pages/BatchStudents';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Entry Point */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<StudentOnboarding />} />

        {/* Core Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/mentor" element={<MentorDashboard />} />

        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/batches" element={<BatchExplorer />} />
        <Route path="/batches/:branch/:year" element={<BatchStudents />} />

        {/* Student Specific */}
        <Route path="/student/suggestions" element={<Suggestions />} />
        <Route path="/student/profile/:id?" element={<StudentProfile />} />

        {/* Mentor Specific */}
        <Route path="/mentor/batches" element={<MentorBatches />} />
        <Route path="/mentor/alerts" element={<MentorAlerts />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
