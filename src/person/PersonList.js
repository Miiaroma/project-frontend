import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { NavLink, Link } from 'react-router-dom';

const PersonList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');   

    const getPersons = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/person',{
        auth: {
            id_person:localStorage.getItem('idperson'),
            password:localStorage.getItem('password')
        }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data);
                //console.log(data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    useEffect(() => {
        getPersons();
    }, []);

    return (
        <div className="container">
            <Link to='/addperson'><button className='btn btn-primary'>Add Person</button></Link>
            <br/> <br/>            
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                    <th>Person Id</th><th>First Name</th><th>Last Name</th><th>City</th><th>Birth Year</th><th>Salary</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(person => (
                        <tr key={person.id_person}>
                            <td>{person.id_person}</td>                           
                            <td>{person.firstname ? person.firstname : null}</td>
                            <td>{person.lastname ? person.lastname : null}</td>                             
                            <td>{person.city}</td>
                            <td>{person.birth_year}</td>
                            <td>{person.salary}</td>                            
                           
                            <td><NavLink to={`selectedperson/${person.id_person}`}>
                                <button className="btn btn-primary">Select({person.id_person})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deleteperson/${person.id_person}`}>
                                <button className="btn btn-danger">Delete({person.id_person})</button>
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{iserror}</p>
        </div>
    )
}

export default PersonList;