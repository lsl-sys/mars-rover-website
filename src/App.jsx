import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Common/Layout'
import Home from './components/Home'
import ApplicationForm from './components/Recruitment/ApplicationForm'
import TrainingScheduleV2 from './components/TrainingSchedule/TrainingScheduleV2'
import TrainingMaterials from './components/TrainingMaterials/TrainingMaterials'
import Contact from './components/Contact/Contact'
import ApplicationStats from './components/Recruitment/ApplicationStats'
import './App.css'
import './components/Common/MobileWidth.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apply" element={<ApplicationForm />} />
          <Route path="schedule" element={<TrainingScheduleV2 />} />
          <Route path="materials" element={<TrainingMaterials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="stats" element={<ApplicationStats />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
