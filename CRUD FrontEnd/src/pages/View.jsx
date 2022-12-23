import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useParams,Link } from 'react-router-dom';
import './css/View.css'

const View = () => {

    const { id } = useParams();
    const [state, setState] = useState({_id:"",name:"",email:"",phoneNumber:""});
    useEffect(() => {
        return () => {
            axios.get(`http://localhost:7001/update/${id}`)
                .then((res) => setState({ ...res.data }))
                .catch((err) => console.log(err))
        };
    }, [id])
   
    
    return (
        <>
        <section>
        <div className='card '>
            <div className='p-3 title'> User Details</div>
            <table className="table m-3">
                <tr>
                    <th>Id</th>
                    <td>{state._id}</td>
                    </tr>
                    <tr>
                    <th>Name</th>
                    <td>{state.name}</td>
                    </tr>
                    <tr>
                    <th>Email</th>
                    <td>{state.email}</td>
                    </tr>
                    <tr>
                    <th>Phone number</th>
                    <td>{state.phoneNumber}</td>
                    </tr>
                    </table>
                    <Link to={'/'} className="p-3"><button className='btn btn-delete'>Go back</button></Link>

        </div>
        </section>
        </>
    )
}

export default View
