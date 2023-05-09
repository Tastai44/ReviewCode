import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Input,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import axios from "axios";

import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

import './Appointment.css'


import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';

// import { DragDropContext } from 'react-beautiful-dnd';

import { useForm, SubmitHandler } from "react-hook-form";

import NativeSelect from '@mui/material/NativeSelect';
import EditAppointment from '../UpsertAppointment/UpsertAppointment';
import UpsertAppModal from '../UpsertAppointment/UpsertAppModal';

export interface AppointmentData {
  title: string,
  candidateName: string,
  candidatePosition: string,
  dateOfAppointment: string,
  startTime: string,
  endTime: string,
  recruiterName: string,
  idAppointment?: number
}

export type AppointmentDataForm = Omit<AppointmentData, 'candidatePosition' | 'dateOfAppointment'| 'recruiterName'>

interface Candidate {
  idCandidate: number;
  firstName: string;
  candidateName: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "black",
};

export default function Appointment() {
  // use for popup card when it was done
  // const [loading, setLoading] = React.useState<boolean>(false);

  const [defaultApp, setDefaultApp] = React.useState<AppointmentData>()


  const [open, setOpen] = React.useState(false);
  const handleClickAdd = () => {
    setDefaultApp(undefined)
    handleOpen()
  }

  const handleClickUpdate = (defaultValues: AppointmentData) => {
    setDefaultApp(defaultValues)
    handleOpen()
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => setOpenEdit(false);



  const [appointment, setAppointment] = React.useState<AppointmentData[]>([]);
  const [candidate, setCandidate] = React.useState<Candidate[]>([]);

  const fetchAppointments = React.useCallback(() => {
    const url = 'https://localhost:7166/api/Appointment';
    axios.get(url).then((res) => {
      setAppointment(res.data);
    });
  }, [])

  React.useEffect(() => {
      fetchAppointments()
  }, [fetchAppointments]);
  // console.log(appointment)

  React.useEffect(() => {
    const url = 'https://localhost:7166/api/Candidate';
    axios.get(url).then((res) => {
    setCandidate(res.data);
    });
  }, []);



  // const onSubmit: SubmitHandler<AppointmentData> = data => {
  //   try {
  //     axios.post('https://localhost:7166/api/Appointment', {
  //       title: data.title,
  //       candidateName: data.candidateName,
  //       startTime: data.startTime,
  //       endTime: data.endTime,
  //       recruiterName: data.recruiterName,
  //     });
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  //   window.location.reload();
  // }

  const handleDelete = async (id: number) => {
    try {
        await axios.delete(`https://localhost:7166/api/Appointment/${id}`);
        console.log(`Appointment with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    window.location.reload();
  };
  
  
  return (
<>
  <UpsertAppModal 
    openModal={open}
    onClickCancel={handleClose}
    onSubmitSuccess={fetchAppointments}
    defaultApp={defaultApp}
    key={defaultApp?.idAppointment}
  />
    <TableContainer component={Paper} sx={{ width: 1300 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead> 
        <TableRow>
          <TableCell style={{fontSize:"28px"}} >Appointment</TableCell>
          <TableCell align="right" colSpan={3}></TableCell>
          <TableCell align="right" style={{display:"flex", gap:"10px"}}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 210}}
              >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Search appointment..."
                />
            </Paper>
            <Button onClick={handleClickAdd} variant="outlined" startIcon={<AddCircleIcon />} 
              sx={{ width: '230px', p: '12px' , borderBlockColor:"black", color:"black", ':hover': {
              bgcolor: 'black',
              color: 'white',
            },}}>
              Add an appointment
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      </Table>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">CandidateName</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">StartTime</TableCell>
            <TableCell align="right">EndTime</TableCell>
            <TableCell align="right">RecruiterName</TableCell>
            <TableCell align="right">Opption</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointment.map((row) => (
            <TableRow
              key={row.idAppointment}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.candidateName}</TableCell>
              <TableCell align="right">{row.candidatePosition}</TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.endTime}</TableCell>
              <TableCell align="right">{row.recruiterName}</TableCell>
              <TableCell align="right">
                <EditCalendarIcon color='success' sx={{':hover': {
                  color: 'black',
                },}}
                onClick={() => handleClickUpdate(row)}
                />
                <DeleteIcon 
                  color='error'  
                  sx={{':hover': {
                    color: 'blue',
                  },}}
                  onClick={() => handleDelete(row.idAppointment!)}
                />
              </TableCell >
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
}
