import { Box, Input,Button, NativeSelect } from '@mui/material';
import * as React from 'react';
import axios from "axios";

import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm, SubmitHandler } from "react-hook-form";


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
  
interface EditAppointmentProps {
    titleBackup: string,
    startDateBackup: string,
    endDateBackup: string,
    appointmentId: number,
    candidateNameBackup: string
    onClickCancle:() => void
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

const EditAppointment = ({
    titleBackup,
    startDateBackup,
    endDateBackup,
    appointmentId,
    candidateNameBackup,
    onClickCancle

}: EditAppointmentProps) => {
// export default function EditAppointment(){
    const { register, handleSubmit, reset} = useForm<AppointmentData>();
    // const [openEdit, setOpenEdit] = React.useState(true);
    // const handleCloseEdit = () => setOpenEdit(false);
    // const handleOpenEdit = () => setOpenEdit(true);
   
    // const onSubmit: SubmitHandler<IComment> = data => {
    //     try {
    //       axios.put(`https://localhost:7166/api/Appointment/${appointmentId}`, {
    //         message: data?.message,
    //       });
    //     }catch (error) {
    //       console.error('Error deleting item:', error);
    //     }
    //     window.location.reload();
    //   }

    //   const onSubmit: SubmitHandler<AppointmentData> = data => console.log(data)
    const [appointment, setAppointment] = React.useState<AppointmentData[]>([]);
    const [candidate, setCandidate] = React.useState<Candidate[]>([]);
    React.useEffect(() => {
        const url = 'https://localhost:7166/api/Candidate';
        axios.get(url).then((res) => {
        setCandidate(res.data);
        });
      }, []);

      const onSubmitEdit: SubmitHandler<AppointmentData> = data => {
        try {
          axios.put(`https://localhost:7166/api/Appointment/${appointmentId}`, {
            title: data?.title,
            candidateName: data?.candidateName,
            startTime: data?.startTime,
            endTime: data?.endTime,
          });
        }catch (error) {
          console.error('Error deleting item:', error);
        }
        window.location.reload();
      }

    //   const onSubmitEdit: SubmitHandler<AppointmentData> = data => console.log(data);

  return (
    <>
       <Box sx={style}>
            <div style={{fontFamily:"Inria Sans", fontSize:"32px" }}>Edit Appointment {appointmentId}</div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitEdit)}
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
                            defaultValue={titleBackup}
                            {...register("title")}
                        />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Candidate Name
                        </InputLabel> */}
                        
                        <NativeSelect
                            defaultValue={candidateNameBackup}
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
                                defaultValue={startDateBackup}
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
                            defaultValue={endDateBackup}
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
                        >
                            Save
                        </Button>
                        <Button variant="contained" color="error"
                        sx={{':hover': {
                            bgcolor: 'secondary.main',
                            color: 'red',
                        },}}
                        onClick={onClickCancle}>Cancle</Button>
                    </div>
            </Box>
        </Box>
    </>
  )
}
export default EditAppointment

