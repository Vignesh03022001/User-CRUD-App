import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Home.css';
import { toast } from 'react-toastify';

const Home = () => {

  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:7001/");
    setData(response.data.data)
  }

  useEffect(() => {
    loadData();
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Confirm Delete..?")) {
      axios.delete(`http://localhost:7001/remove/${id}`);
      toast.success("User Deleted Succesfully");
      setTimeout(loadData, 500);
    }
  }
 


  return (
    <div style={{ marginTop: "50px" }}>
      <Link to={'/addContact'} className='btn btn-contact'>
        Add Contact
      </Link>
      <table className="table" >
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Ph Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {data.map((item, index) => {
            return (
              <tr>
                <th scope="row" key={item._id}>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <Link to={`/update/${item._id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => deleteUser(item._id)}>Delete</button>
                  <Link to={`/view/${item._id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home;
