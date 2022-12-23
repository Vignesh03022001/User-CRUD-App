import React, { useState, useEffect } from 'react';
import "./css/AddEdit.css";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    name: "",
    email: "",
    phoneNumber: ""
}

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { name, email, phoneNumber } = state;

    const navigate = useNavigate();
    const { id } = useParams();
    
    if(id){
    useEffect(() => {
           return () => {
            axios.get(`http://localhost:7001/update/${id}`)
                .then((res) => setState({ ...res.data }))
                .catch((err) => console.log(err))
        };
    }, [id])
}

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phoneNumber) {
            toast.error("please provide all inputs");
        } else {
            if(!id){  
            axios.post('http://localhost:7001/addcontact', { name, email, phoneNumber })
                .then(() => setState({
                    name: "",
                    email: "",
                    phoneNumber: ""
                })).catch((err) => toast.error(err.response.data));

            toast.success("User Details added sucessfully");
            }
           else{
            axios.put(`http://localhost:7001/update/${id}`, { name, email, phoneNumber })
            .then(() => setState({
                name: "",
                email: "",
                phoneNumber: ""
            })).catch((err) => toast.error(err.response.data));

        toast.success("User Details updated sucessfully");
        }
        setTimeout(() => navigate('/'), 500)
    }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }} className='addEdit'>
            <form className='my-5 w-50 ' onSubmit={HandleSubmit}>
                <div className="form-group mx-3 col">
                    <div >
                        <input type="text" className="form-control form-input" id="Name" name="name" placeholder="Your Name here...." value={name || ""} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group mx-3 my-2">
                    <div >
                        <input type="text" className="form-control form-input" id="Email" name='email' placeholder="Your Email here...." value={email || ""} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group mx-3 my-2">
                    <div>
                        <input type="text" className="form-control form-input" id="phNumber" name='phoneNumber' placeholder="Your phone number here...." value={phoneNumber || ""} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group mx-3 my-2">
                    <div className='d-flex'>
                        <input type="submit" className="form-control btn btn-secondary button" id="submit" value={id ? "Update" : "Save"} />
                        <Link to={'/'}><input type="button" className="form-control btn btn-primary button" id="submit" value={"Go Back"} /></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddEdit;
