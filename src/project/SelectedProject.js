import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedProject = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_project, setIdproject] = useState('');
    const [pname, setPname] = useState('');
    const [place, setPlace] = useState('');
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/project/'+id, {
                    auth: {
                        id_person:localStorage.getItem('id_person'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdproject(id);
                console.log(response.id_project);
                setIdproject(response.id_project);
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
            id_project: id,
            pname: pname,
            place: place
        }
        console.log("TEST");
        console.log(data);
        axios.put(apiURL + '/project/'+id, data, {
            auth: {
                id_user:localStorage.getItem('iduser'),
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
                    <tr className='table-info'>
                        <th>Project Id</th><th>Project Name</th><th>Place</th><th></th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><input type="number" min="1" id="idproject" value={id} onChange={e => setIdproject(e.target.value)} /></td>
                            <td><input type="text" id="pname" value={pname} onChange={e => setPname(e.target.value)} /></td>
                            <td><input type="text" id="place" value={place} onChange={e => setPlace(e.target.value)} /></td>
                            <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default SelectedProject;