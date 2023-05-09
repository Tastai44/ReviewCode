import React from 'react'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Menu,
	MenuItem,
	Modal,
	NativeSelect,
	OutlinedInput,
	Paper,
	Typography,
  styled,
} from "@mui/material"
import UploadIcon from '@mui/icons-material/Upload';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
// import { getCandidate } from '../../api/getData';

interface IFormInput {
  // ImageProfile(ImageProfile: string): void;
  IdCandidate : number,
  FirstName: string,
  LastName: string,
  Position: string,
  Email: string,
  Status: string,
  CV?: string,
  Resume?: string,
  Skills?:string,
  Rating?: string,
  ImageProfile?: string,

  filesImage: FileList,
  filesCV: FileList,
  filesResume: FileList
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
	color:"black"
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
  //   textAlign: 'center',
    width:"340px",
    color: theme.palette.text.secondary,
  }));
  

  
export default function AddCandidate() {
  

  const { register, handleSubmit} = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
        axios.post('https://localhost:7166/api/Candidate', {
            FirstName: data.FirstName,
            LastName: data.LastName,
            Position: data.Position,
            Email: data.Email,
            Status: data.Status,
            CV: data.filesCV[0].name,
            Resume: data.filesResume[0].name,
            Skills: data.Skills,
            Rating: data.Rating,
            ImageProfile: data.filesImage[0].name,
        });
    } catch (error) {
        console.error('Error deleting item:', error);
      }
    // let res = await getCandidate();
    window.location.reload();
}

  return (
    <div>
        <Box sx={style}>
            <div style={{fontFamily:"Inria Sans", fontSize:"32px" }}>Add a Candidate</div>
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
                        <InputLabel htmlFor="outlined-adornment-amount">Profile Image</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <UploadIcon />
                                </InputAdornment>
                            }
                            type='file'
                            placeholder='Upload Resume'
                            {...register("filesImage")}
                        />
                        </FormControl>
                    <div style={{display:"flex"}}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">FirstName</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="FullName"
                            {...register("FirstName")}
                        />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">LastName</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="FullName"
                            {...register("LastName")}
                            style={{width:"200px"}}
                        />
                        </FormControl>
                    </div>
                    <div style={{display:"flex"}}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Position</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                label="Position"
                                {...register("Position")}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Email"
                            type='email'
                            style={{width:"200px"}}
                            {...register("Email")}
                        />
                        </FormControl>
                    </div>
                    <div style={{display:"flex"}}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Upload CV</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <UploadIcon />
                                    </InputAdornment>
                                }
                                type='file'
                                placeholder='Upload CV'
                                {...register("filesCV")}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Upload Resume</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <UploadIcon />
                                </InputAdornment>
                            }
                            type='file'
                            placeholder='Upload Resume'
                            {...register("filesResume")}
                        />
                        </FormControl>
                    </div>
                    <FormControl fullWidth sx={{ m: 1}}>
                        {/* <InputLabel htmlFor="outlined-adornment-amount">Status</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Status"
                            {...register("Status")}
                        /> */}
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Status
                        </InputLabel>
                        <NativeSelect
                        {...register("Status")}
                        >
                           <option value="Applied">Applied</option>
                           <option value="Interview">Interview</option>
                           <option value="Rejected">Rejected</option>
                           <option value="Pass">Pass</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Rating</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Rating"
                            {...register("Rating")}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Skills</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Skills"
                            style={{height:"100px"}}
                            {...register("Skills")}
                        />
                    </FormControl>

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
                        // onClick={handleClose}>Cancle</Button>
                        >Cancle</Button>
                    </div>
            </Box>
        </Box>
    </div>
  )
}
