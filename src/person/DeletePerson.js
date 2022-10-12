import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const SelectedPerson = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_person, setIdperson] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [birth_year, setBirthyear] = useState('');
    const [salary, setSalary] = useState('');   
    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/person/'+id, {
                    /*auth: {
                        username:localStorage.getItem('username'),
                        password:localStorage.getItem('password')
                    }*/
                })
                    
                setIdperson(id);
                setFirstname(response.firstname);
                setLastname(response.lastname);
                setCity(response.city);
                setBirthyear(response.birth_year);                
                setSalary(response.salary);
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
            salary: salary            
        }
        axios.delete(apiURL + '/person/'+id, {
            /*auth: {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password')
            }*/
        })
            .then(res => {
                setIdperson('');
                setFirstname('');
                setLastname('');  
                setCity('');
                setBirthyear('');
                setSalary('');
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
                    <tr>
                    <th>id_person</th><th>firstname</th><th>lastname</th><th>city</th><th>birth_year</th><th>salary</th>                         
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
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/personlist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}

export default SelectedPerson;