import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { NavLink, Link } from 'react-router-dom';

const HourList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');

    const getHours = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/hour',{
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
        getHours();
    }, []);



    return (
        <div className="container">
            <Link to='/addhour'><button className='btn btn-primary'>Add Hours</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                    <th>Hour Id</th><th>Project Id</th><th>Person Id</th><th>Work Hours</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(hour => (
                        <tr key={hour.id_hour}>
                            <td>{hour.id_hour}</td>
                            <td>{hour.id_project}</td>
                            <td>{hour.id_person}</td>
                            <td>{hour.work_hour ? hour.work_hour : "not known"}</td>                            
                            <td><NavLink to={`selectedhour/${hour.id_hour}`}>
                                <button className="btn btn-primary">Select({hour.id_hour})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deletehour/${hour.id_hour}`}>
                                <button className="btn btn-danger">Delete({hour.id_hour})</button>
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

export default HourList;