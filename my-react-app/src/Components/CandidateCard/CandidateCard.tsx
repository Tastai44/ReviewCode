import React from 'react'
import './CandidateCard.css'
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';

import { Input } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import UploadIcon from '@mui/icons-material/Upload';

import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { getCandidate } from '../../api/getData';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color:"black"
};

const styleEdit = {
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

interface ICandidateCard {
  firstName: string,
  lastName: string,
  position: string,
  email: string,
  createAt: string,
  idCandidate: number,
  status: string,
  cv?: string,
  resume?: string,
  skills?:string,
  rating?: string
  imageProfile:string
  // children?: React.ReactNode
}
const CandidateCard = ({
  // children,
  firstName,
  lastName,
  position,
  email,
  createAt,
  idCandidate,
  status,
  cv,
  resume,
  skills,
  rating,
  imageProfile

  // icon
  }: ICandidateCard) =>  {

  // const [id, setId] = React.useState<number>(0);
  const { register, handleSubmit} = useForm<IFormInput>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openCanddidate, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseCandidate = () => setOpen(false);
  
  const [candidate, setCandidate] = React.useState<ICandidateCard[]>([]);

  const [openEditCandidate, setOpenEditCandidate] = React.useState(false);
  const handleOpenEditCandidate = () => setOpenEditCandidate(true);
  const handleCloseEditCandidate = () => setOpenEditCandidate(false);

  // setId(idCandidate);
  // console.log(imageProfile);
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7166/api/Candidate/${idCandidate}`);
      console.log(`Item with ID ${idCandidate} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    window.location.reload();
  };

  const onSubmit: SubmitHandler<IFormInput> = data => {
    try{
      axios.put(`https://localhost:7166/api/Candidate/${idCandidate}`, {
        FirstName: data.FirstName,
        LastName: data.LastName, 
        Position: data.Position,
        Email: data.Email,
        Status: data.Status,
        CV: data.filesCV[0]?.name,
        Resume: data.filesResume[0]?.name,
        Skills: data.Skills,
        Rating: data.Rating,
        ImageProfile: data.filesImage[0]?.name,
      });
    }catch (error) {
      console.error('Error deleting item:', error);
    }
    window.location.reload();
  }



  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>

  return (
    <>
    <Modal
        open={openEditCandidate}
        onClose={handleCloseEditCandidate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleEdit}>
            <div style={{fontFamily:"Inria Sans", fontSize:"32px" }}>Edit Profile Candidate {status}</div>
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
                            type="text"
                            defaultValue={firstName}
                            label="FullName"
                            {...register("FirstName")}
                        />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">LastName</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            defaultValue={lastName}
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
                                defaultValue={position}
                                label="Position"
                                {...register("Position")}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            defaultValue={email}
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
                        <InputLabel htmlFor="outlined-adornment-amount">Status</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            defaultValue={status}
                            label="Status"
                            {...register("Status")}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Rating</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            defaultValue={rating}
                            label="Rating"
                            {...register("Rating")}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Skills</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            defaultValue={skills}
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
                        >
                            Save
                        </Button>
                        <Button variant="contained" color="error"
                        sx={{':hover': {
                            bgcolor: 'secondary.main',
                            color: 'red',
                        },}}
                        onClick={handleCloseEditCandidate}>Cancle</Button>
                    </div>
            </Box>
        </Box>
      </Modal>
    
    <div className='containerCandidate'>
      {/* <Avatar alt="Remy Sharp" src={`${imageProfile}`} sx={{ width: 40, height: 40 }}/> */}
      <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${imageProfile}`} sx={{ width: 40, height: 40 }}/>
      <div>
        <div className='topCandidate'>
          <div>{firstName} {lastName}</div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{background:"#FFE600", color:"black"}}
            sx={{':active': {
              bgcolor: 'none',
              border:'none'
            },
            }}
          >
          <MoreHorizIcon sx={{ width: 20, height: 20 }}/>
        </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleOpenEditCandidate}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <div style={{display:"flex", justifyContent:"flex-start", marginBottom:5}}>{position}</div>
        <div className='bottomCandidate'>
          <div className='one'><AccessTimeFilledIcon sx={{ width: 20, height: 20 }} /> {createAt}</div>
          <div className='one' onClick={handleOpen}><RemoveRedEyeIcon sx={{ width: 20, height: 20 }}/> View more</div>
          
          <Modal
            open={openCanddidate}
            onClose={handleCloseCandidate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{display:"flex", gap:'5px'}}>
                <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${imageProfile}`}  sx={{ width: 100, height: 100 }}/>
                <div style={{ display:'flex', flexDirection:"column" }}>
                  <div style={{ fontFamily:'Inria Sans', fontWeight:'700', fontSize:"20px"}}>{firstName} {lastName}</div>
                  <div style={{ fontFamily:'Inria Sans', fontWeight:'400', fontSize:"14px"}}>Status: {status}</div>
                  <div style={{ fontFamily:'Inria Sans', fontWeight:'400', fontSize:"14px"}}>Rating: {rating}</div>
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Position:</b> {position} </p>
                <p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>CV:</b> <a href={`http://127.0.0.1:5173/src/pictures/${cv}`}>Download CV</a> </p>
                <p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Resume:</b> <a href={`http://127.0.0.1:5173/src/pictures/${resume}`}>Download Resume</a> </p>
                <p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Recruiter comments:</b> 
                 <NavLink to={`/comment/${idCandidate}`}>View details </NavLink> 
                </p>
                <p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Skills:</b> {skills} </p>
              </Typography>
            </Box>
          </Modal>

        </div>
      </div>
    </div>
    </>
  )
}
export default CandidateCard
