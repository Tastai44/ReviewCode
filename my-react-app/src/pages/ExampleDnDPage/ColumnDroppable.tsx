import { Droppable } from "react-beautiful-dnd"
import { IBoardColumn } from "./CandidateBoard"
import { Box, Paper, Typography, Grid, Button, Modal } from "@mui/material"
import { useContext } from "react"
import CandidateBoardContext from "./CandidateBoardContext"
import CardDraggable from "./CardDraggable"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as React from 'react';
import AddCandidate from "../../Components/AddCandidate/AddCandidate"

function ColumnDroppable({ column }: { column: IBoardColumn }) {

	const { candidateLists } = useContext(CandidateBoardContext)
    // console.log('candidateLists candidateLists: ', candidateLists)
	const items = candidateLists.filter((f) => f.status === column.columnID)
	// const isApplied = title.includes('Applied');
	const isApplied:string = "Applied";

	const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	return (
		<>
          <Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<AddCandidate />
		</Modal>
		<Droppable key={column.columnID} droppableId={column.columnID}>
			{(provided) => (
				<Box ref={provided.innerRef} {...provided.droppableProps}>
					
					<Paper
						variant="outlined"
						sx={{
							height: "70vh",
							overflow: "auto",
							p: 2
						}}
					>
						<Typography sx={{color:"black", fontSize:"30px", display:"flex", justifyContent:"space-between"}}>
							{column.title}
							{isApplied === column.title ?(
							<Button 
								onClick={handleOpen}
								variant="contained" 
								color='secondary' 
								sx={{bgcolor:"black", color:"white", gap:"2px", width:"150px", fontSize:"10px", ':hover': {
                                bgcolor: 'secondary.main',
                                color: 'black',
                            },}}><AddCircleIcon /> Add candidate</Button>
							) : column.title}
						</Typography>
						<hr />
						{items.map((item, index) => (
							<CardDraggable index={index} candidate={item} key={item.idCandidate} />
						))}
						{provided.placeholder}
					</Paper>
				</Box>
			)}
		</Droppable>
		</>
	)
}

export default ColumnDroppable