import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { NavLink, Link } from 'react-router-dom';

const ProjectList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');

    const getProjects = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/project',{
        /*auth: {
            username:localStorage.getItem('username'),
            password:localStorage.getItem('password')
        }*/
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
        getProjects();
    }, []);



    return (
        <div className="container">
            <Link to='/addproject'><button className='btn btn-primary'>Add Project</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>Project Id</th><th>Project Name</th><th>Place</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(project => (
                        <tr key={project.id_project}>
                            <td>{project.id_project}</td>
                            <td>{project.pname ? project.pname : "not known"}</td>
                            <td>{project.place ? project.place : "not known"}</td>
                            <td><NavLink to={`selectedproject/${project.id_project}`}>
                                <button className="btn btn-primary">Select({project.id_project})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deleteproject/${project.id_project}`}>
                                <button className="btn btn-danger">Delete({project.id_project})</button>
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

export default ProjectList;