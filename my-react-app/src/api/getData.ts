import axios from "axios";

const getData = async () => {
    // return axios.get('https://localhost:7166/api/Candidate')
    return axios.get('https://localhost:7166/api/Comment').then(res => {
        return res;
    })
}
const getComment = async () => {
    return axios.get('https://localhost:7166/api/Comment').then(res => {
        return res;
    })
}
const getCandidate = async () => {
    return axios.get('https://localhost:7166/api/Candidate').then(res => {
        return res;
    })
}

export {
    getData,
    getComment,
    getCandidate,
    // postData
}