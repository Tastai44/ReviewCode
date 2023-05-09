import * as React from 'react';
import './StatusCard.css'
// import FilePresentIcon from '@mui/icons-material/FilePresent';

import axios from "axios";
import { getData } from '../../api/getData';
import { Button } from '@mui/material';
import CandidateCard from '../CandidateCard/CandidateCard';
// import { Droppable, Draggable } from 'react-beautiful-dnd';

interface IstatusCard {
    title: string
    children?: React.ReactNode,
}

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
  email: string;
  rating: string;
  imageProfile: string;
}


const StatusCard = ({
    children,
    title

    // icon
    }: IstatusCard) =>  {
      const [firstName, setFirstName] = React.useState<string>("Defalt");
      const [lastName, setLastName] = React.useState<string>("Defalt");
      const [id, setId] = React.useState<number>();
      // const [candidate, setCandidate] = React.useState<Candidate>({idCandidate: 0, firstName: '', lastName: '', email:'', position:'', createAt:''});
      const [candidate, setCandidate] = React.useState<Candidate[]>([]);
      // const username = "Tastai";
      // const position = "Software Engineering";
      // const id = 1;
      // const createAt = "Thursday, May 4, 2566 BE";

      const getCandidate = async() => {
        try{
          let res = await getData()
          console.log("res: " ,res)
        }
        catch (err){
          console.log(err)
        }
      } 
      React.useEffect(() => {
        const url = 'https://localhost:7166/api/Candidate';
        axios.get(url).then((res) => {
        setCandidate(res.data);
        });
      }, []);

      // console.log(candidate[0]);
  return (
    <>
    <div className='ContainerStatus'>
      {/* <Button onClick={getCandidate}>get</Button> */}
        <div className='title'>{title}{children}</div>
        <hr />
        {candidate.map((index) => (
          <div key={index.idCandidate}>
            {title === index.status && (
            <CandidateCard  
              firstName = {index.firstName}
              lastName = {index.lastName}
              position = {index.position}
              email = {index.email}
              createAt={index.createAt}
              idCandidate = {index.idCandidate}
              status = {index.status}
              cv = {index.cv}
              resume = {index.resume}
              skills = {index.skills}
              rating = {index.rating}
              imageProfile = {index.imageProfile}
            />
            )}
        </div>
        ))}
    </div>
    </>
  )
}

export default StatusCard
