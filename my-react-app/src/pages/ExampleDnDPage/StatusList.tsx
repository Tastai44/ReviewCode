import { Typography } from "@mui/material"
import { CandidateBoardContextProvider } from "./CandidateBoardContext"
import CandidateBoard from "./CandidateBoard"

function StatusList() {
	return (
		<CandidateBoardContextProvider>
			<>
				<CandidateBoard />
			</>
		</CandidateBoardContextProvider>
	)
}

export default StatusList