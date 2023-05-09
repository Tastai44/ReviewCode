import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Menu,
	MenuItem,
	Modal,
	Typography,
} from "@mui/material"
import { Draggable } from "react-beautiful-dnd"
import { ICandidate } from "./CandidateBoardContext"
import { red } from "@mui/material/colors"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import './Status.css'
import { NavLink } from "react-router-dom";
import * as React from 'react'
import axios from "axios";

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

function CardDraggable({
	index,
	candidate,
}: {
	candidate: ICandidate
	index: number
}) {

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
	
	const [openEditCandidate, setOpenEditCandidate] = React.useState(false);
	const handleOpenEditCandidate = () => setOpenEditCandidate(true);
	const handleCloseEditCandidate = () => setOpenEditCandidate(false);

	const handleDelete = async () => {
		try {
		  await axios.delete(`https://localhost:7166/api/Candidate/${candidate.idCandidate}`);
		  console.log(`Item with ID ${candidate.idCandidate} deleted successfully.`);
		} catch (error) {
			alert('Cannot delete due to the candidate was used in other data table!')
		  console.error('Error deleting item:', error);
		}
		// window.location.reload();
	  };


	return (
		<>
		<Modal
			open={openCanddidate}
			onClose={handleCloseCandidate}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
			<Typography id="modal-modal-title" variant="h6" component="h2" style={{display:"flex", gap:'5px'}}>
				<Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${candidate.imageProfile}`}  sx={{ width: 100, height: 100 }}/>
				<div style={{ display:'flex', flexDirection:"column" }}>
				<div style={{ fontFamily:'Inria Sans', fontWeight:'700', fontSize:"20px"}}>{candidate.candidateName}</div>
				<div style={{ fontFamily:'Inria Sans', fontWeight:'400', fontSize:"14px"}}>Status: {candidate.status}</div>
				<div style={{ fontFamily:'Inria Sans', fontWeight:'400', fontSize:"14px"}}>Rating: {candidate.rating}</div>
				</div>
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Position:</b> {candidate.position} </p>
				<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>CV:</b> <a href={`http://127.0.0.1:5173/src/pictures/${candidate.cv}`}>Download CV</a> </p>
				<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Resume:</b> <a href={`http://127.0.0.1:5173/src/pictures/${candidate.resume}`}>Download Resume</a> </p>
				<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Recruiter comments:</b> 
				<NavLink to={`/comment/${candidate.idCandidate}`}>View details </NavLink> 
				</p>
				<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Skills:</b> {candidate.skills} </p>
			</Typography>
			</Box>
		</Modal>

		<Draggable key={candidate.idCandidate} draggableId={candidate.idCandidate.toString()} index={index}>
			{(provided) => (
				<Card
					variant="outlined"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						mb: 2,
					}}
				>
					<CardHeader
						sx={{display:"flex", justifyContent:"flex-start", background: "#FFE600"}}
						avatar={
							<Avatar aria-label="recipe" src={`http://127.0.0.1:5173/src/pictures/${candidate.imageProfile}`} sx={{ width: 40, height: 40 }}/>
						}
						
						title={candidate.candidateName}
						subheader={candidate.status}

						action={
							<IconButton aria-label="settings">
							  {/* <MoreHorizIcon /> */}
							  <DeleteOutlineIcon onClick={handleDelete} />
								{/* <Menu
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
								</Menu> */}
							</IconButton>
							
						  }
					/>
					<CardContent sx={{background: "#FFE600"}}>
						{/* <Typography variant="h5" component="div"> */}
						<div className='bottomCandidate'>
							<div className='one'><AccessTimeFilledIcon sx={{ width: 20, height: 20 }} /> {candidate.createAt}</div>
							<div className='one' onClick={handleOpen}><RemoveRedEyeIcon sx={{ width: 20, height: 20 }}/> View more</div>
						</div>
						{/* </Typography> */}
					</CardContent>
				</Card>
				// <div className='containerCandidate'>
				// 	<Avatar onClick={handleOpen} src={`http://127.0.0.1:5173/src/pictures/${candidate.imageProfile}`} sx={{ width: 40, height: 40 }}/>
				// 	<div>
				// 		<div className='topCandidate'>
				// 		<div>{candidate.firstName} {candidate.lastName}</div>
				// 		<Button
				// 			id="basic-button"
				// 			aria-controls={open ? 'basic-menu' : undefined}
				// 			aria-haspopup="true"
				// 			aria-expanded={open ? 'true' : undefined}
				// 			onClick={handleClick}
				// 			style={{background:"#FFE600", color:"black"}}
				// 			sx={{':active': {
				// 			bgcolor: 'none',
				// 			border:'none'
				// 			},
				// 			}}
				// 		>
				// 		<MoreHorizIcon sx={{ width: 20, height: 20 }}/>
				// 		</Button>
				// 		<Menu
				// 			id="basic-menu"
				// 			anchorEl={anchorEl}
				// 			open={open}
				// 			onClose={handleClose}
				// 			MenuListProps={{
				// 			'aria-labelledby': 'basic-button',
				// 			}}
				// 		>
				// 			<MenuItem >Edit</MenuItem>
				// 			<MenuItem >Delete</MenuItem>
				// 		</Menu>
				// 		</div>
				// 		<div style={{display:"flex", justifyContent:"flex-start", marginBottom:5}}>{candidate.position}</div>
				// 		<div className='bottomCandidate'>
				// 		<div className='one'><AccessTimeFilledIcon sx={{ width: 20, height: 20 }} /> {candidate.createAt}</div>
				// 		{/* <div className='one' onClick={handleOpen}><RemoveRedEyeIcon sx={{ width: 20, height: 20 }}/> View more</div> */}
						
						// <Modal
						// 	open={openCanddidate}
						// 	onClose={handleCloseCandidate}
						// 	aria-labelledby="modal-modal-title"
						// 	aria-describedby="modal-modal-description"
						// >
						// 	<Box sx={style}>
						// 	<Typography id="modal-modal-title" variant="h6" component="h2" style={{display:"flex", gap:'5px'}}>
						// 		<Avatar alt="Remy Sharp" src={`http://127.0.0.1:5173/src/pictures/${candidate.imageProfile}`}  sx={{ width: 100, height: 100 }}/>
						// 		<div style={{ display:'flex', flexDirection:"column" }}>
						// 		<div style={{ fontFamily:'Inria Sans', fontWeight:'700', fontSize:"20px"}}>{candidate.candidateName}</div>
						// 		<div style={{ fontFamily:'Inria Sans', fontWeight:'400', fontSize:"14px"}}>Status: {candidate.status}</div>
						// 		<div style={{ fontFamily:'Inria Sans', fontWeight:'400', fontSize:"14px"}}>Rating: {candidate.rating}</div>
						// 		</div>
						// 	</Typography>
						// 	<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						// 		<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Position:</b> {candidate.position} </p>
						// 		<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>CV:</b> <a href={`http://127.0.0.1:5173/src/pictures/${candidate.cv}`}>Download CV</a> </p>
						// 		<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Resume:</b> <a href={`http://127.0.0.1:5173/src/pictures/${candidate.resume}`}>Download Resume</a> </p>
						// 		<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Recruiter comments:</b> 
						// 		<NavLink to={`/comment/${candidate.idCandidate}`}>View details </NavLink> 
						// 		</p>
						// 		<p style={{ fontFamily:'Inria Sans',fontSize:"18px"}}><b>Skills:</b> {candidate.skills} </p>
						// 	</Typography>
						// 	</Box>
						// </Modal>

				// 		</div>
				// 	</div>
				// 	</div>
			)}
		</Draggable>
		</>
	)
}

export default CardDraggable