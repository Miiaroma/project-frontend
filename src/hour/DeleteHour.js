import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const DeleteHour = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_hour, setIdhour] = useState('');
    const [id_project, setIdproject] = useState('');
    const [id_person, setIdperson] = useState('');
    const [work_hour, setWorkhour] = useState('');    
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/hour/'+id, {
                    auth: {
                        id_person:localStorage.getItem('id_person'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdhour(id);
                setIdproject(response.id_project);
                setIdperson(response.id_person);
                setWorkhour(response.work_hour);
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
            id_hour: id_hour,
            id_project: id_project,
            id_person: id_person,
            work_hour: work_hour            
        }
        axios.delete(apiURL + '/hour/'+id, {
            auth: {
                id_person:localStorage.getItem('id_person'),
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
                    <tr>
                        <th>Hour Id</th><th>Project Id</th><th>Person Id</th><th>Work Hours</th>                       
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{id_hour}</td>
                            <td>{id_project}</td>
                            <td>{id_person}</td>
                            <td>{work_hour}</td>                            
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the hours?
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/hourlist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}

export default DeleteHour;