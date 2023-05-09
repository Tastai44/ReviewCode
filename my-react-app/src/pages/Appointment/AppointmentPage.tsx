// import React from 'react';
import Appointment from '../../Components/Appointment/Appointment';
import './AppointmentPage.css';

export default function AppointmentPage() {
  return (
    <div>
        <div className='ContainerB'>
            <Appointment />
        </div>
    </div>
  )
}

// const [appointment, setAppointment] = React.useState<AppointmentData[]>([]);
//   React.useEffect(() => {
//     const url = 'https://localhost:7166/api/Appointment';
//     axios.get(url).then((res) => {
//       setAppointment(res.data);
//     });
//   }, []);
  // console.log(appointment)