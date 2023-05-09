import { ReactElement, createContext, useCallback, useState } from "react"
import axios from "axios";
import * as React from 'react';

export enum ColumnType {
	applied = "applied",
	interview = "interview",
	pass = "pass",
	reject = "reject",
}

// export interface ICandidate {
// 	status: ColumnType
// 	id: string
// 	position: string
// 	name: string
// }

export interface ICandidate {
    idCandidate: number;
    firstName: string;
    lastName: string;
    position:string;
    createAt: string;
    status: string;
    cv: string;
    resume: string;
    skills: string;
    email: string;
    rating: string;
    imageProfile: string;
    candidateName: string;
  }

export interface ICandidateBoardContext {
	candidateLists: ICandidate[]
	onChangeCandidateStatus: (
		candidateID: string,
		destinationStatus: ColumnType
	) => void
}

const CandidateBoardContext = createContext<ICandidateBoardContext>(
	{} as ICandidateBoardContext
)

export default CandidateBoardContext

// const DefaultLists: ICandidate[] = [
// 	{
// 		id: "c-111",
// 		name: "Apple Inc",
// 		position: "Software Engineer",
// 		status: ColumnType.applied,
// 	},
// 	{
// 		id: "c-222",
// 		name: "Nokia Mobile",
// 		position: "JR Software Engineer",
// 		status: ColumnType.interview,
// 	},
// 	{
// 		id: "c-333",
// 		name: "Moonie Hebe",
// 		position: "Tester",
// 		status: ColumnType.pass,
// 	},
// 	{
// 		id: "c-444",
// 		name: "No Luck",
// 		position: "Tester",
// 		status: ColumnType.reject,
// 	},
// ]

export function CandidateBoardContextProvider({
	children,
}: {
	children: ReactElement
}) {

    const [candidateLists, setCandidateLists] =
        useState<ICandidate[]>([])

    React.useEffect(() => {
        const url = 'https://localhost:7166/api/Candidate';
        axios.get(url).then((res) => {
            console.log(res.data)
        setCandidateLists(res.data);
        });
    }, []);

	const onChangeCandidateStatus = useCallback(
		(candidateID: string, destinationStatus: ColumnType) => {
			setCandidateLists((prev) =>
				prev.map((m) => {
					if (candidateID === m.idCandidate.toString()) {
						axios.put(`https://localhost:7166/api/Candidate/${m.idCandidate}`, {
							firstName: m.firstName,
							lastName: m.lastName,
							position: m.lastName,
							email: m.lastName,
							status: m.lastName,
							cv: m.cv,
							resume: m.resume,
							skills: m.skills,
							rating: m.rating,
							imageProfile: m.imageProfile,
						});
						return {
							...m,
							status: destinationStatus,
						}
					}
					return m
				})
			)
		},
		[]
	)

	return (
		<CandidateBoardContext.Provider
			value={{
				candidateLists,
				onChangeCandidateStatus,
			}}
		>
			{children}
		</CandidateBoardContext.Provider>
	)
}