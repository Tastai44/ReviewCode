import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home/Home.tsx'
import ResponsiveAppBar from './Components/ResponsiveAppBar/ResponsiveAppBar.tsx'
import AppointmentPage from './pages/Appointment/AppointmentPage.tsx'
import CandidateAdd from './Components/CandidateAdd/CandidateAdd.tsx'
import Comment from './pages/Comment/Comment.tsx'
import EditComment from './Components/EditComment/EditComment.tsx'
import DemoDndPage from './pages/DemoDndPage.tsx'
import EditAppointment from './Components/UpsertAppointment/UpsertAppointment.tsx'
import ExampleDnDPage from './pages/ExampleDnDPage/StatusList.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <App />
)
{/* <DemoDndPage /> */}
{/* <StatusPage />  */}

{/* <React.StrictMode>
  <ResponsiveAppBar />
    
    <Home />
    <AppointmentPage />
    <CandidateAdd />
    <Comment />
    <EditComment />
</React.StrictMode> */}