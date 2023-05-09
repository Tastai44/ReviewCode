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
import EditAppointment from '../EditAppointment/EditAppointment';

interface AppointmentData {
  title: string,
  candidateName: string,
  candidatePosition: string,
  dateOfAppointment: string,
  startTime: string,
  endTime: string,
  recruiterName: string,
  idAppointment: number
}

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

  const [titleBackup, setTitleBackup] = React.useState<string>('');
  const [candidateNameBackup, setCandidateNameBackup] = React.useState<string>('');

  const [startDateBackup, setStartDateBackup] = React.useState<string>('');
  const [endDateBackup, setEndDateBackup] = React.useState<string>('');
  const [appointmentId, setAppointmentId] = React.useState<number>(0);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  
  const handleOpenEdit = (id:number, title:string, startDate:string, endDate:string, canName: string) => {
    setAppointmentId(id);
    setTitleBackup(title);
    setCandidateNameBackup(canName);
    setStartDateBackup(startDate);
    setEndDateBackup(endDate);
    reset({
      idAppointment: id,
      title: title,
      startTime: startDate,
      endTime: endDate,
      candidateName: canName
    })
    setOpenEdit(true);
  }


  const [appointment, setAppointment] = React.useState<AppointmentData[]>([]);
  const [candidate, setCandidate] = React.useState<Candidate[]>([]);
  React.useEffect(() => {
    const url = 'https://localhost:7166/api/Appointment';
    axios.get(url).then((res) => {
      setAppointment(res.data);
    });
  }, []);
  // console.log(appointment)

  React.useEffect(() => {
    const url = 'https://localhost:7166/api/Candidate';
    axios.get(url).then((res) => {
    setCandidate(res.data);
    });
  }, []);


  const { register, handleSubmit, reset} = useForm<AppointmentData>();
  // const onSubmit: SubmitHandler<AppointmentData> = data => axios.post(url, {
    
  // });

  // const onSubmit: SubmitHandler<AppointmentData> = data => console.log(data);


  const onSubmit: SubmitHandler<AppointmentData> = data => {
    try {
      axios.post('https://localhost:7166/api/Appointment', {
        title: data.title,
        candidateName: data.candidateName,
        startTime: data.startTime,
        endTime: data.endTime,
        recruiterName: data.recruiterName,
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    window.location.reload();
  }

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

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div style={{fontFamily:"Inria Sans", fontSize:"32px" }}>Add an Appointment</div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        {/* <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel> */}
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                </InputAdornment>
                            }
                            type='text'
                            placeholder='Appointment title'
                            {...register("title")}
                        />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Candidate Name
                        </InputLabel>
                        
                        <NativeSelect
                        {...register("candidateName")}
                        >
                          {candidate.map((item) => (
                            <option key={item.idCandidate} value={item.candidateName}>{item.candidateName}</option>
                          ))}
                        </NativeSelect>
                      </FormControl>

                    <div style={{display:"flex"}}>
                        <FormControl fullWidth sx={{ m: 1}}>
                            Start Date: 
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                placeholder='StartTime'
                                type='datetime-local'
                                {...register("startTime")}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }}>
                        {/* <InputLabel htmlFor="outlined-adornment-amount">EndTime</InputLabel> */}
                        End Date: <OutlinedInput
                            id="outlined-adornment-amount"
                            label="EndTime"
                            type='datetime-local'
                            style={{width:"200px"}}
                            {...register("endTime")}
                        />
                        </FormControl>
                    </div>

                    <div style={{display:'flex', justifyContent:'flex-end', gap:'5px', width:"410px"}}>
                        <Button variant="contained" 
                            sx={{':hover': {
                                bgcolor: 'secondary.main',
                                color: 'black',
                            },}}
                            type="submit"
                            // onClick={handleClose}
                        >
                            Add
                        </Button>
                        <Button variant="contained" color="error"
                        sx={{':hover': {
                            bgcolor: 'secondary.main',
                            color: 'red',
                        },}}
                        onClick={handleClose}>Cancle</Button>
                    </div>
            </Box>
        </Box>
</Modal>

<Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <EditAppointment onClickCancle={handleCloseEdit} titleBackup={titleBackup} candidateNameBackup={candidateNameBackup}  startDateBackup={startDateBackup} endDateBackup={endDateBackup} appointmentId={appointmentId}/>
</Modal>



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
            <Button onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon />} 
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
                onClick={() => handleOpenEdit(row.idAppointment, row.title, row.startTime, row.endTime, row.candidateName)}
                />
                <DeleteIcon 
                  color='error'  
                  sx={{':hover': {
                    color: 'blue',
                  },}}
                  onClick={() => handleDelete(row.idAppointment)}
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
