import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddProject = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_project, setIdproject] = useState('');
    const [pname, setPname] = useState('');
    const [place, setPlace] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            id_project: id_project,
            pname: pname,
            place: place
        }
        axios.post(apiURL + '/project/', data, {
            auth: {
                id_person:localStorage.getItem('id_person'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdproject('');
                setPname('');
                setPlace('');
                setLoading(false);
                return navigate("/projectlist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>
                        <th>Project Id</th><th>project Name</th><th>Place</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" min="1" id="idproject" placeholder='idproject' onChange={e => setIdproject(e.target.value)} /></td>
                        <td><input type="text" id="pname" placeholder='pname' onChange={e => setPname(e.target.value)} /></td>
                        <td><input type="text" id="place" placeholder='place' onChange={e => setPlace(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
} 

export default AddProject; 