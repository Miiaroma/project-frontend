import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddPerson = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_person, setIdperson] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [birth_year, setBirthyear] = useState('');
    const [salary, setSalary] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            id_person: id_person,            
            firstname: firstname,
            lastname: lastname,
            city: city,
            birth_year: birth_year,
            salary: salary,
            password: password
        }
        axios.post(apiURL + '/person/', data, {
            auth: {
                id_person:localStorage.getItem('idperson'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdperson('');
                setFirstname('');
                setLastname('');  
                setCity('');
                setBirthyear('');
                setSalary('');
                setPassword('');
                             
                setLoading(false);
                return navigate("/personlist");
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
                    <th>Person Id</th><th>First Name</th><th>Last Name</th><th>City</th><th>Birth Year</th><th>Salary</th><th>Password</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" min="1" id="idperson" placeholder='idperson' onChange={e => setIdperson(e.target.value)} /></td>                       
                        <td><input type="text" id="firstname" placeholder='firstname' onChange={e => setFirstname(e.target.value)} /></td>
                        <td><input type="text" id="lastname" placeholder='lastname' onChange={e => setLastname(e.target.value)} /></td>
                        <td><input type="number" id="birthyear" placeholder='birthyear' onChange={e => setBirthyear(e.target.value)} /></td>
                        <td><input type="text" id="city" placeholder='city' onChange={e => setCity(e.target.value)} /></td>
                        <td><input type="number" id="salary" placeholder='salary' onChange={e => setSalary(e.target.value)} /></td>
                        <td><input type="text" id="password" placeholder='password' onChange={e => setPassword(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
} 

export default AddPerson; 