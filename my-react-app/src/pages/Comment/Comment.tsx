import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import './Comment.css'
import CancelIcon from '@mui/icons-material/Cancel';

import Profile from '../../pictures/Luffy.webp'
import StarIcon from '@mui/icons-material/Star';
// import Luffy from '../../pictures/Luffy.webp';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Menu, MenuItem, Modal } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {useParams} from 'react-router-dom'

import RateReviewIcon from '@mui/icons-material/RateReview';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm, SubmitHandler } from "react-hook-form";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditComment from '../../Components/EditComment/EditComment';

import { getComment } from '../../api/getData';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Candidate {
  idCandidate: number;
  firstName: string;
  lastName: string;
  position:string;
  createAt: string;
  status: string;
  cv: string;
  resume: string;
  skills: string;
  rating: string;
  imageProfile: string;

}

interface IComment {
  idComment: number,
  message: string,
  createAt: string,
  idRecruiter: number,
  idCandidate: number
}

interface IRecruiter {
  idRecruiter: number,
  userName: string,
  position: string,
  createAt: string,
  imageProfile: string
}


type RouteParams = {
  idCandidate: string;
};


export default function Comment() {
  const { idCandidate } = useParams<RouteParams>();

  const [commentId, setCommentId] = React.useState<number>(0);
  const [messageComment, setMessageComment] = React.useState<string>('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick =(id: number) =>  (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setCommentId(id)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenEdit = (id:number, mes:string) => {
    setOpenEdit(true);
    setCommentId(id);
    setMessageComment(mes);
  }

  const { register, handleSubmit, reset} = useForm<IComment>();
  const onSubmit: SubmitHandler<IComment> = async data => {
    try {
      axios.post(`https://localhost:7166/api/Comment/${id}`, {
        message: data.message,
      });
      console.log("SuccessFully");
      let res = await getComment();
      setComment(res.data);
      reset({
        message: ""
      })
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    // window.location.reload();
  }
  // const onSubmit: SubmitHandler<IComment> = data => console.log(data);

  const recruiterId = 1;
  const id = parseInt(idCandidate ?? '0');

  const [candidate, setCandidate] = React.useState<Candidate[]>([]);
  React.useEffect(() => {
    const url = 'https://localhost:7166/api/Candidate';
    axios.get(url).then((res) => {
    setCandidate(res.data);
    });
  }, []);

  const [comment, setComment] = React.useState<IComment[]>([]);
  React.useEffect(() => {
    const url = 'https://localhost:7166/api/Comment';
    axios.get(url).then((res) => {
      setComment(res.data);
    });
  }, []);
  // console.log(comment)

  const [recruiter, setRecruiter] = React.useState<IRecruiter[]>([]);
  React.useEffect(() => {
    const url = 'https://localhost:7166/api/Recruiter';
    axios.get(url).then((res) => {
      setRecruiter(res.data);
    });
  }, []);

  const handleDelete = async () => {
    try {
      const id = commentId
      await axios.delete(`https://localhost:7166/api/Comment/${id}`);
      console.log(`Item with ID ${id} deleted successfully.`);
      setAnchorEl(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    let res = await getComment();
    setComment(res.data);
    // window.location.reload();
  };

  return (
    <>
    {candidate.map((index) => (
   
    <div className='ContainerComment' key={index.idCandidate} >
      {id === index.idCandidate && (
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        <Item sx={{width:"800px", background:"black", display:"flex", flexDirection:"column", color:"white"}}>
            <NavLink to="/">  
              <div style={{display:"flex", justifyContent:"flex-end"}}> <CancelIcon style={{color:"white"}}/> </div>
            </NavLink>
            <div style={{ display:"flex", justifyContent:"start", gap:"10px", padding:10 }}>
              <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${index.imageProfile}`}  sx={{ width: 60, height: 60}}/>
              <div style={{display:"flex", flexDirection:"column"}}>
                  <div style={{display:"flex", justifyContent:"start", fontSize:"36px"}}>{index.firstName + ' ' + index.lastName} </div>
                  <div style={{display:"flex", justifyContent:"start", fontSize:'14px', fontWeight:'400', }}>@Apply at {index.createAt} </div>
              </div>
            </div>
            <div><img src={Profile} style={{borderRadius:"5px"}}/></div>
            <div style={{display:"flex",justifyContent:"space-between" , marginLeft:"60px", fontSize:"20px", marginTop:"10px", width:"680px"}}>
                <p style={{alignSelf:"center", display:"flex", gap:"3px"}}><StarIcon /> Rating: {index.rating}/10</p> 
                <p style={{alignItems:"center", display:"flex", gap:"3px"}}><RateReviewIcon /> Status: {index.status}</p>
            </div>
        </Item>

        
        {recruiter.filter((r) => r.idRecruiter === recruiterId).map((r) => (  
        <Item sx={{width:"800px", background:"black"}} key={r.idRecruiter}>
            <div style={{ display:"flex", justifyContent:"start", gap:"10px", padding:10 }}>
              <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${r.imageProfile}`}  sx={{ width: 60, height: 60}}/>
              <div style={{display:"flex", flexDirection:"column", color:"white"}}>
                  <div style={{display:"flex", justifyContent:"start", fontSize:"36px"}}>{r.userName} </div>
                  <div style={{display:"flex", justifyContent:"start", fontSize:'14px', fontWeight:'400', }}>@Role of {r.position} </div>
              </div>
            </div>
            <hr className='line'/>
            <div style={{display:"flex", flexDirection:"column", color:"white", margin:"10px", fontFamily:"Inria Sans"}}>
                <div style={{ display:"flex", padding:10}}>
                    <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${r.imageProfile}`}  sx={{ width: 60, height: 60}}/>
                    <Box
                      component="form"
                      sx={{
                          '& .MuiTextField-root': { m: 1, width: '600px' },
                      }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit(onSubmit)}
                      >
                      <FormControl fullWidth sx={{ m: 1 }} style={{display:"flex", width:"820px"}}>
                        <div style={{display:"flex", gap:"5px"}}>
                        <OutlinedInput 
                          type="text" 
                          id="standard-multiline-static"
                          multiline
                          className='commentInput' 
                          placeholder='Comment something...' 
                          {...register("message")}
                          style={{color:"white", border:'1px'}}
                          />
                      <Button 
                          variant="contained"
                          sx={{':hover': {
                              variant:"outlined",
                              bgcolor: 'primary',
                              color: 'white',
                          }, background:'white', color: 'black'}}
                          type="submit"
                      >Comment</Button>
                      </div>
                      </FormControl>
                    </Box>
                </div>
                <hr className='line'/>
                              
                  <div style={{ display:"flex", flexDirection:"column", padding:10, gap:"10px", height:"60vh", overflowY:"scroll"}}>
                    {/* {recruiterId === r.idRecruiter && ()} */}
                    {comment.filter((c) => (c.idRecruiter === recruiterId) && (c.idCandidate === index.idCandidate)).map((c)  => (
                      <div key={c.idComment} style={{background:"grey", padding:"5px", borderRadius:"5px"}}>
                        <Modal 
                          open={openEdit}
                          onClose={handleCloseEdit}
                        >
                          <EditComment onClickCancle={handleCloseEdit} idComment={commentId} message={messageComment} />
                        </Modal>
                          <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${r.imageProfile}`} sx={{ width: 40, height: 40}}/>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick(c.idComment)}
                                style={{background:"grey", color:"white"}}
                                sx={{':active': {
                                  bgcolor: 'none',
                                  border:'none'
                                },
                                }}
                              >
                              <MoreHorizIcon sx={{ width: 20, height: 20 }}/>
                            </Button>
                              <Menu
                                // id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                                }}
                              >
                                <MenuItem onClick={() => handleOpenEdit(c.idComment, c.message)}>
                                <EditCalendarIcon color='success' 
                                  sx={{':hover': {
                                    color: 'black',
                                  },}}
                                />Edit
                                </MenuItem>
                                <MenuItem onClick={handleDelete}>
                                <DeleteIcon 
                                  color='error'  
                                  sx={{':hover': {
                                    color: 'blue',
                                  },}}
                                /> Delete
                                </MenuItem>
                              </Menu>
                          </div>
                          <div style={{display:"flex", flexDirection:"column"}}>
                          <div style={{display:"flex", justifyContent:"start", fontSize:"24px"}}>{r.userName} </div>
                          <div style={{display:"flex", justifyContent:"start", fontSize:'13px', fontWeight:'400', }}>Write at: {c.createAt} </div>
                          <p style={{display:"flex", justifyContent:"start", fontSize:"20px", fontWeight:"200" , textAlign:"justify"}}>
                          {c.message}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
        </Item>
        ))}
      </Stack>
      )}
    </div>
    ))}
     </>
  );
}
