// import { useState } from 'react'
import './App.css'
// import Card from './Components/Card'
// import { Button } from '@mui/material'
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BrowserRouter, Routes, Route} from "react-router-dom"
// import Home from './pages/Home/Home';
import ResponsiveAppBar from './Components/ResponsiveAppBar/ResponsiveAppBar';
// import Comment from './pages/Comment/Comment';
import AppointmentPage from './pages/Appointment/AppointmentPage';
// import { getData } from './api/getData';
import Comment from './pages/Comment/Comment';
import StatusList from './pages/ExampleDnDPage/StatusList';

function App() {
  // const [count, setCount] = useState(0)
  // const [data, setData] = useState<string>("")

  // const onButtonClick = () => {
  //   console.log("Hello kami!")
  //   alert("Hello kami!")
  // }

  // const onButtonClick = async() => {
  //   try{
  //     let res = await getData()
  //     console.log("res: " ,res)
  //   }
  //   catch (err){
  //     console.log(err)
  //   }
    
  // } 

  return (
    <>
      <BrowserRouter>
      <ResponsiveAppBar />
      <br />
      <br />
      {/* <Button onClick={() => onButtonClick()}>Getdata</Button> */}
        <Routes>
          <Route path="/" element={<StatusList />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/comment/:idCandidate" element={<Comment />} />

          {/* <Route path='/back' /> */}
        </Routes>
    

    {/* <div className='App'>
      <Navbar />
      <div className='gap'></div>
      {component}
      <BackToTop />
    </div> */}
    </BrowserRouter>
      
    </>
  )
}

export default App
