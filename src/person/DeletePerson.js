import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const DeletePerson = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_person, setIdperson] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [birth_year, setBirthyear] = useState('');
    const [salary, setSalary] = useState('');  
    const [password, setPassword] = useState('');

    const {id}=useParams();
    const navigate = useNavigate();
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
            id_person: id_person,            
            firstname: firstname ? firstname : null,
            lastname: lastname ? lastname : null,
            city: city,
            birth_year: birth_year,
            salary: salary,
            password: password            
        }
        axios.delete(apiURL + '/person/'+id, {
            auth: {
                username:localStorage.getItem('username'),
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
                    <th>Person Id</th><th>First Name</th><th>Last Name</th><th>City</th><th>Birth Year</th><th>Salary</th>                         
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{id_person}</td>                            
                            <td>{firstname}</td>
                            <td>{lastname}</td>
                            <td>{city}</td>
                            <td>{birth_year}</td>
                            <td>{salary}</td>                            
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the person?
            <br/>
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/personlist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}

export default DeletePerson;