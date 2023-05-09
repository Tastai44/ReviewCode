import { Box, Input, Button, NativeSelect } from "@mui/material"
import * as React from "react"
import axios from "axios"

import Modal from "@mui/material/Modal"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { AppointmentDataForm } from "../Appointment/Appointment"

interface Candidate {
	idCandidate: number
	firstName: string
	candidateName: string
}

export interface UpsertAppointmentProps {
	onClickCancel: () => void
	onSubmitSuccess: () => void
	defaultApp?: AppointmentDataForm
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	color: "black",
}

const UpsertTitle = ({appointmentId}: { appointmentId?: number }) => {
	return <div style={{ fontFamily: "Inria Sans", fontSize: "32px" }}>
		{`${appointmentId ? "Edit" : "New "} Appointment ${
			appointmentId ? appointmentId : ""
		}`}
	</div>
}

const UpsertAppointment = ({
	onClickCancel,
	defaultApp = {
		title: "",
		startTime: "",
		endTime: "",
		candidateName: "",
    idAppointment: undefined
	},
	onSubmitSuccess,
  
}: UpsertAppointmentProps) => {
	const { register, handleSubmit } = useForm<AppointmentDataForm>({
		defaultValues: defaultApp,
	})

	const [candidates, setCandidates] = React.useState<Candidate[]>([])
	React.useEffect(() => {
		const url = "https://localhost:7166/api/Candidate"
		axios.get(url).then((res) => {
			setCandidates(res.data)
		})
	}, [])

	const onSubmitEdit = async (data: AppointmentDataForm) => {
		try {
			await axios.put(
				`https://localhost:7166/api/Appointment/${defaultApp.idAppointment}`,
				{
					title: data?.title,
					candidateName: data?.candidateName,
					startTime: data?.startTime,
					endTime: data?.endTime,
				}
			)
			onSubmitSuccess()
		} catch (error) {
			console.error("Error deleting item:", error)
		}
	}
	const onSubmitCreate = async (data: AppointmentDataForm) => {
      try {
      await axios.post('https://localhost:7166/api/Appointment', {
        title: data.title,
        candidateName: data.candidateName,
        startTime: data.startTime,
        endTime: data.endTime
      });
      onSubmitSuccess()
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

	const onSubmit: SubmitHandler<AppointmentDataForm> = (data) =>
		defaultApp.idAppointment ? onSubmitEdit(data) : onSubmitCreate(data)

	return (
		<>
			<Box sx={style}>
				<UpsertTitle appointmentId={defaultApp.idAppointment} />
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit(onSubmit)}
					// onSubmit={() => handleSubmit(onSubmit)()}
				>
					<FormControl fullWidth sx={{ m: 1 }}>
						{/* <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel> */}
						<Input
							id="input-with-icon-adornment"
							startAdornment={
								<InputAdornment position="start"></InputAdornment>
							}
							type="text"
							placeholder="Appointment title"
							{...register("title")}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }}>
						{/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Candidate Name
                        </InputLabel> */}

						<NativeSelect {...register("candidateName")}>
							{candidates.map((item) => (
								<option key={item.idCandidate} value={item.candidateName}>
									{item.candidateName}
								</option>
							))}
						</NativeSelect>
					</FormControl>

					<div style={{ display: "flex" }}>
						<FormControl fullWidth sx={{ m: 1 }}>
							Start Date:
							<OutlinedInput
								id="outlined-adornment-amount"
								placeholder="StartTime"
								type="datetime-local"
								{...register("startTime")}
							/>
						</FormControl>

						<FormControl fullWidth sx={{ m: 1 }}>
							{/* <InputLabel htmlFor="outlined-adornment-amount">EndTime</InputLabel> */}
							End Date:{" "}
							<OutlinedInput
								id="outlined-adornment-amount"
								label="EndTime"
								type="datetime-local"
								style={{ width: "200px" }}
								{...register("endTime")}
							/>
						</FormControl>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: "5px",
							width: "410px",
						}}
					>
						<Button
							variant="contained"
							sx={{
								":hover": {
									bgcolor: "secondary.main",
									color: "black",
								},
							}}
							type="submit"
						>
							Save
						</Button>
						<Button
							variant="contained"
							color="error"
							sx={{
								":hover": {
									bgcolor: "secondary.main",
									color: "red",
								},
							}}
							onClick={onClickCancel}
						>
							Cancel
						</Button>
					</div>
				</Box>
			</Box>
		</>
	)
}
export default UpsertAppointment
