import { Box, Input,Button } from '@mui/material';
import * as React from 'react';
import axios from "axios";

import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm, SubmitHandler } from "react-hook-form";


interface IComment {
    idComment: number,
    message: string,
    createAt: string,
    idRecruiter: number,
    idCandidate: number
}
interface EditCommentProps {
    idComment: number,
    message: string,
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

const EditComment = ({
    idComment,
    message,
    onClickCancle

}: EditCommentProps) => {
    const { register, handleSubmit, reset} = useForm<IComment>();
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

      const onSubmit: SubmitHandler<IComment> = data => console.log(data)
  return (
        <>
        <Box sx={style}>
            <div style={{fontFamily:"Inria Sans", fontSize:"32px" }}>Edit Comment {idComment}</div>
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
                    <InputLabel htmlFor="outlined-adornment-amount">Message</InputLabel>
                    <OutlinedInput
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        label="Message"
                        type='text'
                        value={message}
                        // style={{height:"200px"}}
                        {...register("message")}
                    />
                </FormControl>
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
                        onClick={onClickCancle}
                    >Cancle</Button>
                </div>
            </Box>
        </Box>
        </>
  )
}
export default EditComment