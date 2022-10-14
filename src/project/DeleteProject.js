import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const DeleteProject = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_project, setIdproject] = useState('');
    const [pname, setPname] = useState('');
    const [place, setPlace] = useState('');
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/project/'+id, {
                    auth: {
                        id_person:localStorage.getItem('idperson'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdproject(id);
                setPname(response.pname);
                setPlace(response.place);
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
            id_project: id_project,
            pname: pname,
            place: place
        }
        axios.delete(apiURL + '/project/'+id, {
            auth: {
                id_person:localStorage.getItem('idperson'),
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
                    <tr>
                        <th>Project Id</th><th>Project Name</th><th>Place</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{id_project}</td>
                            <td>{pname}</td>
                            <td>{place}</td>
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the project?
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/projectlist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}

export default DeleteProject;