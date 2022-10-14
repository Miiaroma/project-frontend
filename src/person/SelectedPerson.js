import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedPerson = (props) => {
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
    const {id}=useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/person/'+id, {
                    auth: {
                        id_person:localStorage.getItem('idperson'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdperson(id);
                console.log(response.id_person);
                setIdperson(response.id_person);
                setFirstname(response.firstname);
                setLastname(response.lastname);                
                setCity(response.city);
                setBirthyear(response.birth_year);
                setSalary(response.salary);
                setPassword(response.password);
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            id_person: id,
            firstname:firstname ? firstname : null ,
            lastname:lastname ? lastname : null,
            city: city,
            birth_year: birth_year,           
            salary:salary,
            password:password

        }
        console.log(data);
        axios.put(apiURL + '/person/'+id, data, {
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
                        <th>Person Id</th><th>First Name</th><th>Last Name</th><th>City</th><th>Birth Year</th><th>Salary</th><th>Password</th><th></th>                        
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        <td><input type="number" id="idperson" value={id} onChange={e => setIdperson(e.target.value)} /></td>                       
                        <td><input type="text" id="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} /></td>
                        <td><input type="text" id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} /></td>
                        <td><input type="number" id="birthyear" value={birth_year} onChange={e => setBirthyear(e.target.value)} /></td>
                        <td><input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} /></td>
                        <td><input type="number" id="salary" value={salary} onChange={e => setSalary(e.target.value)} /></td>
                        <td><input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                        <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>                        
                        </tr>
                    
                    </tbody>
            </table>
        </div>
    )
}

export default SelectedPerson;