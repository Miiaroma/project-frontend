import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddHour = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_hour, setIdhour] = useState('');
    const [id_project, setIdproject] = useState('');
    const [id_person, setIdperson] = useState('');
    const [work_hour, setWorkhour] = useState('');    
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            id_hour: id_hour,
            id_project: id_project,
            id_person: id_person,
            work_hour: work_hour            
        }
        axios.post(apiURL + '/hour/', data, {
            auth: {
                id_person:localStorage.getItem('idperson'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdhour('');
                setIdproject('');
                setIdperson('');
                setWorkhour('');                
                setLoading(false);
                return navigate("/hourlist");
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
                        <th>Hour Id</th><th>Project Id</th><th>Person Id</th><th>Work Hours</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" min="1" id="idphour" placeholder='idhourt' onChange={e => setIdproject(e.target.value)} /></td>
                        <td><input type="number" min="1" id="idproject" placeholder='idproject' onChange={e => setIdproject(e.target.value)} /></td>
                        <td><input type="number" min="1" id="idperson" placeholder='idperson' onChange={e => setIdperson(e.target.value)} /></td>
                        <td><input type="number" id="workhour" placeholder='workhour' onChange={e => setWorkhour(e.target.value)} /></td>                        
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
} 

export default AddHour; 