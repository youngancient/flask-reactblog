
import axios from "axios";

const baseUrl = "http://localhost:3001/blogs/";

// const draftUrl = "http://localhost:3001/drafts/";

const getAll =()=>{
    return axios.get(baseUrl);
}

const getOne =(id)=>{
    return axios.get(`${baseUrl}/${id}`);
}
const create = (newObj)=>{
    return axios.post(baseUrl,newObj);
}

const deleteBlog =(current)=>{
    return axios.delete(baseUrl+current);
}
const updateLike = (id, newObj)=>{
    return axios.put(`${baseUrl}/${id}`,newObj);
}
const updateDraft = (id, newObj)=>{
    return axios.put(`${baseUrl}/${id}`,newObj);
}


export default {getAll, create, deleteBlog, updateLike, getOne, updateDraft};