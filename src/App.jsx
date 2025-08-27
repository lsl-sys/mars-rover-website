import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Common/Layout'
import Home from './components/Home'
import ApplicationForm from './components/Recruitment/ApplicationForm'
import TrainingSchedule from './components/TrainingSchedule/TrainingSchedule'
import TrainingMaterials from './components/TrainingMaterials/TrainingMaterials'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apply" element={<ApplicationForm />} />
          <Route path="schedule" element={<TrainingSchedule />} />
          <Route path="materials" element={<TrainingMaterials />} />
          {/* 可以在这里添加更多路由 */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
